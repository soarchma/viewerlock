// let countTotal = 1000;
// let state = "zero";
// let oldState = "zero";
// let countZero = 100;
// let countMax = 50;
// let countIncDec = 3;
// let maxVal = 0;
// let minVal = 0;
// let errVal = 0;
// const errKey: any = [];
// let termCount = 0;
// let endOfTerm = false;

const defData: any = {
  model_no: 4, // 생산모델
  prod: 0, // 금일 생산수량
  ng1_1: 0, // NG 1-1 수량 (확관)
  ng1_2a: 0, // NG 1-2 수량 (레듀샤)
  ng1_2b: 0, // NG 1-2 수량 (O-링)
  ng2_1: 0, // NG 2-1 수량 (확관)
  ng2_2a: 0, // NG 2-1 수량 (니쁠)
  ng2_2b: 0, // NG 2-1 수량 (O-링)
};

interface KeyValuePair {
  [key: string]: number;
}

export const assemFunc = (assemData: any) => {
  const id = Math.floor(Math.random() * (60 - 0) + 0);
  Object.keys(assemData.data).forEach((key: string, index: number) => {
    // assemData.data[key] = defData[key];
    if (index === id && key != "model_no") {
      assemData.data[key] += 1;
      assemData.update = [key];
    }
  });

  return assemData;
};
