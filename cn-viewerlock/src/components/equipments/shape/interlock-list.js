// import { formatDistanceToNow, subHours } from "date-fns";
// import { v4 as uuid } from "uuid";
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
import { useEffect, useState } from "react";

function createData(model, beeline1, beeline2, shape1, shape2, cut1, cut2) {
  return { model, beeline1, beeline2, shape1, shape2, cut1, cut2 };
}

const defRows = [
  createData(700, 500, 1000, 5000, 5001, 8000, 8000),
  createData(1000, 500, 1800, 6960, 6961, 2900, 2900),
  createData(1200, 700, 1500, 9300, 9301, 11500, 11500),
  createData(1500, 700, 1800, 12010, 12011, 11530, 11530),
  createData(1800, 700, 1700, 15230, 15231, 11530, 11530),
  createData(2500, 700, 1750, 22120, 22121, 11530, 11530),
  createData(700, 10, 730, 5030, 5031, 90, 90),
  createData(1000, 500, 670, 8110, 8111, 2370, 2370),
  createData(1200, 500, 700, 10080, 10081, 350, 350),
  createData(1500, 500, 650, 13160, 13161, 11160, 11160),
  createData(1800, 500, 670, 16190, 16191, 11120, 11120),
  createData(2100, 500, 670, 19220, 19221, 11150, 11150),
  createData(2500, 700, 1700, 22180, 22181, 11500, 11500),
  createData(3100, 500, 700, 29260, 29261, 11140, 11140),
  createData(2500, 500, 700, 23200, 23201, 11160, 11160),
  createData(2800, 500, 700, 26230, 26231, 11160, 11160),
  createData(2800, 700, 1700, 25230, 25231, 11530, 11530),
  createData(3100, 500, 700, 29280, 29281, 11130, 11130),
];

export const InterlockList = (props) => {
  const { event, simulation } = props;
  const [rows, setRows] = useState(defRows);
  const [realData, setRealData] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  const [interlock, setInterlock] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  const [curRecipe, setCurRecipe] = useState(createData(0, 0, 0, 0, 0, 0, 0));

  let database = "cn_viewerlock";
  if (simulation) {
    database = "viewerlock";
  }

  useEffect(() => {
    const getShapeRef = async () => {
      // console.log("???database", database);
      const response = await axios
        .post(`./api/get-data?d=${database}&t=ref`)
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
      if (response && response.data && response.data.shapeRef) {
        // console.log(response.data);
        setRows(response.data.shapeRef);
        // const temp = rows.slice(0);
        // if (response.data.prod.shape) temp[0].prodCnt = response.data.prod.shape;
        // if (response.data.prod.leak) temp[1].prodCnt = response.data.prod.leak;
        // if (response.data.prod.assem) temp[2].prodCnt = response.data.prod.assem;

        // if (response.data.prod.shapeCap)
        //   temp[0].capacity = Number(response.data.prod.shapeCap).toFixed(1);
        // else temp[0].capacity = 0;
        // if (response.data.prod.leak)
        //   temp[1].capacity = ((response.data.prod.leak / 1300) * 100).toFixed(1);
        // else temp[1].capacity = 0;
        // if (response.data.prod.assem)
        //   temp[2].capacity = ((response.data.prod.assem / 900) * 100).toFixed(1);
        // else temp[2].capacity = 0;
        // setRows(temp);
      } else {
        console.log("!!!!!!!!!!!!!!!!!!!!!", response);
      }
    };
    getShapeRef();

    event.on("shape", (msg) => {
      const obj = JSON.parse(msg);
      // console.log(obj);
      const { data } = obj;
      const tempData = createData(
        data.model,
        data.beeline1,
        data.beeline2,
        data.shape1,
        data.shape2,
        data.cut1,
        data.cut2
      );
      setRealData(tempData);

      // TODO: DELETE!!!!!!!!!!!!!!
      rows.forEach((row, index) => {
        // console.log(row, index);
        if (row.model === tempData.model) {
          setCurRecipe(row);
        }
      });
      // TODO: DELETE!!!!!!!!!!!!!!
    });

    return () => {
      event.removeAllListeners();
      // console.log("111111 ==> Clean Up~!");
    };
  }, []);

  const checkInterlock = () => {
    const tempInterlock = {
      model: true,
      beeline1: true,
      beeline2: true,
      shape1: true,
      shape2: true,
      cut1: true,
      cut2: true,
    };

    for (let i = 0; i < rows.length; i++) {
      let match = true;
      if (rows[i].model === realData.model) {
        tempInterlock.model = false;
        Object.keys(rows[i]).forEach((key) => {
          if (rows[i][key] != "model") {
            // console.log(key);
            if (rows[i][key] === realData[key]) tempInterlock[key] = false;
            else {
              match = false;
              tempInterlock[key] = true;
            }
          }
        });
        if (match) break;
      }
    }

    // console.log(tempInterlock);
    setInterlock(tempInterlock);
  };

  useEffect(() => {
    checkInterlock();
  }, [realData]);

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
      <TableContainer component={Paper} sx={{ maxHeight: 260 }}>
        <Table stickyHeader sx={{ minWidth: 300 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ dense: true }}>
              <TableCell align="center">모델</TableCell>
              <TableCell align="center">직관 1</TableCell>
              <TableCell align="center">직관 2</TableCell>
              <TableCell align="center">성형 1</TableCell>
              <TableCell align="center">성형 2</TableCell>
              <TableCell align="center">cut 1</TableCell>
              <TableCell align="center">cut 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // row.shape2 ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={`${row.model}+${row.shape1}`}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    bgcolor: row.model === realData.model ? "#00FF00" : null,
                  }}
                  style={{ height: 39 }}
                >
                  <TableCell align="center" sx={{}} component="th" scope="row">
                    {row.model}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.beeline1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.beeline2}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.shape1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.shape2}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.cut1}
                  </TableCell>
                  <TableCell align="center" sx={{}}>
                    {row.cut2}
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
              <TableCell align="center">직관 1</TableCell>
              <TableCell align="center">직관 2</TableCell>
              <TableCell align="center">성형 1</TableCell>
              <TableCell align="center">성형 2</TableCell>
              <TableCell align="center">cut 1</TableCell>
              <TableCell align="center">cut 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={realData.model}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                bgcolor: "#00FF00",
              }}
              style={{ height: 39 }}
            >
              <TableCell align="center" sx={{}} component="th" scope="row">
                {realData.model}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.beeline1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.beeline1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.beeline2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.beeline2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.shape1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.shape2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.cut1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.cut1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: !interlock.cut2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.cut2}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
