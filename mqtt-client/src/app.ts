import fs from "fs";
import net from "net";
import express from "express";
import * as mqtt from "mqtt";
// import ip from "ip";

const app = express();

// const mqttClient = mqtt.connect("mqtt://localhosta");
const mqttClient2 = mqtt.connect({
  host: "123.142.5.131",
  port: 21984,
  protocol: "mqtts",
  username: "ijoon",
  password: "9DGQhyCH6RZ4",
  ca: [fs.readFileSync("./rootca.crt")],
});

// mqttClient.on("connect", () => {
//   mqttClient.subscribe("test_topic", (err) => {
//     if (!err) {
//       // console.log(err);
//       setInterval(() => {
//         // console.log("AAAA", Math.random());
//         mqttClient.publish("test_topic", Math.random().toString());
//       }, 1000);
//     }
//   });
// });

// mqttClient.on("message", (topic, msg) => {
//   // msg is Buffer
//   console.log(msg.toString());
//   // mqtt 종료
//   // mqttClient.end();
// });

const topicList = [
  "ijoon/sj/fac-cam-sj001/SJ-OCT-01/data",
  "ijoon/sj/fac-cam-sj002/SJ-OCT-02/data",
  "ijoon/sj/fac-cam-sj003/SJ-OCT-03/data",
];
mqttClient2.on("connect", () => {
  console.log("connected!");
  mqttClient2.subscribe(topicList, (err) => {
    if (!err) {
      // setInterval(() => {
      //   // console.log("AAAA", Math.random());
      //   mqttClient2.publish("test_topic", Math.random().toString());
      // }, 1000);
    } else {
      console.log(err);
    }
  });
});

mqttClient2.on("message", (topic, msg) => {
  // msg is Buffer
  console.log(topic, msg.toString());
  // mqtt 종료
  // mqttClient.end();
});

mqttClient2.on("error", (err) => {
  console.log(err);
});

console.log("Hello~, World!!!");
