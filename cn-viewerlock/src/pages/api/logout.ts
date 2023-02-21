// const { OAuth2Client } = require("google-auth-library");
// const jwt = require("jsonwebtoken");
// let jwksClient = require("jwks-rsa");
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import * as cookie from "cookie";
// import jwtDecode from "jwt-decode";
import JWT from "jsonwebtoken";
import store from "store2";

interface ApiToken {
  name: string;
  email: string;
  picture: string;
  iat: number;
}

const options: IronSessionOptions = {
  cookieName: "TEST_SESSION_TEST",
  password: "VERYYLONGPASSWORDS1ab1323898esda345q6781!",
};

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

// function removeTokenFromSession(email: string, apiToken: string) {
//   // 5. 토큰 검사 - cookie의 토큰과 session의 토큰이 일치하는지 확인
//   if (verifySession(email, apiToken)) {
//     // 6. 이메일(key)에 해당하는 토큰(data) 삭제
//     store.remove(email);
//     return true;
//   } else {
//     return false;
//   }
// }

// function getUserEmail(req: NextApiRequest) {
//   const cookies = cookie.parse(req.headers.cookie);
//   console.log("apiToken:", cookies["apiToken"]);
//   const apiToken: ApiToken = jwtDecode(cookies["apiToken"]);
//   if (apiToken) {
//     console.log("apiToken.email:", apiToken.email);
//     return apiToken.email;
//   } else {
//     return null;
//   }
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("---------- Log-Out handler ----------", store());
  /**
   * 1. Cookie의 apiToken 토큰
   * 2. apiToken의 signature 검증
   * 3. 사용자 이메일 획득
   * 4. 세션에서 apiToken 검사
   * 5. 토큰 검사 - cookie의 토큰과 session의 토큰이 일치하는지 확인
   * 6. 이메일(key)에 해당하는 토큰(data) 삭제
   * 7. 쿠키에서 apiToken 삭제
   */

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

  // 3. 사용자 이메일 획득
  if (decoded.email) {
    // removeTokenFromSession(decoded.email, apiToken);
    const oldApiToken = store(decoded.email);
    // 4. 세션에서 apiToken 검사
    if (oldApiToken) {
      // 5. 토큰 검사 - cookie의 토큰과 session의 토큰이 일치하는지 확인
      if (verifySession(decoded.email, apiToken)) {
        // 6. 이메일(key)에 해당하는 토큰(data) 삭제
        store.remove(decoded.email);
      } else {
        // cookie와 session의 apiToken이 다름!!! 이미 만료된 apiToken - 세션은 삭제하지 않고 쿠키만 삭제
        console.log("Already log-out by other client or apiToken expired!!!");
      }
    } else {
      // 세션에 apiToken이 없는 경우 유효하지 않은 접근 - 세션은 삭제하지 않고 쿠키만 삭제
      console.warn("apiToken not exist!!!");
    }
  }
  // 7. 쿠키에서 apiToken 삭제
  res.setHeader("Set-Cookie", `apiToken=deleted; path=/; Max-Age=0; httponly;`);
  return res.redirect("/login");
}

export default withIronSessionApiRoute(handler, options);
