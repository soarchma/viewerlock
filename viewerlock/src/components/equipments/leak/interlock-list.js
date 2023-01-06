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

function createData(unit, lowerLimit, targetVal, realVal, isInterlock) {
  return { unit, lowerLimit, targetVal, realVal, isInterlock };
}

const rows = [
  createData("1", 159, 6.0, 24, false),
  createData("2", 237, 9.0, 37, false),
  createData("3", 262, 16.0, 24, false),
  createData("4", 305, 3.7, 67, true),
  createData("5", 356, 16.0, 49, false),
];

export const InterlockList = (props) => {
  return (
    <Card {...props}>
      <CardHeader
        title="인터락 설정 항목"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">유닛</TableCell>
              <TableCell align="center">
                하한치
                <br />
                (bar)
              </TableCell>
              <TableCell align="center">
                목표치
                <br />
                (bar)
              </TableCell>
              <TableCell align="center">
                실측치
                <br />
                (bar)
              </TableCell>
              <TableCell align="center">
                인터락
                <br />
                발생
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // row.isInterlock ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={row.unit}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    // bgcolor: row.isInterlock ? "red" : null,
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.unit}
                  </TableCell>
                  <TableCell align="center">{row.lowerLimit}</TableCell>
                  <TableCell align="center">{row.targetVal}</TableCell>
                  <TableCell align="center">{row.realVal}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: row.isInterlock ? "red" : null,
                    }}
                  >
                    {row.isInterlock ? "√" : null}
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
