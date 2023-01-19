import Head from "next/head";
import { Box, Container, Grid, Card } from "@mui/material";
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
import { ProductionGraph } from "../components/dashboard/production-graph";
import { InterlockGraph } from "../components/dashboard/interlock-graph";
import { CapacityLayout } from "../components/dashboard/capacity-layout";
import { InterlockChart } from "../components/dashboard/interlock-chart";
import { Capacity } from "../components/dashboard/capacity";
import { NextPageContext } from "next";
// import * as cookie from "cookie";
// import { rewrites } from "../../next.config";
import { default as getProps } from "../lib/getProps";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Page = (props) => {
  // const [cookies, setCookie /*, removeCookie*/] = useCookies(["apiToken"]);
  // const [test, setTest] = useState(null);
  // console.log("index-dashboard:", props);
  // console.log("apiToken:", cookies["apiToken"]);
  // const url =
  //   "http://localhost:3000/d-solo/dQBuSLI4z/new-dashboard?orgId=1&from=now-1m&to=now&theme=light&panelId=2&refresh=10s";

  // console.log(props);

  const { myEmitter } = props;
  useEffect(() => {
    // myEmitter.on("testEvent", (msg) => {
    //   console.log(msg);
    // });

    return () => {
      myEmitter.removeAllListeners();
      console.log("index.js ==> Clean Up~!");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item lg={6} sm={6} xl={6} xs={6}>
              <ProductionList />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={6}>
              <InterlockList />
            </Grid>

            <Grid item lg={6} sm={6} xl={6} xs={6}>
              <ProductionGraph />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={6}>
              <InterlockGraph sx={{ height: "100%" }} />
            </Grid>

            <Grid item lg={6} sm={6} xl={6} xs={6}>
              <CapacityLayout />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={6}>
              <InterlockChart />
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
