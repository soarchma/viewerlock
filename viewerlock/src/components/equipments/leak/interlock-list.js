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
import { useEffect, useState } from "react";

function createData(unit, lowerLimit, targetVal, realVal, isActive) {
  let isInterlock = false;
  if (isActive && lowerLimit > realVal) isInterlock = true;
  return { unit, lowerLimit, targetVal, realVal, isInterlock };
}

const rows = [
  createData("1", 550, 600, 0, false),
  createData("2", 550, 600, 0, false),
  createData("3", 550, 600, 0, false),
  createData("4", 550, 600, 0, false),
  createData("5", 550, 600, 0, false),
  createData("6", 550, 600, 0, false),
];

export const InterlockList = (props) => {
  // const { leakData } = props;
  // console.log("InterlockList:", leakData);

  const { event } = props;
  const [leakData, setLeakData] = useState(undefined);
  useEffect(() => {
    event.on("leakEvent", (msg) => {
      const obj = JSON.parse(msg);
      if (obj.active) {
        console.log(obj);
      }
      setLeakData(obj);
    });

    return () => {
      event.removeAllListeners();
      console.log("111111 ==> Clean Up~!");
    };
  }, []);

  useEffect(() => {
    if (leakData) {
      // console.log(leakData);
      rows.map((row, index) => {
        if (leakData.data[`leak${index + 1}`] != null) {
          row.realVal = leakData.data[`leak${index + 1}`];
          if (leakData.active) {
            row.isInterlock = false;
            if (row.lowerLimit > row.realVal) row.isInterlock = true;
          }
        }
      });
    }

    return () => {
      // console.log("22222222222 ==> Clean Up~!");
    };
  }, [leakData]);

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
