import * as sql from "../db/sql_action";
import { statShape, setShapeRef, initStatShape } from "./stat-shape";
import { initStatLeak, statLeak } from "./stat-leak";
import { initStatAssem, statAssem } from "./stat-assem";

let MyEmitter: any = null;
let Topics: any = null;
let con: any = null;
const dbConnectedHandler = async (connection: any) => {
  con = connection;
  if (con) {
    // DB에서 최신 정보를 가져온다.
    sql.getShapeRef(con).then((result) => {
      if (result) {
        if (!result.err) {
          // console.log("hahahaha", result.rows);
          if (result.rows.length < 5) {
            console.log("자동성형기 공정 테이블 오류!!!!!", result.rows);
          }
          setShapeRef(result.rows);
        } else {
          console.log(result.err);
        }
      }
    });
    await initStatAssem(con);
    await initStatLeak(con);
    await initStatShape(con);
  }
};

const mqttMsgHandler = (topic: string, message: ArrayBuffer) => {
  // if (topic === Topics.leak) {
  //   statLeak(con, JSON.parse(message.toString()), MyEmitter);
  // } else if (topic === Topics.shape) {
  //   // console.log(message.toString());
  //   statShape(con, JSON.parse(message.toString()), MyEmitter);
  // } else if (topic === Topics.assem) {
  //   statAssem(con, JSON.parse(message.toString()), MyEmitter);
  // }
  // console.log(message);
  if (topic === Topics.leak) {
    statLeak(con, message, MyEmitter);
  } else if (topic === Topics.shape) {
    // console.log(message.toString());
    statShape(con, message, MyEmitter);
  } else if (topic === Topics.assem) {
    statAssem(con, message, MyEmitter);
  }
};

export const createStat = (topics: any, mqttClient: any, myEmitter: any) => {
  Topics = topics;
  MyEmitter = myEmitter;
  // mqttClient.on("message", mqttMsgHandler);
  myEmitter.on("mqttMsg", mqttMsgHandler);
  myEmitter.on("dbConnected", dbConnectedHandler);
  console.log("Statistics start!");
};
