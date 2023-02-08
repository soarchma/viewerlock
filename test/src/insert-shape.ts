// import fs from "fs";
// import net from "net";
// import express from "express";
import * as mqtt from "mqtt";
// import ip from "ip";

const mqttClient = mqtt.connect("mqtt://localhost");
const topics = {
  shape: "ktcc/insert/shape",
  leak: "ktcc/insert/leakaaa",
  assemble: "ktcc/insert/assemble",
};

// const app = express();
interface KeyValuePair {
  [key: string]: number;
}

const shapeData: KeyValuePair = {
  beeline1: 0,
  beeline2: 0,
  shape1: 0,
  shape2: 0,
  cut1: 0,
  cut2: 0,
  production: 0,
  setting_model: 0,
};

function getModel(model: number) {
  if (model === 1000) {
    return {
      beeline1: 0,
      beeline2: 0,
      shape1: 0,
      shape2: 0,
      cut1: 0,
      cut2: 0,
      setting_model: 1000,
    };
  } else if (model === 1200) {
    return {
      beeline1: 900,
      beeline2: 1800,
      shape1: 9510,
      shape2: 9511,
      cut1: 10130,
      cut2: 10130,
      setting_model: 1200,
    };
  } else if (model === 1500) {
    return {
      beeline1: 900,
      beeline2: 1750,
      shape1: 11990,
      shape2: 11991,
      cut1: 10180,
      cut2: 10180,
      setting_model: 1500,
    };
  } else if (model === 1800) {
    return {
      beeline1: 0,
      beeline2: 0,
      shape1: 0,
      shape2: 0,
      cut1: 0,
      cut2: 0,
      setting_model: 1800,
    };
  } else {
    return null;
  }
}

let countTotal = 1000;
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

mqttClient.on("connect", () => {
  console.time("test/ktcc/shape");
  Object.assign(shapeData, getModel(1000));
  mqttClient.subscribe(topics.shape, (err) => {
    if (!err) {
      intervalId = setInterval(() => {
        // 데이터 변경 조건 판단
        Object.keys(shapeData).forEach((key: string, index: number) => {
          // 데이터 변경
        });
        console.log(oldState, JSON.stringify(shapeData));
        mqttClient.publish(topics.shape, JSON.stringify(shapeData));
      }, 50);
    }
  });
});

mqttClient.on("message", (topic, msg) => {
  // msg is Buffer
  // console.log(msg.toString());

  countTotal -= 1;
  if (0 === countTotal) {
    console.timeEnd("test/ktcc/shape");
    clearInterval(intervalId);
    // mqtt 종료
    mqttClient.end();
  }
});
