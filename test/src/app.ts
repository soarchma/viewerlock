// import fs from "fs";
// import net from "net";
// import express from "express";
import * as mqtt from "mqtt";
import WebSocket, { WebSocketServer } from "ws";
import { shapeFunc } from "./lib/shape";
import { leakFunc } from "./lib/leak";
import { assemFunc } from "./lib/assem";

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
    // const msg = { type: "", data: null };
    // msg.type = "shape";
    // msg.data = shapeData;
    ws.send(JSON.stringify(shapeData));

    // msg.type = "leak";
    // msg.data = leakData;
    ws.send(JSON.stringify(leakData));

    // msg.type = "assem";
    // msg.data = assemData;
    ws.send(JSON.stringify(assemData));
  }, 500);
});

interface KeyValuePair {
  [key: string]: number;
}

const shapeData: any = {
  type: "shape",
  active: false,
  update: [],
  test: true,
  data: {
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1950, // 직관 2ST 설정치
    shape1: 8700, // 성형 1ST 설정치
    shape2: 8701, // 성형 2ST 설정치
    cut1: 10040, // CUT 1 설정치
    cut2: 10040, // CUT 2 설정치
    production: 0, // 생산수량
    setting_model: 1200, // 설정 모델
  },
};

const leakData: any = {
  type: "leak",
  active: false,
  update: [],
  test: false,
  data: {
    leak1: 0,
    leak2: 0,
    leak3: 0,
    leak4: 0,
    leak5: 0,
    leak6: 0,
  },
};

const assemData: any = {
  type: "assem",
  active: false,
  update: [],
  test: true,
  data: {
    model_no: 4, // 생산모델
    prod: 0, // 금일 생산수량
    ng1_1: 0, // NG 1-1 수량 (확관)
    ng1_2a: 0, // NG 1-2 수량 (레듀샤)
    ng1_2b: 0, // NG 1-2 수량 (O-링)
    ng2_1: 0, // NG 2-1 수량 (확관)
    ng2_2a: 0, // NG 2-1 수량 (니쁠)
    ng2_2b: 0, // NG 2-1 수량 (O-링)
  },
};

let intervalId: any = undefined;

const mqttClient = mqtt.connect("mqtt://localhost");
const topics = {
  // shape: "ktcc/test/shape",
  // leak: "ktcc/test/leak",
  // assem: "ktcc/test/assem",
  shape: "viewerlock/sj/shape",
  leak: "viewerlock/sj/leak",
  assem: "viewerlock/sj/assem",
};

mqttClient.on("connect", () => {
  console.log("Test start!");
  intervalId = setInterval(() => {
    Object.assign(leakData, leakFunc(leakData));
    mqttClient.publish(topics.leak, JSON.stringify(leakData));

    Object.assign(shapeData, shapeFunc(shapeData));
    mqttClient.publish(topics.shape, JSON.stringify(shapeData));

    Object.assign(assemData, assemFunc(assemData));
    mqttClient.publish(topics.assem, JSON.stringify(assemData));
  }, 100);
});

mqttClient.on("close", () => {
  clearInterval(intervalId);
});
