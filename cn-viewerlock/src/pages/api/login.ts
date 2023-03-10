import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken";
// import { VerifyOptions, Algorithm } from "jsonwebtoken";
// import rsaPemToJwk from "rsa-pem-to-jwk";
import fs from "fs";
import store from "store2";
import { connect } from "http2";
// import jwksClient, { JwksClient } from "jwks-rsa";
// import { bodyStreamToNodeStream } from "next/dist/server/body-streams";

/////////////////////////////////////////////////////////////////////
// get the client
const mysql = require("mysql2/promise");

async function dbConnect() {
  // create the connection to database
  const connection = await mysql.createConnection({
    host: "host.docker.internal",
    user: "root",
    password: "root!",
    database: "viewerlock",
    port: "3306",
  });

  return connection;
}

async function checkUserEmail(connection, mail) {
  // simple query
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    console.log(rows);

    console.log("??????????", mail, rows);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].mail === mail) {
        return true;
      }
    }
    return false;
  } catch (e) {
    console.log("ERROR", e);
    return false;
  }
  return false;
}

async function userLog(connection, mail, sucess) {
  // simple query
  try {
    await connection.execute(
      `INSERT INTO user_log(TIME, mail, sucess, note) VALUES (CURRENT_TIMESTAMP, "${mail}", ${sucess}, "Login")`
    );
  } catch (e) {
    console.log("ERROR", e);
  }
}
/////////////////////////////////////////////////////////////////////

const googleClientId = "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";
const googleClient = new OAuth2Client(googleClientId);

interface ApiToken {
  name: string;
  email: string;
  picture: string;
  iat: number;
}

// let client2 = jwksClient({
//   jwksUri: "https://sandrino.auth0.com/.well-known/jwks.json",
// });

// function getKey(header, callback) {
//   client2.getSigningKey(header.kid, function (err, key) {
//     console.log("key:", key, err);
//     let signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// JWT.verify(token, getKey, options, function (err, decoded) {
//   console.log(decoded.foo); // bar
// });

// let privateKey = undefined;
// let publicKey = undefined;

function readEnvKeys() {
  if (!process.env["privateKey"]) {
    process.env["privateKey"] = fs.readFileSync("private-key.pem").toString();
    console.log("Read private-key.pem...");
    console.log(process.env["privateKey"]);
  }
  if (!process.env["publicKey"]) {
    process.env["publicKey"] = fs.readFileSync("public-key.pem").toString();
    console.log("Read public-key.pem...");
    console.log(process.env["publicKey"]);
  }
}

async function verifyGoogleJwt(googleJwt) {
  const ticket = await googleClient
    .verifyIdToken({
      idToken: googleJwt.credential,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("ERROR!!! verifyGoogleJwt()", err);
      return null;
    });

  return ticket;
}

const createApiToken = (payload) => {
  const { picture, name, email } = payload;
  // console.log(` picture: ${picture}\n name:${name}\n email:${email}`);

  // console.log(globalTemp);
  // console.log("process.env["privateKey"] ===========", process.env["privateKey"]);
  // const expires = new Date();
  // TODO:FIXME: ?????? ???????????? ???????????? ?????? ???????????? ?????? ????????? ????????????.
  // ???????????? ???????????? JWT ??????.
  const apiToken: string = JWT.sign({ name, email, picture }, process.env["privateKey"], {
    algorithm: "RS256",
  });
  // const vOption: VerifyOptions = { algorithms: undefined };
  // const algorithm: Algorithm = "RS256";

  console.log("apiToken >>>>>>>>>>>>>>>>>>>>>>>", apiToken);
  // ???????????? ???????????? JWKS ??????
  // const jwk = rsaPemToJwk(process.env["privateKey"], { use: "sig" }, "public");
  // console.log("jwk:", jwk);

  // const client2 = jwksClient({
  //   jwksUri: "http://localhost:8888/.well-known/jwks.json",
  //   cashe: true
  // });

  // connection.execute('UPDATE `innoboost_user` SET `TOKEN`= ? WHERE (`ID`= ?)', [apiToken, sub], (err, results) => {
  // 	console.log(results)
  // });
  return apiToken;
};

function verifyApiToken(apiToken) {
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

function addTokenToSession(email: string, apiToken: string) {
  const oldApiToken = store(email);
  if (oldApiToken) {
    // console.log("oldApiToken:", oldApiToken);
    console.log("Existing apiToken will be deleted!!!");
  }
  store(email, apiToken);
}

//////////////////////////////////////////////////////////////
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      email: string;
      token: string;
    };
  }
}

const options: IronSessionOptions = {
  cookieName: "TEST_SESSION_TEST",
  password: "VERYYLONGPASSWORDS1ab1323898esda345q6781!",
};
//////////////////////////////////////////////////////////////

