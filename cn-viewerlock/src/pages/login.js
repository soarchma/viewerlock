import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Facebook as FacebookIcon } from "../icons/facebook";
// import { Google as GoogleIcon } from "../icons/google";
import GoogleButton from "../components/GoogleButton";

const Login = (props) => {
  console.log(props);
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
        <title>Login</title>
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
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
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
            ?????? ??? ?????? ??????: sh.baek@cloudnetworks.co.kr
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
