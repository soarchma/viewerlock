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

const connet = (oldWs) => {
  let ws = new WebSocket("ws://host.docker.internal:8070"); // real server
  // let ws = new WebSocket("ws://localhost:8070"); // test server

  ws.onclose = (ev) => {
    console.log("onclose", ev);
    // const timeout = setTimeout( () => {
    //   window.location.replace("/");
    // }, 3000);
  };
  ws.onerror = (ev) => {
    console.log("onerror", ev);
  };
  ws.onmessage = (ev) => {
    // console.log("onmessage", ev.data);
    const obj = JSON.parse(ev.data);
    let eventType = "";
    if (obj.type) {
      if (obj.type === "leak") eventType = "leakEvent";
      else if (obj.type === "shape") eventType = "shapeEvent";
      else if (obj.type === "assem") eventType = "assemEvent";
      if (eventType != "") myEmitter.emit(eventType, ev.data);
    }
  };
  ws.onopen = (ev) => {
    console.log("onopen", ev);
  };

  return ws;
};

const disConnet = (ws) => {
  if (ws) {
    ws.close();
  }
};

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout =
    Component.getLayout ??
    ((page) => {
      // console.log("PAGE!!!!!!");
      return page;
    });

  Object.assign(pageProps, { myEmitter: myEmitter });

  // console.log("_app:", pageProps);
  const [ws, setWs] = useState(undefined);
  useEffect(() => {
    return function cleanUp() {
      disConnet(ws);
      setWs(null);
    };
  }, []);

  useEffect(() => {
    if (!pageProps.user) {
      disConnet(ws);
      setWs(null);
    } else {
      if (!ws) {
        setWs(connet(ws));
      }
    }
    // return () => {
    //   console.log("_app.js ============> Clean Up~!", ws);
    // };
  }, [pageProps]);

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
