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

interface KeyValuePair {
  [key: string]: number;
}
export const leakFunc = (leakData: any) => {
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
        minVal = Math.floor(Math.random(  ) * (100 - 80) + 80);
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
