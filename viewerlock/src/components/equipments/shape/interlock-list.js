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

function createData(type, straight_1, straight_2, shape_1, shape_2, cut_1, cut_2) {
  return { type, straight_1, straight_2, shape_1, shape_2, cut_1, cut_2 };
}

const rows = [
  createData(800, 159, 6.0, 24, 1000, 10130, 10130),
  createData(1000, 237, 9.0, 37, 1000, 10130, 10130),
  createData(1200, 900, 1950, 8700, 8701, 10040, 10040),
  createData(1500, 900, 1920, 11690, 11691, 10050, 10050),
  createData(1800, 356, 16.0, 49, 1000, 10130, 10130),
];

export const InterlockList = (props) => {
  // let data = createData(0, 0, 0, 0, 0, 0, 0);
  const { event } = props;
  const [realData, setRealData] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  const [curRecipe, setCurRecipe] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  useEffect(() => {
    event.on("shapeEvent", (msg) => {
      const obj = JSON.parse(msg);
      // console.log(obj);
      const { data } = obj;
      const tempData = createData(
        data.setting_model,
        data.intuition1,
        data.intuition2,
        data.modeling1,
        data.modeling2,
        data.cut1,
        data.cut2
      );
      setRealData(tempData);

      rows.forEach((row, index) => {
        // console.log(row, index);
        if (row.type === tempData.type) {
          setCurRecipe(row);
        }
      });
    });

    return () => {
      event.removeAllListeners();
      console.log("111111 ==> Clean Up~!");
    };
  }, []);

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
                    bgcolor: row.type === realData.type ? "#00FF00" : null,
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
              key={realData.type}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                bgcolor: "#00FF00",
              }}
              style={{ height: 38 }}
            >
              <TableCell align="center" sx={{}} component="th" scope="row">
                {realData.type}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.straight_1 === realData.straight_1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.straight_1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.straight_2 === realData.straight_2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.straight_2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.shape_1 === realData.shape_1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape_1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.shape_2 === realData.shape_2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape_2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.cut_1 === realData.cut_1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.cut_1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.cut_2 === realData.cut_2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.cut_2}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
