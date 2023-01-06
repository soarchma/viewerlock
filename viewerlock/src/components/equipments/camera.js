import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RefreshIcon from "@mui/icons-material/Refresh";
// import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const base = 0;
export const Camera = (props) => {
  const { type } = props;
  // console.log(type);
  const url = `http://192.168.4.233:8888/${type}/index.m3u8`;
  // if (type === "shape") {
  //   url = "static/shape.png";
  // } else if (type === "leak") {
  //   url = "static/leak.png";
  // } else if (type === "assemble") {
  //   url = "static/assemble.png";
  // }
  const [key, setKey] = useState(0);
  const [state, setState] = useState("");
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    console.log("state:", state);
    if (state === "onError" || state === "reload") {
      if (timerId) {
        console.log("CLEAR!!!!!11111111111", timerId);
        clearTimeout(timerId);
        setTimerId(null);
      }
      const temp = setTimeout(() => {
        setKey(Math.random());
        console.log("TIMER!!!!!!!!!!");
        setTimerId(null);
      }, 3000);
      setTimerId(temp);
    } else {
      if (timerId) {
        console.log("CLEAR!!!!!222222222222222", timerId);
        clearTimeout(timerId);
        setTimerId(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // console.log(key);

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button
            sx={{
              mt: -2,
            }}
            endIcon={<RefreshIcon fontSize="small" />}
            size="small"
            onClick={() => setKey(key + 1)}
          >
            새로고침
          </Button>
        }
        title={`실시간 영상`}
        sx={{
          mb: -1,
          height: 60,
        }}
      />
      <Divider />
      <Box
        key={key}
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <img src={url} height="310"></img> */}
        <ReactPlayer
          url={url}
          autoPlay
          muted={true}
          playing={true}
          controls={true}
          loop={true}
          // progressInterval={10}
          height={310}
          config={{
            file: {
              // maxBufferLength: 30,
              // backBufferLength: 30,
              // maxMaxBufferLength: 60,
              // hlsOptions: { startPosition: 9 },
              // forceHLS: true,
            },
          }}
          onPlay={() => setState("onPlay")}
          onPause={() => setState("onPause")}
          onBuffer={() => setState("onBuffer")}
          onBufferEnd={() => setState("onBufferEnd")}
          onDuration={() => setState("onDuration")}
          onEnded={() => setState("onEnded")}
          onProgress={(state) => {
            if (state.playedSeconds > 60 * 5) {
              setState("reload");
            } else {
              setState("onProgress");
            }
          }}
          onError={(err, err2, err3, err4) => {
            // console.log("onError???", err);
            if (err === "state") {
              console.log("err2", err2);
              console.log("err3", err3);
              console.log("err4", err4);
            }
            setState("onError");
          }}
        />
      </Box>
    </Card>
  );
};
