import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import * as cookie from "cookie";
import JWT from "jsonwebtoken";
import store from "store2";

// interface ApiToken {
//   name: string;
//   email: string;
//   picture: string;
//   iat: number;
// }

const options: IronSessionOptions = {
  cookieName: "TEST_SESSION_TEST",
  password: "VERYYLONGPASSWORDS1ab1323898esda345q6781!",
};

/////////////////////////////////////////////////////////////////////
// get the client
const mysql = require("mysql2/promise");

async function dbConnect(db: any) {
  // create the connection to database
  console.log("DATABASE:", db);
  let hostAddr = "host.docker.internal";
  if (process.env.NODE_ENV === "development") hostAddr = "localhost";
  const connection = await mysql.createConnection({
    host: hostAddr,
    user: "root",
    password: "root!",
    database: db,
    port: "3306",
  });
  if (process.env.NODE_ENV === "development") connection.host = "localhost";

  return connection;
}

const queryProdShape = `SELECT \
  date AS "time", \
  (IFNULL(m_1, 0) + IFNULL(m_2, 0) + IFNULL(m_3, 0) + IFNULL(m_4, 0) + IFNULL(m_5, 0)) AS prodCnt \
FROM prod_shape_day \
ORDER BY TIME DESC LIMIT 1`;

const queryProdLeak = `SELECT \
  date AS "time", \
  IFNULL(cnt, 0) AS prodCnt \
FROM test_leak_day \
ORDER BY TIME DESC LIMIT 1`;

const queryProdAssem = `SELECT \
  date AS "time", \
  (IFNULL(m_3, 0) + IFNULL(m_4, 0)) AS prodCnt \
FROM prod_assem_day \
ORDER BY TIME DESC LIMIT 1`;

const queryIlShape = `SELECT \
  date AS "time", \
  (IFNULL(m_1, 0) + IFNULL(m_2, 0) + IFNULL(m_3, 0) + IFNULL(m_4, 0) + IFNULL(m_5, 0)) AS ilCnt \
FROM il_shape_day \
ORDER BY TIME DESC LIMIT 1`;

const queryIlLeak = `SELECT \
  date AS "time", \
  (IFNULL(err1,0)+IFNULL(err2,0)+IFNULL(err3,0)+IFNULL(err4,0)+IFNULL(err5,0)+IFNULL(err6,0)) AS ilCnt \
FROM test_leak_day \
ORDER BY TIME DESC LIMIT 1`;

const queryIlAssem = `SELECT \
  date AS "time", \
  (IFNULL(exp1,0)+IFNULL(redu,0)+IFNULL(oring1,0)+IFNULL(exp2,0)+IFNULL(nipple,0)+IFNULL(oring2,0)) AS ilCnt \
FROM il_assem_day \
ORDER BY TIME DESC LIMIT 1`;

async function getProdData(connection) {
  // simple query
  const prodCnt = {
    shape: 0,
    leak: 0,
    assem: 0,
  };

  try {
    const [rows] = await connection.execute(queryProdShape);
    console.log("getProdData() - shape:", rows);
    prodCnt.shape = rows[0].prodCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  try {
    const [rows] = await connection.execute(queryProdLeak);
    console.log("getProdData() - leak:", rows);
    prodCnt.leak = rows[0].prodCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  try {
    const [rows] = await connection.execute(queryProdAssem);
    console.log("getProdData() - assem:", rows);
    prodCnt.assem = rows[0].prodCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  return prodCnt;
}

async function getIlData(connection) {
  // simple query
  const ilCnt = {
    shape: 0,
    leak: 0,
    assem: 0,
  };

  try {
    const [rows] = await connection.execute(queryIlShape);
    console.log("getIlData() - shape:", rows);
    ilCnt.shape = rows[0].ilCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  try {
    const [rows] = await connection.execute(queryIlLeak);
    console.log("getIlData() - leak:", rows);
    ilCnt.leak = rows[0].ilCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  try {
    const [rows] = await connection.execute(queryIlAssem);
    console.log("getIlData() - assem:", rows);
    ilCnt.assem = rows[0].ilCnt;
  } catch (e) {
    console.log("ERROR", e);
  }

  return ilCnt;
}
/////////////////////////////////////////////////////////////////////

function verifyApiToken(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie);
  const apiToken = cookies["apiToken"];
  // console.log("apiToken:", apiToken);
  if (apiToken) {
    // Decode apiToken
    const temp = JWT.verify(
      apiToken,
      process.env["publicKey"],
      { algorithms: ["RS256"] },
      function (err: any, decoded: any) {
        if (err) {
          console.log("apiToken err:", err);
          return null;
        } else {
          console.log("apiToken decoded:", decoded);
          return decoded;
        }
      }
    );
    return temp;
  }

  return null;
}

function verifySession(email: string, apiToken: string) {
  const oldApiToken = store(email);
  // 4. 세션에서 이메일(key) 검사
  if (oldApiToken) {
    if (apiToken === oldApiToken) {
      return true;
    }
  } else {
    console.warn("verifySession() - apiToken no exist!!!");
  }
  return false;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("---------- Get-Data handler ----------", store(), req.query);
  let type = null;
  let database: any = "cn_viewerlock";
  if (req.query) {
    if (req.query.d) database = req.query.d;
    if (req.query.t) type = req.query.t;
    if (type != "prod" && type != "il") {
      res.status(400).json({ text: `Wrong request!!! ${type}` });
      return;
    }
  }

  // 1. Cookie의 apiToken 토큰 획득 및 signature 검증
  const cookies = cookie.parse(req.headers.cookie);
  const apiToken = cookies["apiToken"];
  console.log("apiToken:", apiToken);
  // 2. apiToken의 signature 검증
  const decoded: any = verifyApiToken(req);
  if (!decoded) {
    // 잘못된 apiToken. 요청 거부. 쿠키 삭제, 로그인 페이지.
    console.log("Wrong or expired apiToken!!!");
    res.setHeader("Set-Cookie", `apiToken=deleted; path=/; Max-Age=0; httponly;`);
    return res.redirect("/login");
  }

  // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
  const connection = await dbConnect(database);
  let prodCnt = {};
  let ilCnt = {};
  if (type === "prod") prodCnt = await getProdData(connection);
  else if (type === "il") ilCnt = await getIlData(connection);
  console.log(prodCnt, ilCnt);
  // await userLog(connection, payload.email, userExist);
  connection.end();
  // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
  return res.status(200).json({
    prod: prodCnt,
    il: ilCnt,
  });
}

export default withIronSessionApiRoute(handler, options);
