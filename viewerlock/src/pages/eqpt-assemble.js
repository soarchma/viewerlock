import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Production } from "../components/equipments/production";
import { Camera } from "../components/equipments/camera";
import { InterlockList } from "../components/equipments/assemble/interlock-list";
import { InterlockChart } from "../components/equipments/assemble/interlock-chart";
import { Capacity } from "../components/equipments/capacity";
import { DashboardLayout } from "../components/dashboard-layout";
import { NextPageContext } from "next";
// import * as cookie from "cookie";
// import { rewrites } from "../../next.config";
import { default as getProps } from "../lib/getProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Page = (props) => {
  const { myEmitter } = props;

  return (
    <>
      <Head>
        <title>자동 조립기</title>
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
            <Grid item lg={5} md={5} xl={5} xs={5}>
              <Production sx={{ height: "100%" }} type="assemble" />
            </Grid>
            <Grid item lg={2} md={2} xl={2} xs={2}>
              <Capacity sx={{ height: "100%" }} type="assemble" />
            </Grid>
            <Grid item lg={5} md={5} xl={5} xs={5}>
              <Camera sx={{ height: "100%" }} type="assemble" />
            </Grid>

            <Grid item lg={5} md={5} xl={5} xs={5}>
              <InterlockList sx={{ height: "100%" }} event={myEmitter} />
            </Grid>
            <Grid item lg={7} md={7} xl={7} xs={7}>
              <InterlockChart sx={{ height: "100%" }} />
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
