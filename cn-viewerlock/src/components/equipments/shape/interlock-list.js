// import { formatDistanceToNow, subHours } from "date-fns";
// import { v4 as uuid } from "uuid";
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

const rows = [
  createData(700, 900, 1800, 3600, 3601, 10200, 10200),
  createData(1000, 900, 1800, 6890, 6881, 1470, 1470),
  createData(1200, 900, 1950, 8700, 8701, 10040, 10040),
  createData(1500, 900, 1920, 11690, 11691, 10050, 10050),
  createData(1800, 900, 1950, 14650, 14651, 10090, 10090),
];

export const InterlockList = (props) => {
  const { event } = props;
  const [realData, setRealData] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  const [curRecipe, setCurRecipe] = useState(createData(0, 0, 0, 0, 0, 0, 0));
  useEffect(() => {
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

      rows.forEach((row, index) => {
        // console.log(row, index);
        if (row.model === tempData.model) {
          setCurRecipe(row);
        }
      });
    });

    return () => {
      event.removeAllListeners();
      // console.log("111111 ==> Clean Up~!");
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
              // row.shape2 ? (color = "red") : (color = null);
              return (
                <TableRow
                  key={row.model}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    bgcolor: row.model === realData.model ? "#00FF00" : null,
                  }}
                  style={{ height: 42 }}
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
              key={realData.model}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                bgcolor: "#00FF00",
              }}
              style={{ height: 42 }}
            >
              <TableCell align="center" sx={{}} component="th" scope="row">
                {realData.model}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.beeline1 === realData.beeline1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.beeline1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.beeline2 === realData.beeline2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.beeline2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.shape1 === realData.shape1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.shape2 === realData.shape2 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.shape2}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.cut1 === realData.cut1 ? "#00FF00" : "#FF0000",
                }}
              >
                {realData.cut1}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: curRecipe.cut2 === realData.cut2 ? "#00FF00" : "#FF0000",
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
