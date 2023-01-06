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

function createData(type, straight_1, straight_2, shape_1, shape_2, cut_1, cut_2) {
  return { type, straight_1, straight_2, shape_1, shape_2, cut_1, cut_2 };
}

const rows = [
  createData(800, 159, 6.0, 24, 1000, 10130, 10130),
  createData(1000, 237, 9.0, 37, 1000, 10130, 10130),
  createData(1200, 900, 1800, 9510, 9511, 10130, 10130),
  createData(1500, 900, 1750, 11990, 11991, 10180, 10180),
  createData(1800, 356, 16.0, 49, 1000, 10130, 10130),
];

export const InterlockList = (props) => {
  const data = createData(1500, 900, 1750, 11990, 11991, 10180, 10180);

  return (
    <Card {...props}>
      <CardHeader
        title="공정 테이블 (레시피)"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ dense: true }}>
              <TableCell align="center">모델</TableCell>
              <TableCell align="center">
                직관
                <br />
                1st
              </TableCell>
              <TableCell align="center">
                직관
                <br />
                2nd
              </TableCell>
              <TableCell align="center">
                성형
                <br />
                1st
              </TableCell>
              <TableCell align="center">
                성형
                <br />
                2nd
              </TableCell>
              <TableCell align="center">
                cut
                <br />1
              </TableCell>
              <TableCell align="center">
                cut
                <br />2
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // row.shape_2 ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={row.type}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    bgcolor: row.type === 1500 ? "#00FF00" : null,
                  }}
                  style={{ height: 38 }}
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
                  <TableCell align="center" sx={{}}>
                    {row.shape_2}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.cut_1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.cut_2}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <CardHeader
        title="현재 공정 조건"
        sx={{
          mb: -1,
          height: 60,
        }}
      />

      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ dense: true }}>
              <TableCell align="center">모델</TableCell>
              <TableCell align="center">
                직관
                <br />
                1st
              </TableCell>
              <TableCell align="center">
                직관
                <br />
                2nd
              </TableCell>
              <TableCell align="center">
                성형
                <br />
                1st
              </TableCell>
              <TableCell align="center">
                성형
                <br />
                2nd
              </TableCell>
              <TableCell align="center">
                cut
                <br />1
              </TableCell>
              <TableCell align="center">
                cut
                <br />2
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={data.type}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                bgcolor: "#00FF00",
              }}
              style={{ height: 38 }}
            >
              <TableCell align="center" sx={{}} component="th" scope="row">
                {data.type}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.straight_1}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.straight_2}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.shape_1}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.shape_2}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.cut_1}
              </TableCell>
              <TableCell align="center" sx={{}}>
                {data.cut_2}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
