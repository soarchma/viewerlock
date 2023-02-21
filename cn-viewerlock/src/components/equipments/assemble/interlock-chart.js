import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDateStamp } from "../../../lib/common";

const data = [
  {
    name: "16",
    확관불량1: 4,
    레듀사체결불량1: 2,
    O링삽입불량1: 1,
    확관불량2: 5,
    니쁠체결불량2: 3,
    O링삽입불량2: 2,
  },
  {
    name: "17",
    확관불량1: 5,
    레듀사체결불량1: 2,
    O링삽입불량1: 1,
    확관불량2: 7,
    니쁠체결불량2: 4,
    O링삽입불량2: 6,
  },
  {
    name: "18",
    확관불량1: 2,
    레듀사체결불량1: 7,
    O링삽입불량1: 2,
    확관불량2: 4,
    니쁠체결불량2: 5,
    O링삽입불량2: 1,
  },
  {
    name: "19",
    확관불량1: 2,
    레듀사체결불량1: 5,
    O링삽입불량1: 2,
    확관불량2: 6,
    니쁠체결불량2: 1,
    O링삽입불량2: 4,
  },
  {
    name: "20",
    확관불량1: 1,
    레듀사체결불량1: 3,
    O링삽입불량1: 4,
    확관불량2: 2,
    니쁠체결불량2: 5,
    O링삽입불량2: 2,
  },
];

export const InterlockChart = (props) => {
  const graphSrc =
    "http://localhost:3000/d-solo/udWnXn0Vz/new-dashboard?orgId=1&refresh=10s&panelId=4&theme=light" +
    `&from=${getDateStamp(6)}&to=${Date.now() + 1000 * 360}`;
  return (
    <Card {...props}>
      <CardHeader
        title="인터락 현황"
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
            height: 350,
            position: "relative",
          }}
        >
          <iframe src={graphSrc} width="100%" height="100%" frameBorder="0"></iframe>
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              <Line type="number" dataKey="확관불량1" strokeWidth={2} stroke="#8884d8" />
              <Line type="number" dataKey="레듀사체결불량1" strokeWidth={2} stroke="#82ca9d" />
              <Line type="number" dataKey="O링삽입불량1" strokeWidth={2} stroke="#f20f0d" />
              <Line type="number" dataKey="확관불량2" strokeWidth={2} stroke="#020fFd" />
              <Line type="number" dataKey="니쁠체결불량2" strokeWidth={2} stroke="#02Ff0d" />
              <Line type="number" dataKey="O링삽입불량2" strokeWidth={2} stroke="#ff02ea" />
            </LineChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
