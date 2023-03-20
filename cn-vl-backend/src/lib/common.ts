import type { KeyAnyPair } from "./interface";

export const getkrDate = () => {
  // 1. 현재 시간(Locale)
  const curr = new Date();
  // console.log("현재시간(Locale) : " + curr + "<br>"); // 현재시간(Locale) : Tue May 31 2022 09:00:30

  // 2. UTC 시간 계산
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
  const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.

  // console.log("한국시간 : " + kr_curr); // 한국시간 : Tue May 31 2022 09:00:30 GMT+0900 (한국 표준시)
  return kr_curr;
};

export const getDate = (dayBefore: number = 0) => {
  // const date = new Date();
  const date: any = getkrDate();
  date.setHours(date.getHours() - dayBefore * 24);
  const isoDate = date.toISOString();
  return isoDate.split("T", 1)[0];
};

export const getDateStamp = (dayBefore: number = 0) => {
  // let date = new Date();
  let date: any = getkrDate();
  date.setHours(date.getHours() - dayBefore * 24);
  const isoDate = date.toISOString();
  date = new Date(isoDate.split("T", 1)[0]); // "1900-01-01"
  return date.getTime();
};

const _assemData: KeyAnyPair = {
  type: "assem",
  active: false,
  capacity: 0,
  update: [],
  test: false,
  data: {
    model: 1200, // 생산모델
    cnt: 0, // 금일 생산수량
    exp1: 0, // NG 1-1 수량 (확관)
    redu: 0, // NG 1-2 수량 (레듀샤)
    oring1: 0, // NG 1-2 수량 (O-링)
    exp2: 0, // NG 2-1 수량 (확관)
    nipple: 0, // NG 2-1 수량 (니쁠)
    oring2: 0, // NG 2-1 수량 (O-링)
  },
};
export const assemData = () => {
  return JSON.parse(JSON.stringify(_assemData));
};

const _shapeData: KeyAnyPair = {
  type: "shape",
  active: false,
  capacity: 0,
  update: [],
  test: false,
  data: {
    model: 1200, // 설정 모델
    cnt: 0, // 생산수량
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1950, // 직관 2ST 설정치
    shape1: 8700, // 성형 1ST 설정치
    shape2: 8701, // 성형 2ST 설정치
    cut1: 10040, // CUT 1 설정치
    cut2: 10040, // CUT 2 설정치
  },
};
export const shapeData = () => {
  return JSON.parse(JSON.stringify(_shapeData));
};

const _leakData: KeyAnyPair = {
  type: "leak",
  active: false,
  capacity: 0,
  update: [],
  test: false,
  data: {
    leak1: 0,
    leak2: 0,
    leak3: 0,
    leak4: 0,
    leak5: 0,
    leak6: 0,
  },
};
export const leakData = () => {
  return JSON.parse(JSON.stringify(_leakData));
};

const _shapeRefs: any = [
  {
    model: 700, // 설정 모델
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1800, // 직관 2ST 설정치
    shape1: 3600, // 성형 1ST 설정치
    shape2: 3601, // 성형 2ST 설정치
    cut1: 10200, // CUT 1 설정치
    cut2: 10200, // CUT 2 설정치
  },
  {
    model: 1000, // 설정 모델
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1800, // 직관 2ST 설정치
    shape1: 6890, // 성형 1ST 설정치
    shape2: 6881, // 성형 2ST 설정치
    cut1: 1470, // CUT 1 설정치
    cut2: 1470, // CUT 2 설정치
  },
  {
    model: 1200, // 설정 모델
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1950, // 직관 2ST 설정치
    shape1: 8700, // 성형 1ST 설정치
    shape2: 8701, // 성형 2ST 설정치
    cut1: 10040, // CUT 1 설정치
    cut2: 10040, // CUT 2 설정치
  },
  {
    model: 1500, // 설정 모델
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1920, // 직관 2ST 설정치
    shape1: 11690, // 성형 1ST 설정치
    shape2: 11691, // 성형 2ST 설정치
    cut1: 10050, // CUT 1 설정치
    cut2: 10050, // CUT 2 설정치
  },
  {
    model: 1800, // 설정 모델
    beeline1: 900, // 직관 1ST 설정치
    beeline2: 1950, // 직관 2ST 설정치
    shape1: 14650, // 성형 1ST 설정치
    shape2: 14651, // 성형 2ST 설정치
    cut1: 10090, // CUT 1 설정치
    cut2: 10090, // CUT 2 설정치
  },
  {
    model: 2500, // 설정 모델
    beeline1: 500, // 직관 1ST 설정치
    beeline2: 700, // 직관 2ST 설정치
    shape1: 23200, // 성형 1ST 설정치
    shape2: 23201, // 성형 2ST 설정치
    cut1: 11140, // CUT 1 설정치
    cut2: 11140, // CUT 2 설정치
  },
];
export const shapeRefs = () => {
  return _shapeRefs.slice();
};