async function handler(req: NextApiRequest, res: NextApiResponse) {
  readEnvKeys();

  // reauest ?????? ???????????? ?????? ??? ?????? ?????? ??????.
  // console.log("---------- Log-In handler. query:", req.query, "----------");
  // if (req.query) {
  //   const func = req.query.f;
  //   if (!func) {
  //     res.status(400).json({ text: `Wrong request!!! ${func}` });
  //     return;
  //   }
  // }

  /** ????????? ?????????
   *
   * ticket = googleClient.verifyIdToken({googleJwt.credential});
   * payload = ticket.getPayload();
   *
   * if(payload) {
   *    TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
   *    if(exist old apiToken?) {
   *      expireApiToken(); // ????????????? store() ?????? ????????? ?????? ????????? ????????????.
   *      // ?????? ????????? ????????????????????? ????????? ????????? ??????????
   *    }
   *    TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
   *    // apiToken ??????
   *    apiToken = createApiToken(payload);
   *    // session??? apiToken ??????
   *    store(email, apiToken); // ?????? ????????? ????????? ?????? ?????? ??????.
   *    // cookie??? apiToken ??????
   *    res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
   *    // response
   *    res.status(200);
   *    res.json();
   * } else {
   *    // response
   *    res.status(401);
   * }
   */

  // req.body === googleJwt
  const payload = await verifyGoogleJwt(req.body)
    .then((ticket) => {
      if (ticket) {
        return ticket.getPayload();
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("ERROR!!!:", err);
      return null;
    });
  console.log("payload:", payload);

  if (!payload) {
    return res.status(401).json({
      text: "Noooooooooooooo",
      code: -1,
    });
  }

  // signature ?????? ???????????????
  // const publicKey = fs.readFileSync("public.pem");

  // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
  // ????????? ??????
  const connection = await dbConnect();
  const userExist = await checkUserEmail(connection, payload.email);
  await userLog(connection, payload.email, userExist);
  if (!userExist) {
    console.log("Unapproved Email!!!");
    return res.status(401).json({
      text: "Unapproved Email.",
      code: -2,
    });
  }
  connection.end();
  // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:

  // apiToken ??????
  const apiToken = createApiToken(payload);
  // console.log(apiToken);
  if (apiToken) {
    // Decode apiToken
    const decoded: any = await verifyApiToken(apiToken);
    if (decoded) {
      // response
      if (decoded.email) {
        // session??? apiToken ??????
        addTokenToSession(decoded.email, apiToken);
        // const oldApiToken = store(decoded.email);
        // if (oldApiToken) {
        //   console.log("Existing apiToken will be deleted!!!");
        // }
        // store(decoded.email, apiToken);
        // cookie??? apiToken ?????? - ?????? apiToken??? ?????????.
        res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/; Max-Age=28800; httponly;`); // 8?????? ??? ??????
        // response
        res.status(200);
        return res.json({
          ok: true,
          text: "Hellooooooooooo",
        });
      } else {
        console.log("email not exsist!!!", decoded);
        return res.status(401).json({
          text: "Noooooooooooooo",
          code: -4,
        });
      }
    } else {
      // response
      return res.status(401).json({
        text: "Noooooooooooooo",
        code: -3,
      });
    }
    /*
    JWT.verify(
      apiToken,
      process.env["publicKey"],
      { algorithms: ["RS256"] },
      async function (err: any, decoded: any) {
        if (err) {
          // console.log("apiToken err:", err);
          return res.status(401).json({
            text: "Noooooooooooooo",
            code: -3,
          });
        } else {
          // console.log("apiToken decoded:", decoded);
          if (decoded.email) {
            ////////////////////////////
            // Assign value
            // req.session.user = {
            //   email: decoded.email,
            //   token: apiToken,
            // };
            // Save at a session
            // console.log("req.session NEW:", req.session.user);
            // await req.session.save();
            // res.send({ ok: true });
            ////////////////////////////

            // session??? apiToken ??????
            store(decoded.email, apiToken);
            // cookie??? apiToken ??????
            res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
            // response
            res.status(200);
            return res.json({
              ok: true,
              text: "Hellooooooooooo",
              // token: apiToken,
            });
          } else {
            console.log("email not exsist!!!");
          }
        }
      }
    );
    */
    // res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/; samesite=lax; httpOnly;`);
    // res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
    // // res.redirect("/");
    // res.status(200).json({
    //   text: "Hellooooooooooo",
    //   // token: apiToken,
    // });
  } else {
    return res.status(401).json({
      text: "Noooooooooooooo",
      code: -2,
    });
  }
}

export default withIronSessionApiRoute(handler, options);
