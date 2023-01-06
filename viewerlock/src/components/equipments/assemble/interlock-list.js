import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
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

function createData(type, straight_1, straight_2, shape_1) {
  return { type, straight_1, straight_2, shape_1 };
}

const rows_1 = [
  createData("Day", 5, 3, 6),
  createData("Week", 0, 8, 2),
  createData("Month", 3, 12, 4),
];
const rows_2 = [
  createData("Day", 1, 7, 12),
  createData("Week", 4, 8, 2),
  createData("Month", 3, 9, 6),
];

export const InterlockList = (props) => {
  // const data = createData(1500, 900, 1750, 11990, 11991, 10180, 10180);

  return (
    <Card {...props}>
      <CardHeader
        title="불량 모니터링 현황"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Unit-1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">주기</TableCell>
              <TableCell align="center">확관 불량</TableCell>
              <TableCell align="center">레듀샤 체결불량</TableCell>
              <TableCell align="center">O링 삽입불량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_1.map((row) => {
              // row.shape_2 ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={row.type}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    // bgcolor: row.shape_2 ? "red" : null,
                  }}
                  style={{ height: 44 }}
                >
                  <TableCell align="center" sx={{}} component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.straight_1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.straight_2}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.shape_1}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Divider /> */}

      {/* <CardHeader
        title="실시간 데이타"
        sx={{
          mb: -1,
          height: 60,
        }}
      /> */}

      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Unit-2
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">주기</TableCell>
              <TableCell align="center">확관 불량</TableCell>
              <TableCell align="center">레듀샤 체결불량</TableCell>
              <TableCell align="center">O링 삽입불량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_2.map((row) => {
              // row.shape_2 ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={row.type}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    // bgcolor: row.shape_2 ? "red" : null,
                  }}
                  style={{ height: 44 }}
                >
                  <TableCell align="center" sx={{}} component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.straight_1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.straight_2}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.shape_1}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
