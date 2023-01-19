// import fs from "fs";
// import net from "net";
// import express from "express";
import * as mqtt from "mqtt";
import { leakFunc } from "./lib/leak";
// import ip from "ip";

const mqttClient = mqtt.connect("mqtt://localhost");
const topics = {
  shape: "ktcc/insert/shape",
  leak: "ktcc/insert/leak",
  assemble: "ktcc/insert/assemble",
};

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
let intervalId: any = undefined;

mqttClient.on("connect", () => {
  console.time(topics.leak);
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
    console.timeEnd(topics.leak);
    clearInterval(intervalId);
    // mqtt 종료
    mqttClient.end();
  }
});
