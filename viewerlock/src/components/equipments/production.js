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

export const Production = (props) => {
  const data = [
    {
      name: "A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "C",
      uv: 2000,
      pv: 800,
      amt: 2290,
    },
    {
      name: "D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "G",
      uv: 3490,
      pv: 4300,
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
        title="생산 현황"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
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
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
