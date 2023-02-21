import type { KeyAnyPair } from "./interface";
import * as comm from "./common";

let SpeedUp: number = 1;

const shapeData: KeyAnyPair = comm.shapeData();
// const shapeData: KeyAnyPair = {
//   type: "shape",
//   active: false,
//   update: [],
//   test: true,
//   data: {
//     model: 1200, // 설정 모델
//     cnt: 0, // 생산수량
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1950, // 직관 2ST 설정치
//     shape1: 8700, // 성형 1ST 설정치
//     shape2: 8701, // 성형 2ST 설정치
//     cut1: 10040, // CUT 1 설정치
//     cut2: 10040, // CUT 2 설정치
//   },
// };

const shapeRefs: any = comm.shapeRefs();
// const shapeRefs: any = [
//   {
//     model: 700, // 설정 모델
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1800, // 직관 2ST 설정치
//     shape1: 3600, // 성형 1ST 설정치
//     shape2: 3601, // 성형 2ST 설정치
//     cut1: 10200, // CUT 1 설정치
//     cut2: 10200, // CUT 2 설정치
//   },
//   {
//     model: 1000, // 설정 모델
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1800, // 직관 2ST 설정치
//     shape1: 6890, // 성형 1ST 설정치
//     shape2: 6881, // 성형 2ST 설정치
//     cut1: 1470, // CUT 1 설정치
//     cut2: 1470, // CUT 2 설정치
//   },
//   {
//     model: 1200, // 설정 모델
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1950, // 직관 2ST 설정치
//     shape1: 8700, // 성형 1ST 설정치
//     shape2: 8701, // 성형 2ST 설정치
//     cut1: 10040, // CUT 1 설정치
//     cut2: 10040, // CUT 2 설정치
//   },
//   {
//     model: 1500, // 설정 모델
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1920, // 직관 2ST 설정치
//     shape1: 11690, // 성형 1ST 설정치
//     shape2: 11691, // 성형 2ST 설정치
//     cut1: 10050, // CUT 1 설정치
//     cut2: 10050, // CUT 2 설정치
//   },
//   {
//     model: 1800, // 설정 모델
//     beeline1: 900, // 직관 1ST 설정치
//     beeline2: 1950, // 직관 2ST 설정치
//     shape1: 14650, // 성형 1ST 설정치
//     shape2: 14651, // 성형 2ST 설정치
//     cut1: 10090, // CUT 1 설정치
//     cut2: 10090, // CUT 2 설정치
//   },
// ];
const models = [700, 1000, 1200, 1500, 1800];
let curModelId = 2;
let curCnt = 0;

const shapeFunc = () => {
  // const id = Math.floor(Math.random() * (60 - 0) + 0);

  // let ref: any = shapeRefs[curModelId];

  // Object.keys(shapeData.data).forEach((key: string, index: number) => {
  //   if (ref[key]) shapeData.data[key] = ref[key];
  //   // if (index === id && key != "model" && key != "cnt") {
  //   //   shapeData.data[key] += 100;
  //   // }
  // });
  shapeData.data.cnt = curCnt;
  // if (shapeData.data.beeline1 === 0) console.log("AAAAAAAAAAAA", shapeData);

  return shapeData;
};

const errPercent = 0.9;
const errInterval = 1000 * 60 * 10; // 10분
// const errInterval = 1000 * 6 * 1; // 1분
const modelInterval = 1000 * 60 * 60; // 1 시간
const manufactureTimePerMm = 1000 * 3; // 3 초

let manufactureIntervaId: any = null;
let selectModelIntervaId: any = null;
let interlockIntervalId: any = null;

function setManufactureTime(model: number) {
  let manufactureInter = (model / 100) * manufactureTimePerMm;
  if (manufactureIntervaId) {
    clearInterval(manufactureIntervaId);
    manufactureIntervaId = null;
  }
  // 100mm 당 약 3초의 시간이 소요된다.
  manufactureIntervaId = setInterval(() => {
    // 생산량 증가
    shapeData.data.cnt = ++curCnt;
    // console.log("성형기 생산!", curCnt);
  }, manufactureInter / SpeedUp);
}

function selectModelFunc() {
  const temp = models[curModelId];
  curModelId = Math.floor(Math.random() * (5 - 0) + 0);
  console.log("성형기 모델 변경", temp, "->", models[curModelId]);
  // 모델 변경
  Object.keys(shapeData.data).forEach((key: string) => {
    if (shapeRefs[curModelId][key])
      shapeData.data[key] = shapeRefs[curModelId][key];
  });

  setManufactureTime(models[curModelId]);
}

function selectModel() {
  if (selectModelIntervaId) {
    clearInterval(selectModelIntervaId);
    selectModelIntervaId = null;
  }
  selectModelFunc();

  selectModelIntervaId = setInterval(() => {
    selectModelFunc();
    // const temp = models[curModelId];
    // curModelId = Math.floor(Math.random() * (5 - 0) + 0);
    // console.log("성형기 모델 변경", temp, "->", models[curModelId]);
    // // 모델 변경
    // Object.keys(shapeData.data).forEach((key: string) => {
    //   if (shapeRefs[curModelId][key])
    //     shapeData.data[key] = shapeRefs[curModelId][key];
    // });

    // setManufactureTime(models[curModelId]);
  }, modelInterval / SpeedUp); // 1시간 마다 모델이 랜덤하게 변경 된다.
}

function interlockSimulation() {
  // 주기적으로 인터락 상황을 랜덤하게 발생시킨다.

  interlockIntervalId = setInterval(() => {
    let errOccur = false;
    if (Math.random() < errPercent) errOccur = true; // 30 %
    Object.keys(shapeData.data).forEach((key: string) => {
      if (errOccur) {
        if (key != "model") {
          const temp = Math.random();
          if (temp < errPercent) {
            shapeData.data[key] =
              shapeData.data[key] + Math.floor(Math.random() * (100 - 0) + 0);
          } else if (temp > 1 - errPercent) {
            shapeData.data[key] =
              shapeData.data[key] - Math.floor(Math.random() * (100 - 0) + 0);
          }
        }
      } else {
        if (shapeRefs[curModelId][key]) {
          if (shapeRefs[curModelId][key] === 0)
            console.log("????????????????????????????");
          shapeData.data[key] = shapeRefs[curModelId][key];
        }
      }
    });
  }, errInterval / SpeedUp);
}

let intervalId: any = null;
let nowWorking: boolean = false;

export const shapeStart = (
  mqttClient: any,
  myEmitter: any,
  topic: string,
  intervalTime: number,
  speedUp: number
) => {
  if (nowWorking) return;
  SpeedUp = speedUp;

  selectModel();
  interlockSimulation();

  intervalId = setInterval(() => {
    myEmitter.emit("mqttMsg", topic, shapeFunc());
    mqttClient.publish(topic, JSON.stringify(shapeData.data));
  }, intervalTime / SpeedUp);
  nowWorking = true;
};

export const shapeStop = () => {
  if (!nowWorking) return;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (selectModelIntervaId) {
    clearInterval(selectModelIntervaId);
    selectModelIntervaId = null;
  }
  if (manufactureIntervaId) {
    clearInterval(manufactureIntervaId);
    manufactureIntervaId = null;
  }
  if (interlockIntervalId) {
    clearInterval(interlockIntervalId);
    interlockIntervalId = null;
  }
  nowWorking = false;
};
