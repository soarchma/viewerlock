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
    "모델-1": 4,
    "모델-2": 2,
    "모델-3": 1,
    "모델-4": 5,
    "모델-5": 3,
  },
  {
    name: "17",
    "모델-1": 5,
    "모델-2": 2,
    "모델-3": 1,
    "모델-4": 7,
    "모델-5": 4,
  },
  {
    name: "18",
    "모델-1": 2,
    "모델-2": 7,
    "모델-3": 2,
    "모델-4": 4,
    "모델-5": 5,
  },
  {
    name: "19",
    "모델-1": 2,
    "모델-2": 5,
    "모델-3": 2,
    "모델-4": 6,
    "모델-5": 1,
  },
  {
    name: "20",
    "모델-1": 1,
    "모델-2": 3,
    "모델-3": 4,
    "모델-4": 2,
    "모델-5": 5,
  },
];

export const InterlockChart = (props) => {
  const graphSrc =
    "http://localhost:3000/d-solo/udWnXn0Vz/new-dashboard?orgId=1&refresh=10s&panelId=14" +
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
              <Line type="number" dataKey="모델-1" strokeWidth={2} stroke="#8884d8" />
              <Line type="number" dataKey="모델-2" strokeWidth={2} stroke="#82ca9d" />
              <Line type="number" dataKey="모델-3" strokeWidth={2} stroke="#f20f0d" />
              <Line type="number" dataKey="모델-4" strokeWidth={2} stroke="#020fFd" />
              <Line type="number" dataKey="모델-5" strokeWidth={2} stroke="#02Ff0d" />
            </LineChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
