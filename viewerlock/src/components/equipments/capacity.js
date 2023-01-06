// import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";

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
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          {/* <Doughnut data={data} options={options} /> */}
          <ResponsiveContainer width="100%" height="100%">
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
                {/* {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))} */}
                <Label
                  // width={20}
                  position="center"
                  content={<CustomLabel value1={data[0].value} value2={"%"} />}
                ></Label>
              </Pie>
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              {/* <Tooltip /> */}
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};
