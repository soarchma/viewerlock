import { Box, Button, Card, CardHeader, Tooltip } from "@mui/material";
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

export const SysGraph = (props) => {
  const { src, height } = props;
  const [key, setKey] = useState(0);

  // console.log(src);

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
                  mt: -6.5,
                  mr: -2,
                }}
                endIcon={<RefreshIcon fontSize="small" sx={{ mr: 1 }} />}
                size="small"
                onClick={() => setKey(key + 1)}
              ></Button>
            </Tooltip>
          </ThemeProvider>
        }
        // title={`실시간 영상`}
        sx={{
          mb: -13,
        }}
      />
      <Box
        key={key}
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          pb: 1,
        }}
      >
        <iframe src={src} width="100%" height={height} frameBorder="0"></iframe>
      </Box>
    </Card>
  );
};
