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

function createData(unit, prodCnt, capacity) {
  return { unit, prodCnt, capacity };
}

const defRows = [
  createData("자동성형기", "-", "-"),
  createData("리크측정기", "-", "-"),
  createData("자동조립기", "-", "-"),
];

export const ProductionList = (props) => {
  const { event, simulation } = props;
  const [rows, setRows] = useState(defRows);

  let database = "cn_viewerlock";
  if (simulation) {
    database = "viewerlock";
  }

  useEffect(() => {
    event.on("newProd", (msg) => {
      // console.log("newProd", msg);
      const getStatData = async () => {
        // console.log("???database", database);
        const response = await axios
          .post(`./api/get-data?d=${database}&t=prod`)
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
        if (response && response.data && response.data.prod) {
          // console.log(response.data);
          const temp = rows.slice(0);
          if (response.data.prod.shape) temp[0].prodCnt = response.data.prod.shape;
          if (response.data.prod.leak) temp[1].prodCnt = response.data.prod.leak;
          if (response.data.prod.assem) temp[2].prodCnt = response.data.prod.assem;

          if (response.data.prod.shapeCap)
            temp[0].capacity = Number(response.data.prod.shapeCap).toFixed(1);
          else temp[0].capacity = 0;
          if (response.data.prod.leakCap)
            temp[1].capacity = Number(response.data.prod.leakCap).toFixed(1);
          else temp[1].capacity = 0;
          if (response.data.prod.assemCap)
            temp[2].capacity = Number(response.data.prod.assemCap).toFixed(1);
          else temp[2].capacity = 0;
          setRows(temp);
        } else {
          console.log("!!!!!!!!!!!!!!!!!!!!!", response);
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
        title="생산 현황"
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
              <TableCell align="center">일생산량 (EA)</TableCell>
              <TableCell align="center">가동률 (%)</TableCell>
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
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.unit}
                  </TableCell>
                  <TableCell align="center">{row.prodCnt}</TableCell>
                  <TableCell align="center">{row.capacity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
