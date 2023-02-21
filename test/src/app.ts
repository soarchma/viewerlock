import type { KeyAnyPair } from "./lib/interface";
import { createWsServer } from "./lib/websocket/ws-server";
import { createMqttClient } from "./lib/mqtt/mqtt-client";
import {
  connectDatabase,
  endConnection,
  getConnection,
} from "./lib/db/db-client";
import { createStat } from "./lib/statistics/statistics";
import { shapeStart, shapeStop } from "./lib/shape";
import { leakStart, leakStop } from "./lib/leak";
import { assemStart, assemStop } from "./lib/assem";
// import * as db from "./lib/db/db_action";
import * as sql from "./lib/db/sql_action";
import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

let topics: KeyAnyPair = {};
const test = false;
if (test) {
  topics = {
    shape: "ktcc/test/shape",
    leak: "ktcc/test/leak",
    assem: "ktcc/test/assem",
  };
} else {
  topics = {
    shape: "viewerlock/sj/shape",
    leak: "viewerlock/sj/leak",
    assem: "viewerlock/sj/assem",
  };
}
////////////////////////////////////////////////////

let con: any = null;
const dbConnectedHandler = (connection: any) => {
  con = connection;
};

// const dbReqHandler = (reqType: string) => {
//   console.log("dbReqHandler:", reqType);
//   if (reqType === "getShapeRef") {
//     sql.getShapeRef(con).then((result) => {
//       if (result) {
//         if (!result.err) {
//           myEmitter.emit("dbRes", "getShapeRef", result.rows);
//         } else {
//           console.log(result.err);
//         }
//       }
//     });
//   }
// };

myEmitter.on("dbConnected", dbConnectedHandler);
// myEmitter.on("dbReq", dbReqHandler);

connectDatabase(myEmitter);

////////////////////////////////////////////////////
const mqttClient = createMqttClient("mqtt://localhost", topics, myEmitter);

////////////////////////////////////////////////////
const wss = createWsServer(mqttClient, myEmitter, topics);

////////////////////////////////////////////////////
// 통계
createStat(topics, mqttClient, myEmitter);

////////////////////////////////////////////////////
const speedUp = 1;
shapeStart(mqttClient, myEmitter, topics.shape, 1000, speedUp);
leakStart(mqttClient, myEmitter, topics.leak, 1000, speedUp);
assemStart(mqttClient, myEmitter, topics.assem, 1000, speedUp);

// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
const endApp = () => {
  shapeStop();
  leakStop();
  assemStop();
  for (const client of wss.clients) {
    client.close();
  }
  wss.close();
  mqttClient.end();
  endConnection();
};

function dayChangeWatchDog() {
  const intervalId = setInterval(() => {
    endApp();
    clearInterval(intervalId);
  }, 10000);
}
// dayChangeWatchDog();
// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
