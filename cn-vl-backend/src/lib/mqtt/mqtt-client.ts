import * as mqtt from "mqtt";
import fs from "fs";

export const createMqttPubClient = (
  brokerAddr: string,
  topics: any,
  myEmitter: any
) => {
  const mqttClient = mqtt.connect(brokerAddr);

  mqttClient.on("connect", () => {
    console.log("MQTT start!");
  });

  mqttClient.on("close", () => {
    console.log("MQTT closed!");
  });

  // if (topics) {
  //   Object.keys(topics).forEach((key: string) => {
  //     mqttClient.subscribe(topics[key], (err: any) => {
  //       if (err) console.log(err);
  //     });
  //   });
  // }

  return mqttClient;
};

export const createMqttSubClient = (
  host: string,
  port: number,
  protocol: any,
  username: string,
  password: string,
  ca: string,
  topicSub: any,
  topicPub: any,
  myEmitter: any
) => {
  const mqttClient = mqtt.connect({
    host,
    port,
    protocol,
    username,
    password,
    ca: [fs.readFileSync(ca)],
  });

  mqttClient.on("connect", () => {
    console.log("MQTT start!", topicSub);
  });

  mqttClient.on("close", () => {
    console.log("MQTT closed!");
  });

  mqttClient.on("message", (topic: string, message: ArrayBuffer) => {
    let type = "";
    if (topic === topicSub.leak) {
      type = topicPub.leak;
    } else if (topic === topicSub.shape) {
      type = topicPub.shape;
    } else if (topic === topicSub.assem) {
      type = topicPub.assem;
      // console.log(topic, type, message.toString());
    }
    if (type) myEmitter.emit("mqttSub", type, message);
  });

  if (topicSub) {
    Object.keys(topicSub).forEach((key: string) => {
      mqttClient.subscribe(topicSub[key], (err: any) => {
        if (err) console.log(err);
      });
    });
  }

  return mqttClient;
};
