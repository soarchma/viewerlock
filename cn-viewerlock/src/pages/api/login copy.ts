import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken";
// import { VerifyOptions, Algorithm } from "jsonwebtoken";
import rsaPemToJwk from "rsa-pem-to-jwk";
import fs from "fs";
import store from "store2";
// import jwksClient, { JwksClient } from "jwks-rsa";
// import { bodyStreamToNodeStream } from "next/dist/server/body-streams";

const googleClientId = "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";
const googleClient = new OAuth2Client(googleClientId);

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

let privateKey = undefined;
let publicKey = undefined;

async function verify(googleJwt) {
  // console.log("googleJwt:", googleJwt);
  const ticket = await googleClient
    .verifyIdToken({
      idToken: googleJwt.credential,
      // idToken:
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3Y2MwZWY0YzcxODFjZjRjMGRjZWY3YjYwYWUyOGNjOTAyMmM3NmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjY4NjQ2MTIsImF1ZCI6Ijk1MjA0NzUyMTA4MS05NDcwazV2YjBsb21zNGpwbWpsbjAxaTZzNWdvZ3FnZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzg3MzQwMzMwMzY5Mjc2NDI2NSIsImVtYWlsIjoic29hcmNobWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijk1MjA0NzUyMTA4MS05NDcwazV2YjBsb21zNGpwbWpsbjAxaTZzNWdvZ3FnZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiLrsLHsirntmZQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MXRrTWJjRE5BcVlyS054TE9yOHR3ZFlWZUtVT2o0OEFFVk8yeVJnZz1zOTYtYyIsImdpdmVuX25hbWUiOiLsirntmZQiLCJmYW1pbHlfbmFtZSI6IuuwsSIsImlhdCI6MTY2Njg2NDkxMiwiZXhwIjoxNjY2ODY4NTEyLCJqdGkiOiJjNTUxMTk1YWVkYmI5YjFjNjM1OTQ1ZmE3MDI1NDMwODY0ODdmYjE4In0.CRZsbVk8Yz_8zdp_m-W_itF-uqZAQxrEuZKp3Nl7j0CGTDJirTzdraXupjeEQTzH5XLcNjL--CG8Ywb7yw5HdsXydTdXr7bSqNJrVA3EMj6tLeiGsa5NQtml1HseYGtkUSdTOAeBhMVRnZPyMQ3PXtFKOnOdRUiIUr9PM69c1diCkru6U94qHrBXIOZl0Z2aORBG6Gcw8Mg2qIDSJDVPoFd-Dae0Fu2m1W8iITG0dvboPnGwskNh1Um-ud4uvBpbrXWLzLSetauXbkwyDX06c0kfrT0YrPbJcKWZvdAO7C1fMxTWBg203M7i-0awN-5aM3aZO7aTsY9mgwPInyNEGQ",
      // audience: googleClientId, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((res) => {
      // console.log("asdf:", res);
      // TODO: DB에서 이메일 체크
      return res;
    })
    .catch((err) => {
      console.log(err);
      // TODO: 세밀한 에러 처리
      return null;
    });

  if (ticket) {
    // console.log("ticket >>>>>>>>>>>>>>>>>>>>>>>>>", ticket);
    const payload = ticket.getPayload();
    const apiToken = createApiToken(payload);

    // JWT.verify(apiToken, privateKey, (err, decoded) => {
    //   if (err) {
    //     console.log("apiToken err:", err);
    //   } else {
    //     console.log("apiToken decoded:", decoded);
    //   }
    // });
    // JWT.verify(apiToken, getKey, { algorithm: "RS256" }, function (err, decoded) {
    //   if (err) {
    //     console.log("apiToken err:", err);
    //   } else {
    //     console.log("apiToken decoded:", decoded);
    //   }
    // });
    // const userid = payload["name"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    // console.log("payload:", payload);
    // const dateIAT = new Date(0);
    // dateIAT.setUTCSeconds(payload.iat + 9 * 60 * 60);
    // const dateEXP = new Date(0);
    // dateEXP.setUTCSeconds(payload.exp + 9 * 60 * 60);
    // console.log("dateIAT:", dateIAT);
    // console.log("dateEXP:", dateEXP);

    return apiToken;
  }
  return null;
}

