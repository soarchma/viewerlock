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

export const ProductionGraph = (props) => {
  const data = [
    {
      name: "16",
      "자동 성형기": 4000,
      "자동 조립기": 2400,
      amt: 2400,
    },
    {
      name: "17",
      "자동 성형기": 3000,
      "자동 조립기": 1398,
      amt: 2210,
    },
    {
      name: "18",
      "자동 성형기": 2000,
      "자동 조립기": 800,
      amt: 2290,
    },
    {
      name: "19",
      "자동 성형기": 2780,
      "자동 조립기": 3908,
      amt: 2000,
    },
    {
      name: "20",
      "자동 성형기": 1890,
      "자동 조립기": 4800,
      amt: 2181,
    },
    {
      name: "21",
      "자동 성형기": 2390,
      "자동 조립기": 3800,
      amt: 2500,
    },
    {
      name: "22",
      "자동 성형기": 3490,
      "자동 조립기": 4300,
      amt: 2100,
    },
  ];

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button
            sx={{
              mt: -2,
            }}
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        }
        title="생산량"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 250,
            position: "relative",
          }}
        >
          {/* <Bar data={data} options={options} /> */}
          <ResponsiveContainer width="100%" height="100%">
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
              {/* <Legend /> */}
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Bar dataKey="자동 성형기" fill="#82ca9d" />
              <Bar dataKey="자동 조립기" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
