import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { ProductionList } from "../components/dashboard/production-list";
import { InterlockList } from "../components/dashboard/interlock-list";
import { NextPageContext } from "next";
// import * as cookie from "cookie";
// import { rewrites } from "../../next.config";
import { default as getProps } from "../lib/getProps";
import { useCookies } from "react-cookie";

const Page = (props) => {
  const [cookies, setCookie /*, removeCookie*/] = useCookies(["apiToken"]);
  // console.log("index-dashboard:", props);
  // console.log("apiToken:", cookies["apiToken"]);
  const url =
    "http://localhost:3000/d-solo/dQBuSLI4z/new-dashboard?orgId=1&from=now-1m&to=now&theme=light&panelId=2&refresh=10s";

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <iframe src={url} width="640" height="360" frameBorder="0"></iframe>
            </Grid> */}

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>

            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
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
