import fs from "fs";
import net from "net";
import express from "express";
import * as mqtt from "mqtt";
import { leakFunc } from "./lib/leak";
// import ip from "ip";

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
        Object.assign(leakData, leakFunc(leakData));
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
