// import { formatDistanceToNow, subHours } from "date-fns";
// import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";
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
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

function createData(unit, interlockType, ilCnt) {
  return { unit, interlockType, ilCnt };
}

const defRows = [
  createData("자동성형기", "Process", "-"),
  createData("리크측정기", "SPC", "-"),
  createData("자동조립기", "DCOP", "-"),
];

export const InterlockList = (props) => {
  const { event, simulation } = props;
  const [rows, setRows] = useState(defRows);

  let database = "cn_viewerlock";
  if (simulation) {
    database = "viewerlock";
  }

  useEffect(() => {
    event.on("newIl", (msg) => {
      // console.log("newIl", msg);
      const getStatData = async () => {
        const response = await axios
          .post(`./api/get-data?d=${database}&t=il`)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            if (err.response) {
              return err.response;
            } else if (err.request) {
              console.error("getStatData() - request:", err.request);
              return null;
            } else {
              console.error("getStatData() - message:", err.message);
            }
            console.error("getStatData() - config:", err.config);
            return null;
          });
        if (response && response.data && response.data.il) {
          // console.log(response.data);
          const temp = rows.slice(0);
          if (response.data.il.shape) temp[0].ilCnt = response.data.il.shape;
          else temp[0].ilCnt = 0;
          if (response.data.il.leak) temp[1].ilCnt = response.data.il.leak;
          else temp[1].ilCnt = 0;
          if (response.data.il.assem) temp[2].ilCnt = response.data.il.assem;
          else temp[2].ilCnt = 0;
          setRows(temp);
        }
      };
      getStatData();
    });

    return () => {
      event.removeAllListeners();
      console.log("index.js ==> Clean Up~!");
    };
  }, []);

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">설비</TableCell>
              <TableCell align="center">인터락 유형</TableCell>
              <TableCell align="center">발생 건수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  key={row.unit}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.unit}
                  </TableCell>
                  <TableCell align="center">{row.interlockType}</TableCell>
                  <TableCell align="center">{row.ilCnt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