const createApiToken = (payload) => {
  const { picture, name, email } = payload;
  // console.log(` picture: ${picture}\n name:${name}\n email:${email}`);
  // privateKey = "MY-KEY";
  privateKey = fs.readFileSync("private-key.pem");
  publicKey = fs.readFileSync("public-key.pem");
  // console.log("privateKey ===========", privateKey);
  // const expires = new Date();
  // TODO:FIXME: 기존 로그인이 유효하면 기존 로그인을 만료 시킨후 진행한다.
  // 개인키를 사용하여 JWT 생성.
  const apiToken: string = JWT.sign({ name, email, picture }, privateKey, { algorithm: "RS256" });
  // const vOption: VerifyOptions = { algorithms: undefined };
  // const algorithm: Algorithm = "RS256";

  console.log("apiToken >>>>>>>>>>>>>>>>>>>>>>>", apiToken);
  // 개인키를 사용하여 JWKS 생성
  // const jwk = rsaPemToJwk(privateKey, { use: "sig" }, "public");
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

async function login(req: NextApiRequest, res: NextApiResponse) {
  console.log("===== login", store("user"));
  store("user", "login");
}

async function logout(req: NextApiRequest, res: NextApiResponse) {
  console.log("===== logout", store("user"));
  store("user", "logout");
}

async function userCheck(req: NextApiRequest, res: NextApiResponse) {
  console.log("===== userCheck", store("user"));
  store("user", "userCheck");
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("---------- Log-In handler. query:", req.query, "----------");
  if (req.query) {
    const func = req.query.f;
    if (!func) {
      res.status(400).json({ text: `Wrong request!!! ${func}` });
      return;
    }
    if (func === "1") {
      login(req, res);
      // return;
    } else if (func === "2") {
      logout(req, res);
      // return;
    } else if (func === "3") {
      userCheck(req, res);
      // return;
    } else {
      console.log("?????????????????????????111", req.query);
      // res.status(400).json({ text: `Wrong request!!! ${req.query}` });
      // return;
    }
  } else {
    console.log("?????????????????????????222", req.query);
    // res.status(400).json({ text: `Wrong request!!! ${req.query}` });
    // return;
  }
  /** 로그인 시퀀스
   *
   * ticket = googleClient.verifyIdToken({googleJwt.credential});
   * payload = ticket.getPayload();
   *
   * if(payload) {
   *    if(exist old apiToken?) {
   *      expireApiToken(); // 필요한가? store() 하면 어차피 기존 토큰은 지워진다.
   *      // 기존 로그인 클라이언트에게 메세지 전달할 방법은?
   *    }
   *    apiToken = createApiToken(payload);
   *    store(email, apiToken);
   *    res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
   *    res.status(200);
   *    res.json();
   * } else {
   *    res.status(401);
   * }
   */

  // req.body -> googleJwt
  const apiToken: string = await verify(req.body);
  // console.log(apiToken);
  if (apiToken) {
    // Decode apiToken
    JWT.verify(
      apiToken,
      publicKey,
      { algorithms: ["RS256"] },
      async function (err: any, decoded: any) {
        if (err) {
          console.log("apiToken err:", err);
        } else {
          console.log("apiToken decoded:", decoded);
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
            res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
            res.status(200);
            res.json({
              ok: true,
              text: "Hellooooooooooo",
              // token: apiToken,
            });
            return;
          } else {
            console.log("email not exsist!!!");
          }
        }
      }
    );
    // res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/; samesite=lax; httpOnly;`);
    // res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/;`);
    // // res.redirect("/");
    // res.status(200).json({
    //   text: "Hellooooooooooo",
    //   // token: apiToken,
    // });
  } else {
    res.status(401).json({
      text: "Noooooooooooooo",
      code: -1,
    });
  }
}

export default withIronSessionApiRoute(handler, options);
