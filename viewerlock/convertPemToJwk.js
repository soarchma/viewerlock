const fs = require("fs");
const rsaPemToJwk = require("rsa-pem-to-jwk");

const privateKey = fs.readFileSync("./private.pem");
// console.log(privateKey);
const jwk = rsaPemToJwk(privateKey, { use: "sig" }, "public");
console.log(jwk);
