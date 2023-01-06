// import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { Capacity } from "./capacity";

const data = [
  { name: "가동률", value: 60 },
  // { name: "Capacity", value: 40 },
  // { name: "Group C", value: 300 },
  // { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function CustomLabel({ viewBox, value1, value2 }) {
  const { cx, cy } = viewBox;
  return (
    <text
      x={cx}
      y={cy}
      fill="#3d405c"
      className="recharts-text recharts-label"
      textAnchor="middle"
      dominantBaseline="central"
    >
      <tspan alignmentBaseline="middle" fontSize="26">
        &nbsp;{value1}
      </tspan>
      <tspan fontSize="14">{value2}</tspan>
    </text>
  );
}

export const CapacityLayout = (props) => {
  // const theme = useTheme();

  // const devices = [
  //   {
  //     title: "Desktop",
  //     value: 65,
  //     icon: LaptopMacIcon,
  //     color: "#3F51B5",
  //   },
  //   {
  //     title: "Tablet",
  //     value: 15,
  //     icon: TabletIcon,
  //     color: "#E53935",
  //   },
  // ];

  return (
    <Card {...props}>
      <CardHeader
        title="가동률"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <Grid container rowSpacing={0} columnSpacing={0}>
        <Grid item lg={4} sm={4} xl={4} xs={4}>
          <Capacity val={{ name: "자동 성형기", value: 55 }} color="#82ca9d" />
        </Grid>
        <Grid item lg={4} sm={4} xl={4} xs={4}>
          <Capacity val={{ name: "리크 측정기", value: 66 }} color="#eb6491" />
        </Grid>
        <Grid item lg={4} sm={4} xl={4} xs={4}>
          <Capacity val={{ name: "자동 조립기", value: 77 }} color="#8884d8" />
        </Grid>
      </Grid>
    </Card>
  );
};
