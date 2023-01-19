import fs from "fs";
import WebSocket, { WebSocketServer } from "ws";
// import net from "net";
// import express from "express";
import * as mqtt from "mqtt";
import { EventEmitter } from "events";
import yallist from "yallist";

// let myList = yallist.create([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// myList.forEach(function (k) {
//   console.log(k);
// });
// myList.push(10);
// myList.push(11);
// myList.push(12);
// myList.push(13);
// myList.push(14);
// // myList.removeNode(myList.tail);
// // console.log("-----------------------------");
// // myList.forEachReverse(function (k) {
// //   // walk the list head to tail
// //   console.log(k);
// // });
// console.log("-----------------------------");
// myList = myList.slice(myList.length - 10, myList.length);
// myList.forEach(function (k) {
//   console.log(k);
// });
// console.log("-----------------------------");
// console.log("-----------------------------");

const myEmitter = new EventEmitter();

const wss = new WebSocketServer({
  port: 8070,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
});

wss.on("connection", (ws) => {
  console.log("WebSocket server connection!");
  ws.on("message", (data) => {
    console.log("received: %s", data);
  });
  ws.on("close", (code, reason) => {
    console.log("close", code, reason);
  });
  //////////////////////////////////////////
  myEmitter.on("message", (msg: any) => {
    ws.send(msg);
  });
});

const pubTopics = {
  shape: "viewerlock/sj/shape",
  leak: "viewerlock/sj/leak",
  assem: "viewerlock/sj/assem",
};
const mqttClient = mqtt.connect("mqtt://localhost");
const mqttIjoon = mqtt.connect({
  host: "123.142.5.131",
  port: 21984,
  protocol: "mqtts",
  username: "ijoon",
  password: "9DGQhyCH6RZ4",
  ca: [fs.readFileSync("./rootca.crt")],
});

// TODO: MQTT server 연결 제어
mqttClient.on("connect", () => {
  console.log("MQTT PUB server connected!");
  // mqttClient.publish(pubTopics.leak, Math.random().toString());
  // console.log(mqttClient);
});

let oldLeakData: any = null;
let oldShapeData: any = null;
// let oldAssemData: any = null;
let leakActive = false;
let isStarting = false;
let isTesting = false;
let isWaiting = false;

/*
model_no: 4, // 생산모델
prod: 0, // 금일 생산수량
ng1_1: 0, // NG 1-1 수량 (확관)
ng1_2a: 0, // NG 1-2 수량 (레듀샤)
ng1_2b: 0, // NG 1-2 수량 (O-링)
ng2_1: 0, // NG 2-1 수량 (확관)
ng2_2a: 0, // NG 2-1 수량 (니쁠)
ng2_2b: 0, // NG 2-1 수량 (O-링)
*/
// const model_no = [] as any;
// const prod = [] as any;
// const ng1_1 = [] as any;
// const ng1_2a = [] as any;
// const ng1_2b = [] as any;
// const ng2_1 = [] as any;
// const ng2_2a = [] as any;
// const ng2_2b = [] as any;
type myType = {
  [key: string]: any;
};
const assemLists: myType = {
  model_no: yallist.create([]),
  prod: yallist.create([]),
  ng1_1: yallist.create([]),
  ng1_2a: yallist.create([]),
  ng1_2b: yallist.create([]),
  ng2_1: yallist.create([]),
  ng2_2a: yallist.create([]),
  ng2_2b: yallist.create([]),
};

