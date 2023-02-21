import type { KeyAnyPair } from "./interface";
import * as comm from "./common";

let SpeedUp: number = 1;

const models = [700, 1000, 1200, 1500, 1800];
let curModelId = 2;
let curCnt = 0;

const assemData: KeyAnyPair = comm.assemData();
// const assemData: KeyAnyPair = {
//   type: "assem",
//   active: false,
//   update: [],
//   test: true,
//   data: {
//     model: 1200, // 생산모델
//     cnt: 0, // 금일 생산수량
//     exp1: 0, // NG 1-1 수량 (확관)
//     redu: 0, // NG 1-2 수량 (레듀샤)
//     oring1: 0, // NG 1-2 수량 (O-링)
//     exp2: 0, // NG 2-1 수량 (확관)
//     nipple: 0, // NG 2-1 수량 (니쁠)
//     oring2: 0, // NG 2-1 수량 (O-링)
//   },
// };

const defData: any = {
  cnt: 0, // 금일 생산수량
  exp1: 0, // NG 1-1 수량 (확관)
  redu: 0, // NG 1-2 수량 (레듀샤)
  oring1: 0, // NG 1-2 수량 (O-링)
  exp2: 0, // NG 2-1 수량 (확관)
  nipple: 0, // NG 2-1 수량 (니쁠)
  oring2: 0, // NG 2-1 수량 (O-링)
};

const assemFunc = () => {
  Object.keys(assemData.data).forEach((key: string, index: number) => {
    // if (key != "model" && key != "cnt") {
    //   assemData.data[key] += 1;
    //   assemData.update = [key];
    // }
  });

  return assemData;
};

let manufactureIntervaId: any = null;
let selectModelIntervaId: any = null;
let interlockIntervalId: any = null;

function manufacture(time: number) {
  // let time = 1000 * 32; // 조립기의 정상 생산 속도는 1 EA 당 약 32초
  if (manufactureIntervaId) {
    clearInterval(manufactureIntervaId);
    manufactureIntervaId = null;
  }

  manufactureIntervaId = setInterval(() => {
    // 생산량 증가
    assemData.data.cnt = ++curCnt;
    // console.log("조립기 생산!", curCnt);
  }, time / SpeedUp);
}

function selectModel() {
  let time = 1000 * 60 * 60; // 1 시간
  if (selectModelIntervaId) {
    clearInterval(selectModelIntervaId);
    selectModelIntervaId = null;
  }

  selectModelIntervaId = setInterval(() => {
    const temp = models[curModelId];
    // 자동조립기에 투입되는 모델은 1200, 1500 두 종류
    curModelId = Math.floor(Math.random() * (4 - 2) + 2);
    console.log("조립기 모델 변경", temp, "->", models[curModelId]);
    // 모델 변경
    assemData.data.model = models[curModelId];
    // 모델 변경이 이뤄지면 나머지 값들은 0으로 초기화 된다.
    Object.keys(assemData.data).forEach((key: string) => {
      if (defData[key]) assemData.data[key] = defData[key];
    });

    // manufacture(models[curModelId]);
  }, time / SpeedUp); // 1시간 마다 모델이 랜덤하게 변경 된다.
}

function interlockSimulation(time: number) {
  // 주기적으로 인터락 상황을 랜덤하게 발생시킨다.
  // let time = 1000 * 10; // 10초
  const items = ["exp1", "redu", "oring1", "exp2", "nipple", "oring2"];

  interlockIntervalId = setInterval(() => {
    let errOccur = false;
    if (Math.random() < 0.3) errOccur = true; // 30 %
    if (errOccur) {
      if (manufactureIntervaId) {
        clearInterval(manufactureIntervaId);
        manufactureIntervaId = null;
      }
      manufacture(1000 * 32);
      let errKey = items[Math.floor(Math.random() * (6 - 0) + 0)];
      Object.keys(assemData.data).forEach((key: string) => {
        if (key === errKey) {
          assemData.data[key] = assemData.data[key] + 1;
        }
      });
    }
  }, time / SpeedUp);
}

let intervalId: any = null;
let nowWorking: boolean = false;

export const assemStart = (
  mqttClient: any,
  myEmitter: any,
  topic: string,
  intervalTime: number,
  speedUp: number
) => {
  if (nowWorking) return;
  SpeedUp = speedUp;

  selectModel();
  manufacture(1000 * 32);
  interlockSimulation(1000 * 30);

  intervalId = setInterval(() => {
    myEmitter.emit("mqttMsg", topic, assemFunc());
    mqttClient.publish(topic, JSON.stringify(assemData.data));
  }, intervalTime / SpeedUp);
  nowWorking = true;
};

export const assemStop = () => {
  if (!nowWorking) return;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
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
