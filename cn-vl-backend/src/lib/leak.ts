import type { KeyAnyPair } from "./interface";
import * as comm from "./common";

// let SpeedUp: number = 1;

const leakData: KeyAnyPair = comm.leakData();
// const leakData: KeyAnyPair = {
//   type: "leak",
//   active: false,
//   update: [],
//   test: false,
//   data: {
//     leak1: 0,
//     leak2: 0,
//     leak3: 0,
//     leak4: 0,
//     leak5: 0,
//     leak6: 0,
//   },
// };
const testRef = 27; // 27
const standbyRef = 50; // 50
const minVal = 550; // 550

const testFunc = (
  mqttClient: any,
  myEmitter: any,
  topic: string,
  intervalTime: number,
  speedUp: number
) => {
  let testRemain = 0;
  let standbyRemain = standbyRef;
  let data: any = [0, 0, 0, 0, 0, 0];
  let rand: any = [0, 0, 0, 0, 0, 0];
  let errPercent: number = 0.1;
  // let divPercent: number = (1 - errPercent) / 3;

  const testIntervalId = setInterval(() => {
    if (testRemain > 0) {
      if (testRemain >= testRef) {
        // 압력 증가 구간
        leakData.update = [];
        for (let i = 0; i < data.length; i++) {
          data[i] += Math.floor(Math.random() * (500 - 50) + 50);
        }
      } else if (testRemain >= testRef - 1) {
        // 시작값 결정 구간
        for (let i = 0; i < data.length; i++) {
          if (rand[i] > errPercent / 3) {
            data[i] = Math.floor(Math.random() * (600 - 595) + 595);
          } else {
            // if (Math.random() < 0.3) {
            data[i] = Math.floor(Math.random() * (600 - 580) + 580);
            // }
            // data[i] = Math.floor(Math.random() * (600 - 595) + 595);
          }
        }
      } else if (testRemain >= testRef - 3) {
        // 아무것도 안하는 구간
      } else if (testRemain >= 5) {
        // 압력 유지(테스트) 구간
        leakData.active = true;
        // rand 값에 의해 압력 감소 값이 정해짐
        for (let i = 0; i < data.length; i++) {
          if (rand[i] < errPercent) {
            // 에러
            if (rand[i] < errPercent && rand[i] >= (errPercent / 3) * 2) {
              data[i] -= Math.floor(Math.random() * (10 - 0) + 0);
            } else if (
              rand[i] < (errPercent / 3) * 2 &&
              rand[i] >= errPercent / 3
            ) {
              data[i] -= Math.floor(Math.random() * (40 - 5) + 5);
            } else if (rand[i] < errPercent / 3 && rand[i] >= 0) {
              data[i] -= Math.floor(Math.random() * (80 - 20) + 20);
            }
            if (data[i] <= 0) data[i] = Math.floor(Math.random() * (4 - 0) + 0);
          } else {
            // 정상
            // if (testRemain % 2)
            data[i] -= Math.floor(Math.random() * (2 - 0) + 0);
            // if (
            //   rand[i] < errPercent + divPercent * 1 &&
            //   rand[i] >= errPercent
            // ) {
            //   data[i] -= Math.floor(Math.random() * (3 - 0) + 0);
            // } else if (
            //   rand[i] < errPercent + divPercent * 2 &&
            //   rand[i] >= errPercent + divPercent * 1
            // ) {
            //   data[i] -= Math.floor(Math.random() * (2 - 0) + 0);
            // } else if (rand[i] <= 1 && rand[i] >= errPercent + divPercent * 2) {
            //   data[i] -= Math.floor(Math.random() * (1 - 0) + 0);
            // }
          }
          if (data[i] < minVal) {
            // 에러 발생 알림
            let str = `leak${i + 1}`;
            if (leakData.update.indexOf(str) < 0) leakData.update.push(str);
          }
        }
      } else if (testRemain >= 2) {
        // 압력 감소 구간
        leakData.active = false;
        // console.log("압력 감소");
        for (let i = 0; i < data.length; i++) {
          if (data[i] > 0) {
            data[i] -= Math.floor(Math.random() * (150 - 100) + 100);
            if (data[i] <= 0) data[i] = Math.floor(Math.random() * (4 - 0) + 0);
          }
        }
      } else if (testRemain >= 1) {
        // 압력 초기화 구간
        // console.log("압력 초기화");
        for (let i = 0; i < data.length; i++) {
          if (data[i] > 5) data[i] = Math.floor(Math.random() * (4 - 0) + 0);
        }

        standbyRemain = Math.floor(
          Math.random() * (standbyRef - standbyRef / 2) + standbyRef / 2
        );
      }
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@", testRemain, data);

      testRemain = testRemain - 1;
    } else {
      if (standbyRemain > 1) {
        // console.log("Standby...");
        for (let i = 0; i < data.length; i++) {
          if (Math.random() < 0.3)
            data[i] = Math.floor(Math.random() * (4 - 0) + 0);
        }
        standbyRemain = standbyRemain - 1;
      } else {
        testRemain = testRef;
        // 에러 확률
        for (let i = 0; i < data.length; i++) {
          rand[i] = Math.random();
        }
        // console.log(rand);
      }
    }

    Object.keys(leakData.data).forEach((key: string, index: number) => {
      leakData.data[key] = data[index];
    });

    myEmitter.emit("mqttMsg", topic, leakData);
    mqttClient.publish(topic, JSON.stringify(leakData.data));
  }, intervalTime / speedUp);

  return testIntervalId;
};
// testFunc();