mqttIjoon.on("message", (topic: string, msg: any) => {
  let today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  let seconds = today.getSeconds(); // 초
  // console.log(hours, minutes, seconds);
  // msg is Buffer
  const leakData = JSON.parse(msg.toString());
  // console.log(topic, leakData);
  // mqtt 종료
  // mqttClient.end();

  /*
  // FIXME:TODO:FIXME:TODO:FIXME:TODO: TEST CODE!!!!!!!!!!
  // if (!isStarting) {
    if (!isStarting && !isWaiting && !leakActive) {
      isStarting = true;
      setTimeout(() => {
        leakActive = true;
        isStarting = false;
        console.log("Test Start!");
      }, 1000);
    }
    
    if (leakActive) {
    if (!isTesting) {
      isTesting = true;
      setTimeout(() => {
        leakActive = false;
        isTesting = false;
        console.log("Test End!");
        ///////////////////////////
        isWaiting = true; // ?????
        console.log("Test Wating...");
        setTimeout(() => {
          isWaiting = false;
          console.log("Test Ready");
        }, 1000 * 5);
        ///////////////////////////
      }, 1000 * 5);
    }
  }
  // FIXME:TODO:FIXME:TODO:FIXME:TODO: TEST CODE!!!!!!!!!!
*/
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  if (topic === "ijoon/sj/fac-cam-sj001/SJ-OCT-01/data") {
    const wsData = {
      type: "leak",
      active: false,
      update: [],
      data: leakData,
    };

    let temp = 0;
    let count = 0;
    let cnt = 0;
    Object.keys(leakData).forEach((key: string, index: number) => {
      if (leakData[key] === "") cnt++;
      // 700 이상일 경우 데이터 버림.
      if (leakData[key] > 700) leakData[key] = null;

      // TODO: active 조건 판단
      if (leakData[key] != null) {
        temp += leakData[key];
        count += 1;
      }
    });

    if (cnt > 3) {
      console.log("Drop garbage!!!", wsData);
      return;
    }

    // FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:
    if (temp / count > 500 && !leakActive) {
      // if (!isStarting) {
      if (!isStarting && !isWaiting) {
        isStarting = true;
        setTimeout(() => {
          leakActive = true;
          isStarting = false;
          console.log("Test Start!");
        }, 1000);
      }
    }

    if (leakActive) {
      if (!isTesting) {
        isTesting = true;
        setTimeout(() => {
          leakActive = false;
          isTesting = false;
          console.log("Test End!");
          ///////////////////////////
          isWaiting = true; // ?????
          console.log("Test Wating...");
          setTimeout(() => {
            isWaiting = false;
            console.log("Test Ready");
          }, 1000 * 10);
          ///////////////////////////
        }, 1000 * 15);
      }

      wsData.active = true;
    }                                                                                                   
    // FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:

    oldLeakData = JSON.parse(JSON.stringify(leakData));

    if (mqttClient.connected) {
      mqttClient.publish(pubTopics.leak, JSON.stringify(wsData.data));
    }

    // const wsMsg = { type: "leak", data: wsData };
    // console.log(wsMsg);
    // wsMsg.data = JSON.parse(wsData);
    // ws.send(JSON.stringify(wsData));
    myEmitter.emit("message", JSON.stringify(wsData));
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
  } else if (topic === "ijoon/sj/fac-cam-sj002/SJ-OCT-02/data") {
    const wsData = {
      type: "shape",
      active: false,
      update: [],
      data: JSON.parse(msg.toString()),
    };
    // const wsMsg = { type: "shape", data: wsData };

    let isUpdate = false;
    let cnt = 0;
    if (oldShapeData != null) {
      Object.keys(wsData.data).forEach((key: string, index: number) => {
        if (wsData.data[key] === "") cnt++;
        if (wsData.data[key] != oldShapeData[key]) isUpdate = true;
      });
    } else {
      isUpdate = true;
    }

    if (cnt > 3) {
      console.log("Drop garbage!!!", JSON.stringify(wsData));
      return;
    }

    // if (isUpdate) {
    // 업데이트 된 항목만 DB에 저장
    oldShapeData = JSON.parse(JSON.stringify(wsData.data));
    if (mqttClient.connected) {
      mqttClient.publish(pubTopics.shape, JSON.stringify(wsData));
    } else {
      // console.log("1111111");
    }
    // } else {
    //   console.log("2222222222222");
    // }
    myEmitter.emit("message", JSON.stringify(wsData));
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
  } else if (topic === "ijoon/sj/fac-cam-sj003/SJ-OCT-03/data") {
    const raw = JSON.parse(msg.toString());
    const wsData = {
      type: "assem",
      active: false,
      update: [] as any,
      data: raw,
    };
    // const wsMsg = { type: "assem", data: wsData };
    /**
     * 샘플 가능한 최소 데이터 수집
     * 항목 별로 수집
     * 5회 이상 동일한 수치일 경우 업데이트
     * 특수 항목 (3 -> 8) 등 예회 처리
     */
    /*
    Object.keys(raw).forEach((key: string, index: number) => {
      let isOk = false;
      // 1. 항목별 한계 수치 검사
      if (key === "model_no") {
        if (raw[key] > 0 && raw[key] < 6) isOk = true; // 1 ~ 5
      } else if (key === "prod") {
        if (raw[key] >= 0 && raw[key] <= 1000) isOk = true; // 0 ~ 1000
      } else {
        if (raw[key] >= 0 && raw[key] <= 200) isOk = true; // 0 ~ 200
      }

      //
      if (assemLists[key].length > 10) {
        assemLists[key].shift(); // 데이터 10개만 유지
        // - 과거 데이터 검사
        let sum = 0;
        assemLists[key].forEach((k: any) => {
          sum += k;
        });
        let avg = sum / 10;
        assemLists[key].forEach((k: any) => {
          // if(k )
        });

        // - 기대 값 예측
        assemLists[key].forEach((k: any) => {
          console.log(k);
        });
        // - 기대 값 검사. 각 항목은 반드시 1씩 증가.(예외. 화면 가린경우 등)
        if (isOk) {
          isOk = false;
        }
      } else {
        // 데이터가 10개 이하인 경우 무조건 저장 한다.
        // if(assemLists[key].length) {
        //   if(assemLists[key].tail === raw[key] && assemLists[key].tail <= raw[key]) isOk = false;
        // }
        if (isOk) assemLists[key].push(raw[key]);
      }
      // console.log(key, assemLists[key].length);
    });
    // console.log(assemLists);

    // if (cnt > 2) {
    //   console.log("Drop garbage!!!", JSON.stringify(wsData));
    //   return;
    // }
*/
    // if (isUpdate) {
    // oldAssemData = JSON.parse(JSON.stringify(wsData.data));
    if (mqttClient.connected) {
      mqttClient.publish(pubTopics.assem, JSON.stringify(wsData));
    }
    // }
    myEmitter.emit("message", JSON.stringify(wsData));
  }
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
});

mqttClient.on("error", (err) => {
  console.log(err);
});

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
mqttIjoon.on("connect", () => {
  console.log("MQTT SUB server connected!");
  mqttIjoon.subscribe(topicList, (err) => {
    if (!err) {
      // setInterval(() => {
      //   // console.log("AAAA", Math.random());
      //   mqttIjoon.publish("test_topic", Math.random().toString());
      // }, 1000);
    } else {
      console.log(err);
    }
  });
});

// mqttIjoon.on("message", (topic, msg) => {
//   // msg is Buffer
//   const leakData = JSON.parse(msg.toString());
//   // console.log(topic, leakData);
//   // mqtt 종료
//   // mqttClient.end();
//   if (topic === "ijoon/sj/fac-cam-sj001/SJ-OCT-01/data") {
//     if (mqttClient.connected) {
//       // TODO: active 조건 판단
//       const temp = {
//         active: false,
//         data: leakData,
//       };
//       // console.log(topic, temp);
//       mqttClient.publish(pubTopics.leak, JSON.stringify(temp));
//     }
//   }
// });

mqttIjoon.on("error", (err) => {
  console.log(err);
});

// console.log("Hello~, World!!!");
