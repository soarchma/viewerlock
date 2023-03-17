// import { formatDistanceToNow, subHours } from "date-fns";
// import { v4 as uuid } from "uuid";
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItem,
} from "@mui/material";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useEffect, useState } from "react";
// import { create } from "domain";
import { CustomCell } from "../../common/custom-cell";

// function createData1(type, exp1, redu, oring1) {
//   return { type, exp1, redu, oring1 };
// }
// function createData2(type, exp2, nipple, oring2) {
//   return { type, exp2, nipple, oring2 };
// }

// const rows_1 = [
//   createData1("Day", 0, 0, 0),
//   createData1("Week", 0, 0, 0),
//   createData1("Month", 0, 0, 0),
// ];
// const rows_2 = [
//   createData2("Day", 0, 0, 0),
//   createData2("Week", 0, 0, 0),
//   createData2("Month", 0, 0, 0),
// ];

export const InterlockList = (props) => {
  // const data = createData(1500, 900, 1750, 11990, 11991, 10180, 10180);
  const { event } = props;
  // const [ng1, setNg1] = useState(rows_1);
  // const [ng2, setNg2] = useState(rows_2);
  // const [rawData, setRawData] = useState(null);

  // useEffect(() => {
  //   event.on("assem", (msg) => {
  //     const obj = JSON.parse(msg);
  //     // console.log(obj);
  //     // setRawData(obj);
  //     const { data } = obj;
  //     let temp = JSON.parse(JSON.stringify(ng1));
  //     temp[0] = createData1("Day", data.exp1, data.redu, data.oring1);
  //     // setNg1(temp);
  //     temp = JSON.parse(JSON.stringify(ng2));
  //     temp[0] = createData2("Day", data.exp2, data.nipple, data.oring2);
  //     // setNg2(temp);
  //   });

  //   return () => {
  //     event.removeAllListeners();
  //     console.log("111111 ==> Clean Up~!");
  //   };
  // }, []);

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
            <TableRow style={{ height: 50 }} sx={{ bgcolor: "#dbdbdb" }}>
              <TableCell align="center" colSpan={4}>
                Unit-1
              </TableCell>
            </TableRow>
            <TableRow style={{ height: 50 }}>
              {/* <TableCell align="center">주기</TableCell> */}
              <TableCell align="center">확관 불량</TableCell>
              <TableCell align="center">레듀샤 체결불량</TableCell>
              <TableCell align="center">O-링 삽입불량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={"Day"}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              style={{ height: 90 }}
            >
              {/* <TableCell align="center" sx={{}} component="th" scope="row">
                {"Day"}
              </TableCell> */}
              <CustomCell event={event} name={"exp1"} />
              <CustomCell event={event} name={"redu"} />
              <CustomCell event={event} name={"oring1"} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow style={{ height: 50 }} sx={{ bgcolor: "#dbdbdb" }}>
              <TableCell align="center" colSpan={4}>
                Unit-2
              </TableCell>
            </TableRow>
            <TableRow style={{ height: 50 }}>
              {/* <TableCell align="center">주기</TableCell> */}
              <TableCell align="center">확관 불량</TableCell>
              <TableCell align="center">니쁠 체결불량</TableCell>
              <TableCell align="center">O-링 삽입불량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={"Day"}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
              style={{ height: 90 }}
            >
              {/* <TableCell align="center" sx={{}} component="th" scope="row">
                {"Day"}
              </TableCell> */}
              <CustomCell event={event} name={"exp2"} />
              <CustomCell event={event} name={"nipple"} />
              <CustomCell event={event} name={"oring2"} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
