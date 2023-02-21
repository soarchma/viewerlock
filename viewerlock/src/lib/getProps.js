import * as cookie from "cookie";
// import jwksClient from "jwks-rsa";
import jwtDecode from "jwt-decode";
import store from "store2";
import JWT from "jsonwebtoken";
import fs from "fs";
// import WebSocket from "ws";
// import { useRouter } from "next/router";
// import { withIronSessionSsr } from "iron-session/next";
// import { withIronSessionApiRoute } from "iron-session/next";

// const client = jwksClient({
//   jwksUri: "http://localhost:8888/.well-known/jwks.json",
// });

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     console.log("key:", key, err);
//     let signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// JWT.verify(token, getKey, options, function (err, decoded) {
//   console.log(decoded.foo); // bar
// });

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

function verifyApiToken(apiToken) {
  if (apiToken) {
    // Decode apiToken
    const decoded = JWT.verify(
      apiToken,
      process.env["publicKey"],
      { algorithms: ["RS256"] },
      function (err, decoded) {
        if (err) {
          console.log("apiToken err:", err);
          return null;
        } else {
          console.log("apiToken decoded:", decoded);
          return decoded;
        }
      }
    );
    const existApiToken = store(decoded.email);
    if (existApiToken === apiToken) {
      return decoded;
    }
  }

  return false;
}

// console.log("hahahaha@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

export default async function getServerSideProps(context) {
  readEnvKeys();
  const cookies = cookie.parse(context.req.headers.cookie ? context.req.headers.cookie : "");
  let decoded = {};
  console.log("*****************************************************************************");
  // console.log(context.req);
  // const temp = await withIronSessionApiRoute();
  // console.log("temp", temp);

  // const ws = new WebSocket("ws://host.docker.internal:8070", {
  //   perMessageDeflate: false,
  // });

  // // console.log("HAHAHAHAHAHAHAHAHA", JSON.parse(JSON.stringify(ws)));
  // ws.on("open", () => {
  //   console.log("open");
  // });
  // ws.on("close", (code, reason) => {
  //   console.log("close", code, reason);
  // });
  // ws.on("error", (err) => {
  //   console.log("err", err);
  // });
  // ws.on("message", (data) => {
  //   console.log("message", data);
  //   // router.replace(router.asPath);
  // });

  if (cookies && cookies["apiToken"]) {
    decoded = verifyApiToken(cookies["apiToken"]);
    if (decoded) {
      console.log("getProps() - apiToken OK~");
    } else {
      console.warn("getProps() - apiToken expired!!!");
      return {
        redirect: {
          props: { why: "KEKEKEKE" },
          permanent: false,
          destination: "/login",
        },
      };
    }
  } else {
    console.warn("getProps() - apiToken not exist!!!");
    return {
      props: { why: "NONONONO" },
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    // props: { name: payload.name, email: payload.email, picture: payload.picture }, // will be passed to the page component as props
    props: { user: decoded }, // will be passed to the page component as props
  };
}

// withIronSessionApiRoute(
//   async function loginRoute(req, res) {
//     // get user from database then:
//     req.session.user = {
//       id: 230,
//       admin: true,
//     };
//     await req.session.save();
//     res.send({ ok: true });
//   },
//   {
//     cookieName: "myapp_cookiename",
//     password: "complex_password_at_least_32_characters_long",
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     // cookieOptions: {
//     //   secure: process.env.NODE_ENV === "production",
//     // },
//   }
// );
