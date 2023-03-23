import { Box, Button, Card, CardHeader, CardContent, Divider, Tooltip } from "@mui/material";
import { getDateStamp } from "../../../lib/common";
import { useState, useEffect, useRef } from "react";
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

export const InterlockChart = (props) => {
  const [key, setKey] = useState(0);
  const graphSrc =
    "http://localhost:3000/d-solo/udWnXn0Vz/new-dashboard?orgId=1&refresh=10s&panelId=4&theme=light" +
    `&from=${getDateStamp(6)}&to=${Date.now() + 10000 * 360 * 6}`;

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
        title={"인터락 현황"}
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
          <iframe
            className="iframe-no-click"
            src={graphSrc}
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </Box>
      </CardContent>
    </Card>
  );
};
