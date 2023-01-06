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
  createData("자동 성형기", 159, 6.0),
  createData("리크 측정기", "-", 9.0),
  createData("자동 조립기", 262, 16.0),
];

export const ProductionList = (props) => {
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
                  <TableCell align="center">{row.lowerLimit}</TableCell>
                  <TableCell align="center">{row.targetVal}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
