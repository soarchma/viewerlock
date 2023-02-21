const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const clientId =
  "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

async function verify(token) {
  console.log("token:", token);
  const ticket = await client
    .verifyIdToken({
      idToken: token.credential,
      // idToken:
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3Y2MwZWY0YzcxODFjZjRjMGRjZWY3YjYwYWUyOGNjOTAyMmM3NmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjY4NjQ2MTIsImF1ZCI6Ijk1MjA0NzUyMTA4MS05NDcwazV2YjBsb21zNGpwbWpsbjAxaTZzNWdvZ3FnZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzg3MzQwMzMwMzY5Mjc2NDI2NSIsImVtYWlsIjoic29hcmNobWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijk1MjA0NzUyMTA4MS05NDcwazV2YjBsb21zNGpwbWpsbjAxaTZzNWdvZ3FnZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiLrsLHsirntmZQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MXRrTWJjRE5BcVlyS054TE9yOHR3ZFlWZUtVT2o0OEFFVk8yeVJnZz1zOTYtYyIsImdpdmVuX25hbWUiOiLsirntmZQiLCJmYW1pbHlfbmFtZSI6IuuwsSIsImlhdCI6MTY2Njg2NDkxMiwiZXhwIjoxNjY2ODY4NTEyLCJqdGkiOiJjNTUxMTk1YWVkYmI5YjFjNjM1OTQ1ZmE3MDI1NDMwODY0ODdmYjE4In0.CRZsbVk8Yz_8zdp_m-W_itF-uqZAQxrEuZKp3Nl7j0CGTDJirTzdraXupjeEQTzH5XLcNjL--CG8Ywb7yw5HdsXydTdXr7bSqNJrVA3EMj6tLeiGsa5NQtml1HseYGtkUSdTOAeBhMVRnZPyMQ3PXtFKOnOdRUiIUr9PM69c1diCkru6U94qHrBXIOZl0Z2aORBG6Gcw8Mg2qIDSJDVPoFd-Dae0Fu2m1W8iITG0dvboPnGwskNh1Um-ud4uvBpbrXWLzLSetauXbkwyDX06c0kfrT0YrPbJcKWZvdAO7C1fMxTWBg203M7i-0awN-5aM3aZO7aTsY9mgwPInyNEGQ",
      // audience: clientId, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((res) => {
      console.log("asdf:", res);
      // TODO: DB에서 이메일 체크
      return res;
    })
    .catch((err) => {
      console.log(err);
      // TODO: 세밀한 에러 처리
      return null;
    });

  if (ticket) {
    const payload = ticket.getPayload();
    const token = apiToken(payload);
    console.log("token:", token);
    jwt.verify(token, "JWT_SECRET", (err, decoded) => {
      console.log("decoded:", decoded);
    });
    // const userid = payload["name"];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    console.log("payload:", payload);
    const dateIAT = new Date(0);
    dateIAT.setUTCSeconds(payload.iat + 9 * 60 * 60);
    const dateEXP = new Date(0);
    dateEXP.setUTCSeconds(payload.exp + 9 * 60 * 60);
    console.log("dateIAT:", dateIAT);
    console.log("dateEXP:", dateEXP);

    return token;
  }
  return null;
}

const apiToken = (payload) => {
  const { sub, name, email } = payload;
  console.log(` id: ${sub}\n name:${name}\n email:${email}`);
  const token = jwt.sign(
    {
      id: sub,
      name,
      email,
    },
    "JWT_SECRET"
  );

  // connection.execute('UPDATE `innoboost_user` SET `TOKEN`= ? WHERE (`ID`= ?)', [token, sub], (err, results) => {
  // 	console.log(results)
  // });
  return token;
};

export default async function handler(req, res) {
  console.log("handler");
  // console.log("req:", req.body);
  // console.log('res:', res);
  // res.setHeader("Set-Cookie");
  const token = await verify(req.body);
  // console.log(result);
  if (token) {
    res.status(200).json({
      text: "Hellooooooooooo",
      token: token,
    });
  } else {
    res.status(401).json({
      text: "Noooooooooooooo",
      code: -1,
    });
  }
}
