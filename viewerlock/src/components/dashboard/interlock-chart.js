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

const data = [
  {
    name: "16",
    "자동 성형기": 2,
    "리크 측정기": 1,
    "자동 조립기": 4,
  },
  {
    name: "17",
    "자동 성형기": 2,
    "리크 측정기": 1,
    "자동 조립기": 5,
  },
  {
    name: "18",
    "자동 성형기": 7,
    "리크 측정기": 2,
    "자동 조립기": 2,
  },
  {
    name: "19",
    "자동 성형기": 5,
    "리크 측정기": 2,
    "자동 조립기": 2,
  },
  {
    name: "20",
    "자동 성형기": 3,
    "리크 측정기": 4,
    "자동 조립기": 1,
  },
];

export const InterlockChart = (props) => {
  return (
    <Card {...props}>
      <CardHeader
        title="인터락 트랜드"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 160,
            position: "relative",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // width={440}
              // height={320}
              data={data}
              margin={{
                top: 0,
                right: 30,
                left: -10,
                bottom: -12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Line type="number" dataKey="자동 성형기" strokeWidth={5} stroke="#82ca9d" />
              <Line type="number" dataKey="리크 측정기" strokeWidth={5} stroke="#eb6491" />
              <Line type="number" dataKey="자동 조립기" strokeWidth={5} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
