import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";

export const CustomCell = (props) => {
  const { event, name } = props;
  const [val, setVal] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    event.on("assemEvent", (msg) => {
      const rawData = JSON.parse(msg);
      if (rawData.data[name]) {
        setVal(rawData.data[name]);
        if (rawData.update.find((v) => v === name)) {
          setUpdate(true);
        } else {
          setUpdate(false);
        }
      }
      // console.log(obj);
      // setRawData(obj);
      // const { data } = obj;
      // let temp = JSON.parse(JSON.stringify(ng1));
      // temp[0] = createData1("Day", data.ng1_1, data.ng1_2a, data.ng1_2b);
      // setNg1(temp);
      // temp = JSON.parse(JSON.stringify(ng2));
      // temp[0] = createData2("Day", data.ng2_1, data.ng2_2a, data.ng2_2b);
      // setNg2(temp);
    });

    return () => {
      event.removeAllListeners();
      console.log("111111 ==> Clean Up~!");
    };
  }, []);

  return (
    <TableCell align="center" sx={{ bgcolor: update ? "#FF0000" : null }}>
      {val}
    </TableCell>
  );
};
