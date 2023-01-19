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

const defData_1200: any = {
  intuition1: 900, // 직관 1ST 설정치
  intuition2: 1950, // 직관 2ST 설정치
  modeling1: 8700, // 성형 1ST 설정치
  modeling2: 8701, // 성형 2ST 설정치
  cut1: 10040, // CUT 1 설정치
  cut2: 10040, // CUT 2 설정치
  production: 0, // 생산수량
  setting_model: 1200, // 설정 모델
};

const defData_1500: any = {
  intuition1: 900, // 직관 1ST 설정치
  intuition2: 1920, // 직관 2ST 설정치
  modeling1: 11690, // 성형 1ST 설정치
  modeling2: 11691, // 성형 2ST 설정치
  cut1: 10050, // CUT 1 설정치
  cut2: 10050, // CUT 2 설정치
  production: 0, // 생산수량
  setting_model: 1500, // 설정 모델
};

interface KeyValuePair {
  [key: string]: number;
}

export const shapeFunc = (shapeData: any) => {
  const id = Math.floor(Math.random() * (60 - 0) + 0);

  let ref = defData_1200;
  const model = Math.floor(Math.random() * (5 - 0) + 0);
  if (model > 2) {
    ref = defData_1500;
  }

  Object.keys(shapeData.data).forEach((key: string, index: number) => {
    shapeData.data[key] = ref[key];

    if (index === id && key != "setting_model") {
      shapeData.data[key] += 100;
    }
  });

  return shapeData;
};
