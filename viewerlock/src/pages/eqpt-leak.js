import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Production } from "../components/equipments/production";
import { Camera } from "../components/equipments/camera";
import { InterlockList } from "../components/equipments/leak/interlock-list";
import { InterlockChart } from "../components/equipments/leak/interlock-chart";
import { Capacity } from "../components/equipments/capacity";
import { DashboardLayout } from "../components/dashboard-layout";
import { NextPageContext } from "next";
// import * as cookie from "cookie";
// import { rewrites } from "../../next.config";
import { default as getProps } from "../lib/getProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const urlReal =
  "http://localhost:3000/d-solo/3Qi9Uxh4k/viewerlock?orgId=1&refresh=5s&from=now-1m&to=now&panelId=6";
const urlTest =
  "http://localhost:3000/d-solo/hXeL8624z/test?orgId=1&from=now-1m&to=now&refresh=5s&panelId=2";

const Page = (props) => {
  const [url, setUrl] = useState(urlReal);
  const { myEmitter } = props;

  useEffect(() => {
    myEmitter.on("leakEvent", (msg) => {
      const obj = JSON.parse(msg);
      if (obj.test) {
        setUrl(urlTest);
      } else {
        setUrl(urlReal);
      }
    });

    return () => {
      myEmitter.removeAllListeners();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Leak 측정기</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12}>
              <iframe src={url} width="640" height="360" frameBorder="0"></iframe>
            </Grid> */}

            {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid> */}
            {/* <Grid item xl={3} lg={12} sm={6} xs={12}>
              <TasksProgress />
            </Grid> */}
            {/* <Grid item xl={3} lg={12} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid> */}

            <Grid item lg={4} md={4} xl={4} xs={4}>
              <Production />
            </Grid>
            <Grid item lg={3} md={3} xl={3} xs={3}>
              <Capacity sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={5} md={5} xl={5} xs={5}>
              <Camera sx={{ height: "100%" }} type="leak" />
            </Grid>

            <Grid item lg={3} md={3} xl={3} xs={3}>
              <InterlockList sx={{ height: "100%" }} event={myEmitter} />
            </Grid>
            <Grid item lg={4} md={4} xl={4} xs={4}>
              <InterlockChart />
            </Grid>
            <Grid item lg={5} md={5} xl={5} xs={5}>
              <iframe src={url} width="100%" height="100%" frameBorder="0" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export const getServerSideProps = getProps;
// 또는 추가 prop 리턴이 필요할 경우
export async function getServerSideProps(context) {
  const { props, redirect } = await getProps(context);
  return { props: { ...props, test2: "test2" }, redirect };
}

export default Page;
