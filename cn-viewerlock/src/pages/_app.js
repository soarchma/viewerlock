import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import { EventEmitter } from "events";
import { GoogleOAuthProvider } from "@react-oauth/google";

registerChartJs();

const clientId = "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";
const clientSideEmotionCache = createEmotionCache();
const myEmitter = new EventEmitter();
const listenEvents = ["shape", "leak", "assem", "newProd", "newIl"];
let tempWs = null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [ws, setWs] = useState(undefined);

  const getLayout =
    Component.getLayout ??
    ((page) => {
      // console.log("PAGE!!!!!!");
      return page;
    });

  Object.assign(pageProps, { myEmitter: myEmitter });

  const connet = () => {
    console.log("_app.js ===> Websocket connet()");
    // const fileReader = new FileReader();
    let _ws = new WebSocket("ws://host.docker.internal:8070"); // real server
    // let _ws = new WebSocket("ws://localhost:8070"); // test server

    _ws.onclose = (ev) => {
      console.log("onclose", ev);
      // const timeout = setTimeout(() => {
      //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //   window.location.replace("/");
      // }, 3000);
      setWs(null);
    };
    _ws.onerror = (ev) => {
      console.log("onerror", ev);
    };
    _ws.onmessage = (ev) => {
      // console.log("onmessage...", ev.data);
      const obj = JSON.parse(ev.data);
      // console.log("onmessage...", obj);
      if (listenEvents.indexOf(obj.type) >= 0) {
        myEmitter.emit(obj.type, ev.data);
      }
    };
    _ws.onopen = (ev) => {
      console.log("onopen", ev);
    };

    return _ws;
  };

  const disConnet = (ws) => {
    console.log("_app.js ===> Websocket disConnet()", ws);
    if (ws) {
      ws.close();
    }
  };

  useEffect(() => {
    return function cleanUp() {
      // app 종료 및 새로고침 시 웹소켓 종료
      console.log("_app.js ===> CleanUp!!!", ws);
      console.log("tempWs==========================", tempWs);
      disConnet(tempWs);
      setWs(null);
    };
  }, []);

  useEffect(() => {
    if (!pageProps.user) {
      // 로그아웃 시 웹소켓 종료
      disConnet(ws);
      setWs(null);
    } else {
      console.log("_app.js ===> useEffect[pageProps]", ws);
      // 로그인 시 웹소켓 시작
      if (!ws) {
        setWs(0);
      }
    }
  }, [pageProps]);

  useEffect(() => {
    if (pageProps.user) {
      console.log("_app.js ===> useEffect[ws]", ws);
      if (!ws) {
        setWs(connet(ws));
      }
    }
    tempWs = ws;
  }, [ws]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ViewerLock</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GoogleOAuthProvider
            clientId={clientId}
            onScriptLoadSuccess={() => console.log("GoogleOAuthProvider Success!!!")}
          >
            <AuthProvider>
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <Fragment /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </AuthProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export async function getStaticProps({ params }) {
  // const cookies = cookie.parse(context.req.headers.cookie);
  // console.log("CCCCCCCCCCCCCCC", cookies);
  console.log("_app.js -> getStaticProps");
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default App;
