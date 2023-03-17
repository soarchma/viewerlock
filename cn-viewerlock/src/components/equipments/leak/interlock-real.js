import { useEffect, useState } from "react";
import { Box, Button, Card, CardHeader, CardContent, Divider, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

// 브라우져는
const urlReal =
  "http://localhost:3000/d-solo/hXeL8624z/test?orgId=1&from=now-1m&to=now&refresh=5s&panelId=2&theme=light";
const urlTest =
  "http://localhost:3000/d-solo/3Qi9Uxh4k/viewerlock?orgId=1&refresh=5s&from=now-1m&to=now&panelId=6&theme=light";

export const InterlockReal = (props) => {
  const { event, simulation } = props;
  const [key, setKey] = useState(0);
  const [url, setUrl] = useState(urlReal);

  useEffect(() => {
    if (simulation) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAA");
      setUrl(urlTest);
    } else {
      console.log("BBBBBBBBBBBBBBBBBBB");
      setUrl(urlReal);
    }

    // event.on("leak", (msg) => {
    //   const obj = JSON.parse(msg);
    //   console.log(obj);
    // });
    return () => {
      // event.removeAllListeners();
    };
  }, []);

  return (
    <Card {...props}>
      <CardHeader
        action={
          <ThemeProvider theme={theme}>
            <Tooltip title="새로고침">
              <Button
                variant="contained"
                color="neutral"
                sx={{
                  mt: -4,
                }}
                endIcon={<RefreshIcon fontSize="small" sx={{ mr: 1 }} />}
                size="small"
                onClick={() => setKey(key + 1)}
              ></Button>
            </Tooltip>
          </ThemeProvider>
        }
        title="실시간 데이터"
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Box
          key={key}
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 350,
            position: "relative",
          }}
        >
          <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
          {/* <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // width={440}
              // height={320}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Line type="number" dataKey="유닛-1" strokeWidth={2} stroke="#8884d8" />
              <Line type="number" dataKey="유닛-2" strokeWidth={2} stroke="#82ca9d" />
              <Line type="number" dataKey="유닛-3" strokeWidth={2} stroke="#f20f0d" />
              <Line type="number" dataKey="유닛-4" strokeWidth={2} stroke="#020fFd" />
              <Line type="number" dataKey="유닛-5" strokeWidth={2} stroke="#02Ff0d" />
            </LineChart>
          </ResponsiveContainer> */}
        </Box>
      </CardContent>
    </Card>
  );
};
