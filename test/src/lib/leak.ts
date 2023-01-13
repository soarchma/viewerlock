let countTotal = 1000;
let state = "zero";
let oldState = "zero";
let countZero = 100;
let countMax = 50;
let countIncDec = 3;
let maxVal = 0;
let minVal = 0;
let errVal = 0;
const errKey: any = [];
let termCount = 0;
let endOfTerm = false;

interface KeyValuePair {
  [key: string]: number;
}

// export const asdf = () => {
//   return leakFunc;
// } 

export const leakFunc = (leakData: KeyValuePair) => {
  //
  Object.keys(leakData).forEach((key: string, index: number) => {
    if (index === 0) {
      if (state === "zero") {
        countZero -= 1;
        maxVal = 4;
        minVal = 0;
        if (countZero === 0) {
          oldState = state;
          state = "inc";
          countZero = Math.floor(Math.random() * (120 - 80) + 80);
        }
      } else if (state === "inc") {
        countIncDec -= 1;
        maxVal = Math.floor(Math.random() * (200 - 180) + 180);
        minVal = Math.floor(Math.random() * (200 - 160) + 160);
        if (countIncDec === 0) {
          oldState = state;
          state = "max";
          // minVal = maxVal = 600;
          countIncDec = 3;
        }
      } else if (state === "max") {
        countMax -= 1;
        // maxVal = Math.floor(Math.random() * (2 - 0) + 0);
        // minVal = Math.floor(Math.random() * (2 - 0) + 0);
        if (countMax === 0) {
          oldState = state;
          state = "dec";
          countMax = 50;
          errVal = 0;
        }
      } else if (state === "dec") {
        countIncDec -= 1;
        maxVal = Math.floor(Math.random() * (200 - 180) + 180);
        minVal = Math.floor(Math.random() * (200 - 160) + 160);
        if (countIncDec === 0) {
          oldState = state;
          state = "zero";
          countIncDec = 3;
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
    }

    if (oldState === "zero") {
      leakData[key] = Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
    } else if (oldState === "inc") {
      if (state === "max") {
        leakData[key] = Math.floor(Math.random() * (602 - 598) + 598);
      } else {
        leakData[key] += Math.floor(
          Math.random() * (maxVal - minVal) + minVal
        );
      }
    } else if (oldState === "max") {
      leakData[key] -= Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
      if (errKey.includes(key)) {
        leakData[key] -= Math.floor(Math.random() * (7 - 2) + 2);
      }
    } else {
      leakData[key] -= Math.floor(
        Math.random() * (maxVal - minVal) + minVal
      );
    }

    if (leakData[key] < 0) leakData[key] = 0;

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
  // leakData["tag"] = termCount;
  console.log(state, JSON.stringify(leakData));
  // mqttClient.publish(topics.leak, JSON.stringify(leakData));
  return leakData;
}