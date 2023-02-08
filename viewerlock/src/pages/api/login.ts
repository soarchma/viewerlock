import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken";
// import { VerifyOptions, Algorithm } from "jsonwebtoken";
// import rsaPemToJwk from "rsa-pem-to-jwk";
import fs from "fs";
import store from "store2";
// import jwksClient, { JwksClient } from "jwks-rsa";
// import { bodyStreamToNodeStream } from "next/dist/server/body-streams";

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
  // TODO:FIXME: 기존 로그인이 유효하면 기존 로그인을 만료 시킨후 진행한다.
  // 개인키를 사용하여 JWT 생성.
  const apiToken: string = JWT.sign({ name, email, picture }, process.env["privateKey"], {
    algorithm: "RS256",
  });
  // const vOption: VerifyOptions = { algorithms: undefined };
  // const algorithm: Algorithm = "RS256";

  console.log("apiToken >>>>>>>>>>>>>>>>>>>>>>>", apiToken);
  // 개인키를 사용하여 JWKS 생성
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

  // reauest 시에 파라미터 전달 시 아래 코드 사용.
  // console.log("---------- Log-In handler. query:", req.query, "----------");
  // if (req.query) {
  //   const func = req.query.f;
  //   if (!func) {
  //     res.status(400).json({ text: `Wrong request!!! ${func}` });
  //     return;
  //   }
  // }

  /** 로그인 시퀀스
   *
   * ticket = googleClient.verifyIdToken({googleJwt.credential});
   * payload = ticket.getPayload();
   *
   * if(payload) {
   *    TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
   *    if(exist old apiToken?) {
   *      expireApiToken(); // 필요한가? store() 하면 어차피 기존 토큰은 지워진다.
   *      // 기존 로그인 클라이언트에게 메세지 전달할 방법은?
   *    }
   *    TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
   *    // apiToken 생성
   *    apiToken = createApiToken(payload);
   *    // session에 apiToken 저장
   *    store(email, apiToken); // 기존 토근이 있다면 이때 삭제 된다.
   *    // cookie에 apiToken 저장
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

  // signature 에러 시뮬레이션
  // const publicKey = fs.readFileSync("public.pem");

  // apiToken 생성
  const apiToken = createApiToken(payload);
  // console.log(apiToken);
  if (apiToken) {
    // Decode apiToken
    const decoded: any = await verifyApiToken(apiToken);
    if (decoded) {
      // response
      if (decoded.email) {
        // session에 apiToken 저장
        addTokenToSession(decoded.email, apiToken);
        // const oldApiToken = store(decoded.email);
        // if (oldApiToken) {
        //   console.log("Existing apiToken will be deleted!!!");
        // }
        // store(decoded.email, apiToken);
        // cookie에 apiToken 저장 - 기존 apiToken은 삭제됨.
        res.setHeader("Set-Cookie", `apiToken=${apiToken}; path=/; httponly;`);
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

            // session에 apiToken 저장
            store(decoded.email, apiToken);
            // cookie에 apiToken 저장
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
