import * as sql from "../db/sql_action";
import {
  initStatShape,
  statShape,
  chekcDataShape,
  setShapeRef,
} from "./stat-shape";
import { initStatLeak, statLeak, chekcDataLeak } from "./stat-leak";
import { initStatAssem, statAssem, chekcDataAssem } from "./stat-assem";

let MyEmitter: any = null;
let MqttClient: any = null;
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

const chekcDataNull = (raw: any) => {
  let nullData: boolean = false;
  Object.keys(raw).forEach((key: string) => {
    if (raw[key] === "") nullData = true;
  });
  return nullData;
};

const mqttMsgHandler = (topic: string, message: ArrayBuffer) => {
  const obj = JSON.parse(message.toString());

  // console.log(topic, message.toString());

  // 항목 중 값이 없는 경우 해당 데이터 전부 버림.
  const nullData: boolean = chekcDataNull(obj);
  if (nullData) {
    // console.log("?????", topic, message.toString());
    return;
  }
  let tempData: any = null;

  if (topic === Topics.leak) {
    tempData = chekcDataLeak(obj);
    // TODO: 데이터를 분석해서 현재 설비의 동작 상태를 예측해야 한다.
    if (tempData) statLeak(con, tempData, MyEmitter);
  } else if (topic === Topics.shape) {
    tempData = chekcDataShape(obj);
    if (tempData) statShape(con, tempData, MyEmitter);
  } else if (topic === Topics.assem) {
    tempData = chekcDataAssem(obj);
    if (tempData) statAssem(con, tempData, MyEmitter);
  }

  // MQTT publish -> telegraf -> influxDB -> grafana
  if (tempData) {
    MyEmitter.emit("mqttMsg", topic, tempData);
    // console.log(message.toString());
    // MqttClient.publish(topic, JSON.stringify(message));
    MqttClient.publish(topic, message.toString());
  }
};

export const createStat = (topics: any, mqttClient: any, myEmitter: any) => {
  Topics = topics;
  MyEmitter = myEmitter;
  MqttClient = mqttClient;
  // mqttClient.on("message", mqttMsgHandler);
  myEmitter.on("mqttSub", mqttMsgHandler);
  myEmitter.on("dbConnected", dbConnectedHandler);
  console.log("Statistics start!");
};
