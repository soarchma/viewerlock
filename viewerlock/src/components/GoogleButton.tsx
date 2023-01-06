import { useState, useMemo, useEffect } from "react";
import Router from "next/router";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthContext } from "../contexts/auth-context";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";
// import Keycloak from "keycloak-js";
// import exp from "constants";

// const clientId = "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";

// const cookies = new Cookies();

const GoogleButton = (props) => {
  const [credentialResponse, setCredentialResponse] = useState<CredentialResponse | null>();
  const [cookies, setCookie /*, removeCookie*/] = useCookies(["apiToken"]);
  const [keycloak, setKeycloak] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const authContext: any = useAuthContext();

  const user = useMemo(() => {
    // console.log("+++++++++++++++++++++++++++");
    if (!credentialResponse?.credential) return;
    const temp = jwtDecode(credentialResponse.credential /*, { header: true }*/);
    return temp;
  }, [credentialResponse]);
  // console.log("--------------------------", user);

  console.log("cookies =====================>", cookies);

  // useEffect(() => {
  //   const keycloak = new Keycloak({
  //     url: "http://env.grafana.local:8087/auth",
  //     realm: "grafana",
  //     clientId: "sample-iframe-project",
  //   });

  //   keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
  //     setKeycloak(keycloak);
  //     setAuthenticated(authenticated);
  //   });
  // }, []);

  useEffect(() => {
    async function postCredential() {
      console.log("postCredential()");
      const response = await axios
        .post("./api/login?f=1", credentialResponse, { withCredentials: true })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          if (err.response) {
            return err.response;
          } else if (err.request) {
            console.error("postCredential() - request:", err.request);
            return null;
          } else {
            console.error("postCredential() - message:", err.message);
          }
          console.error("postCredential() - config:", err.config);
          return null;
        });

      if (response) {
        if (response.status === 200) {
          // TODO: 정상. 응답 처리 - 쿠키 저장 및 페이지 이동
          console.log("postCredential() - OK~~~~", response);
          console.log("cookies:", document.cookie);
          // if (response.data) {
          //   if (response.data["token"]) {
          //     const expires = new Date();
          //     // expires.setHours(expires.getHours() + 8); // 쿠키 만료 8 시간
          //     expires.setHours(expires.getHours() + 1); // 쿠키 만료 1 시간
          //     // expires.setMinutes(expires.getMinutes() + 1); // 쿠키 만료 1 분
          //     setCookie("apiToken", response.data["token"], {
          //       expires,
          //       // httpOnly: true,
          //     });
          //     // const test = jwtDecode(response.data["token"]);
          //     // console.log("test: ", test);

          //     // Persist the skip for AuthProvider initialize call
          //     globalThis.sessionStorage.setItem("skip-auth", "true");

          //     Router.push("/");
          //   }
          // }
          // Persist the skip for AuthProvider initialize call
          // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
          authContext.signIn(user);
          globalThis.sessionStorage.setItem("skip-auth", "true");
          Router.push("/");
        } else if (response.status === 401) {
          // TODO: 토큰 인증 불가 - 토큰 오류 or 미등록 이메일
          if (response.data.code === -1) {
            console.log("토큰 오류.");
          } else if (response.data.code === -2) {
            console.log("미등록 이메일.");
          } else {
            console.log("알 수 없는 오류.", response.data);
          }
          console.log("postCredential() - Error!!!", response);
        } else if (response.status === 404) {
          console.log("postCredential() - Error!!!", response);
        } else if (response.status === 500) {
          console.log("postCredential() - Error!!!", response);
        } else {
          console.log("postCredential() - ?????", response);
        }
      }
    }

    if (credentialResponse) {
      console.log("credentialResponse:", credentialResponse);
      postCredential();
    }
  }, [credentialResponse]);

  return (
    // <GoogleOAuthProvider clientId={clientId} onScriptLoadSuccess={() => console.log("hahahahaha")}>
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        setCredentialResponse(credentialResponse);
        console.log("credentialResponse:", credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      auto_select
      size="large"
      theme="filled_blue"
      shape="circle"
      width="600"
      // useOneTap
    />
    // </GoogleOAuthProvider>
  );
};

export default GoogleButton;

// const test = {
//   keys: [
//     {
//       kid: "On2FQuJ8Y-909uJGWQEDkbzG-GRNmMc43HslEgVv_VQ",
//       kty: "RSA",
//       alg: "RS256",
//       use: "sig",
//       n: "qDmQHfTcOQOzmNJbVvtvuS8p_EgmiscP7vA_PZNyKx9O7utyGuoAmJH8e2w8gLIDDWHl5_x8aAIl_-TTPTSiyX8I68ryIdR28ZSe5u4pRdpXCVvJpOefKNIxQCTH7rs4KuRj0HZ2u1mu1Vz5_CeCCoKwKSmheD3u1xTJ8-VxQmdqfGxhuKtnkof7977HWOWy4GLDFqxyYHgihP_MmSeTmXUhVeZI6IOCqHMpF8eFWVGKM6V8rIKf8QO2K_vDJBM_3C933vMY8mqSQXbI3G54x-0myAaQXr4JkxjvUGKg5YC3ZXw7AjfZv_W_fQOG0GYp2hQ0akR4KNKT3XPNmpMVlQ",
//       e: "AQAB",
//       x5c: [
//         "MIICnTCCAYUCBgF+u1ir8jANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdncmFmYW5hMB4XDTIyMDIwMjE2NDkxN1oXDTMyMDIwMjE2NTA1N1owEjEQMA4GA1UEAwwHZ3JhZmFuYTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKg5kB303DkDs5jSW1b7b7kvKfxIJorHD+7wPz2TcisfTu7rchrqAJiR/HtsPICyAw1h5ef8fGgCJf/k0z00osl/COvK8iHUdvGUnubuKUXaVwlbyaTnnyjSMUAkx+67OCrkY9B2drtZrtVc+fwnggqCsCkpoXg97tcUyfPlcUJnanxsYbirZ5KH+/e+x1jlsuBiwxascmB4IoT/zJknk5l1IVXmSOiDgqhzKRfHhVlRijOlfKyCn/EDtiv7wyQTP9wvd97zGPJqkkF2yNxueMftJsgGkF6+CZMY71BioOWAt2V8OwI32b/1v30DhtBmKdoUNGpEeCjSk91zzZqTFZUCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEABlW64QxuREB81VMGsyhj4Q5RykFaVuD5O8YlwUpmVfAVLzb0Drf54Kn4bnpnckKyYV+T+HsN4QXt81UE41xH0Aai2H3vrGH+PJf6aLPCDE+jpMqtN3n6IgImJXJPL8upMfhhWDv4nkM4uynEwWupzmrKi4oJuTETSMktJby4o6//XWnCzCVMoAGFJU4gtjBUzOMLW26zD+yc+BuUtfR3HzItVHSZKQSNSFO0kVS68RgrER8qJw07z3BOJ2bPpPM0PYyEngGMaowz/T6lI32ymGMWYMAnslthS1KAW9xcTBwnrW1nMhe5a0LPxIktys/wJtxIHZLc5sOddGT4xYklLg==",
//       ],
//       x5t: "prs-h1NBqOSJMH-tQWLTqguWets",
//       "x5t#S256": "YjK3HobZW8xbNL1IPDgFhCM41UC5c0hG2cxaF6v961Q",
//     },
//   ],
// };
