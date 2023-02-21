// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
import * as mqtt from "mqtt";
import WebSocket, { WebSocketServer } from "ws";
import { shapeFunc } from "./lib/shape";
import { leakFunc } from "./lib/leak";
import { assemFunc } from "./lib/assem";
import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

interface KeyValuePair {
  [key: string]: number;
}

const shapeData: any = {
  type: "shape",
  active: false,
  update: [],
  test: true,
  data: {
    model: 1200, // 설정 모델
    cnt: 0, // 생산수량
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1800, // 직관 2ST 설정치
    shape1: 9510, // 성형 1ST 설정치
    shape2: 9511, // 성형 2ST 설정치
    cut1: 10130, // CUT 1 설정치
    cut2: 10130, // CUT 2 설정치
  },
};

const leakData: any = {
  type: "leak",
  active: false,
  update: [],
  test: true,
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
    model: 4, // 생산모델
    cnt: 0, // 금일 생산수량
    exp1: 0, // NG 1-1 수량 (확관)
    redu: 0, // NG 1-2 수량 (레듀샤)
    oring1: 0, // NG 1-2 수량 (O-링)
    exp2: 0, // NG 2-1 수량 (확관)
    nipple: 0, // NG 2-1 수량 (니쁠)
    oring2: 0, // NG 2-1 수량 (O-링)
  },
};

let intervalId: any = undefined;

const mqttClient = mqtt.connect("mqtt://localhost");
const topics = {
  shape: "ktcc/insert/shape",
  leak: "ktcc/insert/leak",
  assem: "ktcc/insert/assem",
};

mqttClient.on("connect", () => {
  console.log("Test start!");
  console.time("TEST");
  let count = 0;
  intervalId = setInterval(() => {
    ++count;
    if (count >= 90002) {
      myEmitter.emit("testEnd");
    }
    // console.log("count", count);
    Object.assign(leakData, leakFunc(leakData));
    mqttClient.publish(topics.leak, JSON.stringify(leakData));

    Object.assign(shapeData, shapeFunc(shapeData));
    mqttClient.publish(topics.shape, JSON.stringify(shapeData));

    Object.assign(assemData, assemFunc(assemData));
    mqttClient.publish(topics.assem, JSON.stringify(assemData));
  }, 1);

  myEmitter.on("testEnd", () => {
    console.log("Test End!");
    console.timeEnd("TEST");
    clearInterval(intervalId);
    mqttClient.end();
  });
});

mqttClient.on("close", () => {
  clearInterval(intervalId);
});
