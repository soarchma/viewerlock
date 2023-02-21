import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
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

const urlReal =
  "http://localhost:3000/d-solo/3Qi9Uxh4k/viewerlock?orgId=1&refresh=5s&from=now-1m&to=now&panelId=6";
const urlTest =
  "http://localhost:3000/d-solo/hXeL8624z/test?orgId=1&from=now-1m&to=now&refresh=5s&panelId=2";

export const InterlockReal = (props) => {
  const { event } = props;
  const [url, setUrl] = useState(urlReal);

  useEffect(() => {
    event.on("leak", (msg) => {
      const obj = JSON.parse(msg);
      // console.log(obj);
      if (obj.test) {
        setUrl(urlTest);
      } else {
        setUrl(urlReal);
      }
    });

    return () => {
      event.removeAllListeners();
    };
  }, []);

  return (
    <Card {...props}>
      <CardHeader
        title="실시간 데이터"
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
          <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
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
              <Line type="number" dataKey="유닛-1" strokeWidth={2} stroke="#8884d8" />
              <Line type="number" dataKey="유닛-2" strokeWidth={2} stroke="#82ca9d" />
              <Line type="number" dataKey="유닛-3" strokeWidth={2} stroke="#f20f0d" />
              <Line type="number" dataKey="유닛-4" strokeWidth={2} stroke="#020fFd" />
              <Line type="number" dataKey="유닛-5" strokeWidth={2} stroke="#02Ff0d" />
            </LineChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
