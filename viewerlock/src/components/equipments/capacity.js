// import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { getDateStamp } from "../../lib/common";

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

export const Capacity = (props) => {
  const theme = useTheme();

  const devices = [
    {
      title: "Desktop",
      value: 65,
      icon: LaptopMacIcon,
      color: "#3F51B5",
    },
    {
      title: "Tablet",
      value: 15,
      icon: TabletIcon,
      color: "#E53935",
    },
  ];
  const { type } = props;
  let panelId = 0;
  if (type === "shape") panelId = 25;
  else if (type === "leak") panelId = 27;
  else if (type === "assemble") panelId = 29;
  const graphSrc = `http://localhost:3000/d-solo/udWnXn0Vz/new-dashboard?orgId=1&refresh=10s&panelId=${panelId}&from=${getDateStamp(
    6
  )}&to=${Date.now() + 1000 * 360}`;

  return (
    <Card {...props}>
      <CardHeader
        title="설비 가동률"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 320,
            position: "relative",
          }}
        >
          <iframe src={graphSrc} width="100%" height="100%" frameBorder="0"></iframe>
          {/* <Doughnut data={data} options={options} /> */}
          {/* <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={300} onMouseEnter={null}>
              <Pie
                data={data}
                // cx={100}
                // cy={100}
                startAngle={450}
                endAngle={450 - (360 * data[0].value) / 100}
                innerRadius={80}
                outerRadius={100}
                fill="#0088FE"
                paddingAngle={0}
                dataKey="value"
              >
                <Label
                  // width={20}
                  position="center"
                  content={<CustomLabel value1={data[0].value} value2={"%"} />}
                ></Label>
              </Pie>
              <Legend wrapperStyle={{ fontSize: "14px" }} />
            </PieChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
