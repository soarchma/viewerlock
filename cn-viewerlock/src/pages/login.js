import Head from "next/head";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography, Switch } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Facebook as FacebookIcon } from "../icons/facebook";
// import { Google as GoogleIcon } from "../icons/google";
import GoogleButton from "../components/GoogleButton";

import { useCookies } from "react-cookie";

const Login = (props) => {
  const [simul, setSimul] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["simulation"]);
  const { myEmitter } = props;

  // let toggle = false;
  // if (cookies.simulation && cookies.simulation.enabled) toggle = cookies.simulation.enabled;

  const handleChange = () => {
    setCookie("simulation", { enabled: !simul }, { path: "/" });
    setSimul(!simul);
    console.log(cookies.simulation);
  };

  useEffect(() => {
    if (cookies.simulation && cookies.simulation.enabled) setSimul(cookies.simulation.enabled);
  }, []);

  // console.log("Login", myEmitter);
  // const formik = useFormik({
  //   initialValues: {
  //     email: "demo@devias.io",
  //     password: "Password123",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
  //     password: Yup.string().max(255).required("Password is required"),
  //   }),
  //   onSubmit: () => {
  //     Router.push("/").catch(console.error);
  //   },
  // });

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          {/* <form onSubmit={formik.handleSubmit}> */}
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              로그인
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              ViewerLock으로 로그인
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid> */}
            <Grid item xs={12} md={12}>
              {/* <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button> */}
              <GoogleButton />
            </Grid>
          </Grid>
          {/* <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box> */}
          <Typography color="textSecondary" variant="body2">
            <br></br>
            계정 및 사용 문의: sh.baek@cloudnetworks.co.kr
            {/* Don&apos;t have an account?{" "} */}
            {/* <NextLink href="/register">
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </NextLink> */}
          </Typography>
          <Switch
            checked={simul}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* </form> */}
        </Container>
      </Box>
    </>
  );
};

// Login.getgetInitialProps = async (props) => {
// export async function getgetInitialProps(props) {
//   const { ctx, res, router, user } = props;
//   console.log("CCCCCCCCCCCCCCCC", ctx.req.url);

//   return {};
// }

// export async function getStaticProps(context) {
//   console.log("CCCCCCCCCCCCCCC", context);
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

// export async function getServerSideProps(context) {
//   const cookies = cookie.parse(context.req.headers.cookie);
//   console.log("CCCCCCCCCCCCCCC", cookies);
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

export default Login;
