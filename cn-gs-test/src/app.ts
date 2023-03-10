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
import { getDate, getkrDate } from "./lib/common";

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
// const mqttClient = createMqttClient("mqtt://localhost", topics, myEmitter);
const mqttClient = createMqttClient(
  "mqtt://host.docker.internal",
  topics,
  myEmitter
);

////////////////////////////////////////////////////
const wss = createWsServer(mqttClient, myEmitter, topics);

////////////////////////////////////////////////////
// ??????
createStat(topics, mqttClient, myEmitter);

////////////////////////////////////////////////////
const speedUp = 1;
function demoStart() {
  shapeStart(mqttClient, myEmitter, topics.shape, 1000, speedUp);
  leakStart(mqttClient, myEmitter, topics.leak, 1000, speedUp);
  assemStart(mqttClient, myEmitter, topics.assem, 1000, speedUp);
}
function demoEnd() {
  shapeStop();
  leakStop();
  assemStop();
}

// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
const endApp = () => {
  demoEnd();
  for (const client of wss.clients) {
    client.close();
  }
  clearInterval(workWdIntervalId);
  clearInterval(dayWdIntervalId);
  wss.close();
  mqttClient.end();
  endConnection();
};

let dayWdIntervalId: any = null;
// ????????? ????????? ??????????????? ????????????. Docker??? ?????? ??? ?????? ??????.
let curDate = getDate();
function dayChangeWatchDog() {
  dayWdIntervalId = setInterval(() => {
    if (curDate != getDate()) {
      console.log("Day Changed!!!");
      endApp();
      clearInterval(dayWdIntervalId);
    } else {
      // console.log("Day Continue...");
    }
  }, 10000);
}
dayChangeWatchDog();

// ?????? ????????? ????????????. ?????????????????? ???????????? ????????????.
function workTimeCheck() {
  const date = getkrDate();
  const dayOfWeek = new Date(getDate()).getDay(); // ?????????(0) ~ ?????????(6)
  // console.log("dayOfWeek", dayOfWeek);
  // console.log("date.getHours()", date.getHours());
  if (dayOfWeek != 0 && dayOfWeek != 6) {
    // ?????????
    // console.log("?????????!!!");
    const curTime = date.getHours();
    // ???????????? ??????
    if (curTime < 9 || curTime >= 23) {
      // ?????? ??????
      // console.log("????????????!!!");
      demoEnd();
    } else {
      // console.log("????????????!!!");
      demoStart();
    }
  } else {
    // ?????????
    demoEnd();
  }
}

let workWdIntervalId: any = null;
function workTimeWatchDog() {
  workTimeCheck();
  workWdIntervalId = setInterval(() => {
    workTimeCheck();
  }, 10000);
}
workTimeWatchDog();
// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
