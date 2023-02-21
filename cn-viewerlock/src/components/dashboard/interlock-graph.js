// import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDateStamp } from "../../lib/common";

export const InterlockGraph = (props) => {
  const data = [
    {
      name: "16",
      "자동 성형기": 4000,
      "자동 조립기": 2400,
      "리크 측정기": 2400,
    },
    {
      name: "17",
      "자동 성형기": 3000,
      "자동 조립기": 1398,
      "리크 측정기": 2210,
    },
    {
      name: "18",
      "자동 성형기": 2000,
      "자동 조립기": 800,
      "리크 측정기": 2290,
    },
    {
      name: "19",
      "자동 성형기": 2780,
      "자동 조립기": 3908,
      "리크 측정기": 2000,
    },
    {
      name: "20",
      "자동 성형기": 1890,
      "자동 조립기": 4800,
      "리크 측정기": 2181,
    },
    {
      name: "21",
      "자동 성형기": 2390,
      "자동 조립기": 3800,
      "리크 측정기": 2500,
    },
    {
      name: "22",
      "자동 성형기": 3490,
      "자동 조립기": 4300,
      "리크 측정기": 2100,
    },
  ];
  const graphSrc =
    "http://localhost:3000/d-solo/udWnXn0Vz/new-dashboard?orgId=1&refresh=10s&panelId=21&theme=light" +
    `&from=${getDateStamp(6)}&to=${Date.now() + 1000 * 360}`;

  return (
    <Card {...props}>
      <CardHeader
        // action={
        //   <Button
        //     sx={{
        //       mt: -2,
        //     }}
        //     endIcon={<ArrowDropDownIcon fontSize="small" />}
        //     size="small"
        //   >
        //     Last 7 days
        //   </Button>
        // }
        title="인터락 발생"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Box
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 250,
            position: "relative",
          }}
        >
          <iframe src={graphSrc} width="100%" height="100%" frameBorder="0"></iframe>
          {/* <Bar data={data} options={options} /> */}
          {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart
              // width={440}
              // height={320}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Bar dataKey="자동 성형기" fill="#82ca9d" />
              <Bar dataKey="리크 측정기" fill="#eb6491" />
              <Bar dataKey="자동 조립기" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
