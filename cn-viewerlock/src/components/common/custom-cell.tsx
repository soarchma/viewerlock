import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";

export const CustomCell = (props) => {
  const { event, name } = props;
  const [val, setVal] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    event.on("assem", (msg) => {
      const rawData = JSON.parse(msg);
      const { data } = rawData;
      // console.log(data);

      if (data[name]) {
        if (val != data[name]) {
          setVal(data[name]);
        }
      }
    });

    event.on("newIl", (msg) => {
      const rawData = JSON.parse(msg);
      // console.log(name, rawData);
      const { type, unit, data } = rawData;
      // console.log(name, rawData.data[name]);
      if (unit === "assem") {
        // console.log(data.update);
        if (data.data[name]) {
          if (data.update.find((v) => v === name)) {
            setUpdate(true);
          } else {
            setUpdate(false);
          }
        }
      }
    });

    return () => {
      event.removeAllListeners();
      // console.log("111111 ==> Clean Up~!");
    };
  }, []);

  // console.log(
  //   `#FF${cellColor.toString(16).padStart(2, "0")}${cellColor.toString(16).padStart(2, "0")}`
  // );

  return (
    <TableCell align="center" sx={{ bgcolor: update ? "#FF0000" : null }}>
      {val}
    </TableCell>
  );
};