/*
let countTotal = 1000;
let state = "zero";
let oldState = "zero";
let countZero = 100;
let countMax = 50;
let countInc = 6;
let countDec = 3;
let maxVal = 0;
let minVal = 0;
let errVal = 0;
const errKey: any = [];
let termCount = 0;
let endOfTerm = false;

const leakFunc = () => {
  Object.keys(leakData.data).forEach((key: string, index: number) => {
    if (index === 0) {
      if (state === "zero") {
        countZero -= 1;
        maxVal = 4;
        minVal = 0;
        if (countZero === 0) {
          oldState = state;
          state = "inc";
          leakData.active = false;
          countZero = Math.floor(Math.random() * (120 - 80) + 80);
        }
      } else if (state === "inc") {
        countInc -= 1;
        maxVal = Math.floor(Math.random() * (100 - 90) + 90);
        minVal = Math.floor(Math.random() * (100 - 80) + 80);
        if (countInc === 0) {
          oldState = state;
          state = "max";
          leakData.active = true;
          countInc = 6;
        }
      } else if (state === "max") {
        countMax -= 1;
        if (countMax === 0) {
          oldState = state;
          state = "dec";
          leakData.active = false;
          countMax = 50;
          errVal = 0;
        }
      } else if (state === "dec") {
        countDec -= 1;
        maxVal = Math.floor(Math.random() * (200 - 180) + 180);
        minVal = Math.floor(Math.random() * (200 - 160) + 160);
        if (countDec === 0) {
          oldState = state;
          state = "zero";
          leakData.active = false;
          countDec = 3;
          endOfTerm = true;
        }
      }
    }
    if (state === "max") {
      maxVal = Math.floor(Math.random() * (2 - 0) + 0);
      minVal = Math.floor(Math.random() * (2 - 0) + 0);
    }

    // 각 텀에서 max 상태로 바뀌는 순간 에러 판단.
    if (state === "max" && oldState === "inc") {
      if (Math.random() < 0.1) {
        console.log("ERRRRRRRRRO!!!!!!", 7 * termCount + index + 1);
        // errVal = Math.floor(Math.random() * (20 - 10) + 10);
        errKey.push(key);
      }
      // if (key === "leak4") errKey.push(key);
      // if (key === "leak6") errKey.push(key);
      // if (key === "leak3") errKey.push(key);
    }

    if (oldState === "zero") {
      leakData.data[key] = Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
    } else if (oldState === "inc") {
      if (state === "max") {
        leakData.data[key] = Math.floor(Math.random() * (602 - 598) + 598);
      } else {
        leakData.data[key] += Math.floor(
          Math.random() * (maxVal - minVal) + minVal
        );
      }
    } else if (oldState === "max") {
      leakData.data[key] -= Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
      if (errKey.includes(key)) {
        const maxVal = [
          Math.floor(Math.random() * (120 - 10) + 10),
          Math.floor(Math.random() * (30 - 20) + 20),
          Math.floor(Math.random() * (10 - 5) + 5),
        ];
        const id = Math.floor(Math.random() * (2 - 0) + 0);
        // let id = 0;
        // if (key === "leak2" || key === "leak4") id = 1;
        // if (key === "leak3" || key === "leak5") id = 2;

        leakData.data[key] -= Math.floor(Math.random() * (maxVal[id] - 2) + 2);
      }
    } else {
      leakData.data[key] -= Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
    }

    if (leakData.data[key] < 0) leakData.data[key] = 0;

    // keyCount -= 1;
  });
  oldState = state;
  if (endOfTerm) {
    termCount += 1;
    endOfTerm = false;
    console.log(
      "END OF TERM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    errKey.length = 0;
  }
  // leakData.data["tag"] = termCount;
  // console.log(state, JSON.stringify(leakData));
  // mqttClient.publish(topics.leak, JSON.stringify(leakData));
  return leakData;
};
*/
let intervalId: any = null;
let nowWorking: boolean = false;

export const leakStart = (
  mqttClient: any,
  myEmitter: any,
  topic: string,
  intervalTime: number,
  speedUp: number
) => {
  if (nowWorking) return;
  // SpeedUp = speedUp;
  intervalId = testFunc(mqttClient, myEmitter, topic, intervalTime, speedUp);
  // intervalId = setInterval(() => {
  //   mqttClient.publish(topic, JSON.stringify(leakFunc()));
  // }, intervalTime);
  nowWorking = true;
};

export const leakStop = () => {
  if (!nowWorking) return;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  nowWorking = false;
};
