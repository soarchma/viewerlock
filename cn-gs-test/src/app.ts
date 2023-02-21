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
// 통계
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
// 날자가 바뀌면 프로그램을 종료한다. Docker에 의해 재 시작 된다.
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

// 근무 시간을 판단한다. 근무시간에만 데이터를 생성한다.
function workTimeCheck() {
  const date = getkrDate();
  const dayOfWeek = new Date(getDate()).getDay(); // 일요일(0) ~ 토요일(6)
  // console.log("dayOfWeek", dayOfWeek);
  // console.log("date.getHours()", date.getHours());
  if (dayOfWeek != 0 && dayOfWeek != 6) {
    // 근무일
    // console.log("근무일!!!");
    const curTime = date.getHours();
    // 근무시간 체크
    if (curTime < 9 || curTime >= 23) {
      // 업무 종료
      // console.log("업무종료!!!");
      demoEnd();
    } else {
      // console.log("근무시간!!!");
      demoStart();
    }
  } else {
    // 휴무일
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
