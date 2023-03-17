import type { KeyAnyPair } from "./lib/interface";
import { createWsServer } from "./lib/websocket/ws-server";
import {
  createMqttPubClient,
  createMqttSubClient,
} from "./lib/mqtt/mqtt-client";
import {
  connectDatabase,
  endConnection,
  getConnection,
} from "./lib/db/db-client";
import { createStat } from "./lib/statistics/statistics";
import { shapeStart } from "./lib/shape";
import { leakStart } from "./lib/leak";
import { assemStart } from "./lib/assem";
// import * as db from "./lib/db/db_action";
import * as sql from "./lib/db/sql_action";
import { EventEmitter } from "events";
import { getDate, getkrDate } from "./lib/common";

const myEmitter = new EventEmitter();

// let topics: KeyAnyPair = {};
const topics_pub: KeyAnyPair = {
  shape: "cn/viewerlock/sj/shape",
  leak: "cn/viewerlock/sj/leak",
  assem: "cn/viewerlock/sj/assem",
};
const topics_sub: KeyAnyPair = {
  shape: "ijoon/sj/fac-cam-sj002/SJ-OCT-02/data",
  leak: "ijoon/sj/fac-cam-sj001/SJ-OCT-01/data",
  assem: "ijoon/sj/fac-cam-sj003/SJ-OCT-03/data",
};
////////////////////////////////////////////////////

let con: any = null;
const dbConnectedHandler = (connection: any) => {
  con = connection;
};
myEmitter.on("dbConnected", dbConnectedHandler);
connectDatabase(myEmitter);

////////////////////////////////////////////////////
const mqttClientSub = createMqttSubClient(
  "123.142.5.131",
  21984,
  "mqtts",
  "ijoon",
  "9DGQhyCH6RZ4",
  "./rootca.crt",
  topics_sub,
  topics_pub,
  myEmitter
);
let hostAddr = "mqtt://host.docker.internal";
if (process.env.NODE_ENV === "development") hostAddr = "mqtt://localhost";
const mqttClientPub = createMqttPubClient(hostAddr, topics_pub, myEmitter);

////////////////////////////////////////////////////
// TODO: FIXME: TODO: FIXME: TODO: FIXME: TODO: FIXME:
const wss = createWsServer(mqttClientPub, myEmitter, topics_pub);
// TODO: FIXME: TODO: FIXME: TODO: FIXME: TODO: FIXME:

////////////////////////////////////////////////////
// 통계
createStat(topics_pub, mqttClientPub, myEmitter);

////////////////////////////////////////////////////
// const speedUp = 1;
// function demoStart() {
//   shapeStart(mqttClientPub, myEmitter, topics.shape, 1000, speedUp);
//   leakStart(mqttClientPub, myEmitter, topics.leak, 1000, speedUp);
//   assemStart(mqttClientPub, myEmitter, topics.assem, 1000, speedUp);
// }
// function demoEnd() {
//   shapeStop();
//   leakStop();
//   assemStop();
// }

// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
const endApp = () => {
  // demoEnd();
  // for (const client of wss.clients) {
  //   client.close();
  // }
  // clearInterval(workWdIntervalId);
  clearInterval(dayWdIntervalId);
  // wss.close();
  mqttClientSub.end();
  mqttClientPub.end();
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

// // 근무 시간을 판단한다. 근무시간에만 데이터를 생성한다.
// function workTimeCheck() {
//   const date = getkrDate();
//   const dayOfWeek = new Date(getDate()).getDay(); // 일요일(0) ~ 토요일(6)
//   // console.log("dayOfWeek", dayOfWeek);
//   // console.log("date.getHours()", date.getHours());
//   if (dayOfWeek != 0 && dayOfWeek != 6) {
//     // 근무일
//     // console.log("근무일!!!");
//     const curTime = date.getHours();
//     // 근무시간 체크
//     if (curTime < 9 || curTime >= 23) {
//       // 업무 종료
//       // console.log("업무종료!!!");
//       demoEnd();
//     } else {
//       // console.log("근무시간!!!");
//       demoStart();
//     }
//   } else {
//     // 휴무일
//     demoEnd();
//   }
// }

// let workWdIntervalId: any = null;
// function workTimeWatchDog() {
//   workTimeCheck();
//   workWdIntervalId = setInterval(() => {
//     workTimeCheck();
//   }, 10000);
// }
// workTimeWatchDog();
// TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:TODO:
