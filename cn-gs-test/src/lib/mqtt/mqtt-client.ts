import * as mqtt from "mqtt";

export const createMqttClient = (
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

  if (topics) {
    Object.keys(topics).forEach((key: string) => {
      mqttClient.subscribe(topics[key], (err: any) => {
        if (err) console.log(err);
      });
    });
  }

  return mqttClient;
};
