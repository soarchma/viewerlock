import { Fragment } from "react";
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

import { GoogleOAuthProvider } from "@react-oauth/google";

registerChartJs();

const clientId = "952047521081-9470k5vb0loms4jpmjln01i6s5gogqgd.apps.googleusercontent.com";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
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
  console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default App;
