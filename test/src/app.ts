// import fs from "fs";
// import net from "net";
// import express from "express";
import * as mqtt from "mqtt";
import WebSocket, { WebSocketServer } from "ws";
import { leakFunc } from "./lib/leak";
// import ip from "ip";

const wss = new WebSocketServer({
  port: 8070,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
});

wss.on("connection", (ws) => {
  console.log("connection");
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });
  ws.on("close", (code, reason) => {
    console.log("close", code, reason);
  });

  setInterval(() => {
    ws.send(Math.random());
  }, 1000);
});

// const app = express();
interface KeyValuePair {
  [key: string]: number;
}

const leakData: KeyValuePair = {
  leak1: 0,
  leak2: 0,
  leak3: 0,
  leak4: 0,
  leak5: 0,
  leak6: 0,
};

let countTotal = 100000;
let state = "zero";
let oldState = "zero";
let countZero = 100;
let countMax = 50;
let countIncDec = 3;
let maxVal = 0;
let minVal = 0;
let errVal = 0;
const errKey: any = [];
let termCount = 0;
let endOfTerm = false;
let intervalId: any = undefined;

const mqttClient = mqtt.connect("mqtt://localhost");
const topics = {
  shape: "ktcc/test/shape",
  leak: "ktcc/test/leak",
  assemble: "ktcc/test/assemble",
};

mqttClient.on("connect", () => {
  mqttClient.subscribe(topics.leak, (err) => {
    if (!err) {
      intervalId = setInterval(() => {
        // Object.assign(leakData, leakFunc(leakData));
        mqttClient.publish(topics.leak, JSON.stringify(leakData));
      }, 50);
    }
  });
});

mqttClient.on("message", (topic, msg) => {
  // msg is Buffer
  // console.log(msg.toString());

  countTotal -= 1;
  if (0 === countTotal) {
    clearInterval(intervalId);
    // mqtt 종료
    mqttClient.end();
  }
});
