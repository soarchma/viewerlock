import type { KeyAnyPair } from "../interface";
import * as comm from "../common";
import * as sql from "../db/sql_action";

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

let curProdCnt: number = -1;
let curIl: any = undefined;
let pendinfCnt: number = -1;
let pendingErrKey: string = "";
let pendinfErrCnt: number = 0;

/**
 * 생산량
 * prod_assem
 * timestamp, model, cnt
 * 모델타입은 무시하고 금일 생산수량의 합을
 * 금일생산 수량 값이 변경될 경우 insert
 * 최초에 현재 수량을 알아야 한다.
 */
function prodAssem(con: any, msg: any, myEmitter: any) {
  if (curProdCnt >= 0) {
    /**
     * TODO:FIXME: curProdCnt 금일 생산량은 카메라 인식된 값을 그대로 사용한다.
     * 인식 변경이 있는 경우에 해당 값을 그대로 입력하고 변경된 횟수로 생산량을 파악한다.
     * */
    if (curProdCnt != msg.data.cnt && msg.data.cnt != 0) {
      if (pendinfCnt != msg.data.cnt) {
        pendinfCnt = msg.data.cnt;
        sql
          .insertProdAssem(con, msg.data.model, msg.data.cnt)
          .then((result) => {
            if (result) {
              if (!result.err) {
                // console.log(result.rows[0].cnt);
                curProdCnt = msg.data.cnt;
                assemData.update = [];
                assemData.data = msg.data;
                // console.log(msg);
                myEmitter.emit("myStats", "newProd", assemData.type, assemData);
              } else {
                console.log(result.err);
              }
            }
            pendinfCnt = -1;
          });
      } else {
        console.log("pendinfCnt=====================>", pendinfCnt);
      }
    }
  } else {
    // 최초 1회 DB에서 값을 가져와야 한다.
    sql.getLastProdAssem(con).then((result) => {
      if (result) {
        if (!result.err) {
          if (result.rows.length > 0) {
            curProdCnt = result.rows[0].cnt;
          } else {
            // Table Empty!
            console.log("Table prod_assem is empty!");
            curProdCnt = 0;
          }
        } else {
          console.log(result.err);
        }
      }
    });
  }
}

function ilAssem(con: any, msg: any, myEmitter: any) {
  let update: boolean = false;
  let nonZero: boolean = false;
  const temp: any = {};
  temp.model = msg.data.model;
  temp.exp1 = msg.data.exp1;
  temp.redu = msg.data.redu;
  temp.oring1 = msg.data.oring1;
  temp.exp2 = msg.data.exp2;
  temp.nipple = msg.data.nipple;
  temp.oring2 = msg.data.oring2;
  let dbTemp: any = {};
  if (curIl) {
    Object.keys(temp).forEach((key: string) => {
      if (temp[key] != curIl[key]) {
        pendingErrKey = key;
        if (temp[key] != 0) dbTemp[key] = temp[key];
        else dbTemp[key] = null;
        update = true;
      } else {
        // TODO:FIXME:TODO:FIXME:
        dbTemp[key] = null;
      }
      // 0 이 아닐 경우에만 업데이트
      if (key != "model" && temp[key] != 0) {
        nonZero = true;
      }
    });
  }

  if (curIl) {
    if (update && nonZero) {
      if (pendinfErrCnt === 0) {
        pendinfErrCnt = temp[pendingErrKey];
        sql
          .insertIlAssem(
            con,
            temp.model,
            dbTemp.exp1,
            dbTemp.redu,
            dbTemp.oring1,
            dbTemp.exp2,
            dbTemp.nipple,
            dbTemp.oring2
          )
          .then((result) => {
            if (result) {
              if (!result.err) {
                // console.log(result.rows[0].cnt);
                assemData.update = [pendingErrKey];
                assemData.data = temp;
                myEmitter.emit("myStats", "newIl", assemData.type, assemData);
                curIl = temp;
              } else {
                console.log(result.err);
              }
            }
            pendinfErrCnt = 0;
            pendingErrKey = "";
          });
      } else {
        console.log("pendinfErrCnt=====================>", pendinfErrCnt);
      }
    }
  } else {
    // 최초 1회 DB에서 값을 가져와야 한다.
    sql.getLastIlAssem(con).then((result) => {
      if (result) {
        if (!result.err) {
          if (result.rows.length > 0) {
            // curIl = result.rows[0];
            curIl = {
              model: result.rows[0].model,
              exp1: result.rows[0].exp1,
              redu: result.rows[0].redu,
              oring1: result.rows[0].oring1,
              exp2: result.rows[0].exp2,
              nipple: result.rows[0].nipple,
              oring2: result.rows[0].oring2,
            };
            // console.log(curIl);
          } else {
            // Table Empty!
            console.log("Table il_assem is empty!");
            curIl = {
              model: 0,
              exp1: 0,
              redu: 0,
              oring1: 0,
              exp2: 0,
              nipple: 0,
              oring2: 0,
            };
          }
        } else {
          console.log(result.err);
        }
      }
    });
  }
}

export const statAssem = (connection: any, message: any, myEmitter: any) => {
  // con = connection;
  prodAssem(connection, message, myEmitter);
  ilAssem(connection, message, myEmitter);
};

export const initStatAssem = async (connection: any) => {
  sql.getLastProdAssem(connection).then((result) => {
    if (result) {
      if (!result.err) {
        if (result.rows.length > 0) {
          curProdCnt = result.rows[0].cnt;
        } else {
          // Table Empty!
          console.log("Table prod_assem is empty!");
          curProdCnt = 0;
        }
      } else {
        console.log(result.err);
      }
    }
  });

  sql.getLastIlAssem(connection).then((result) => {
    if (result) {
      if (!result.err) {
        if (result.rows.length > 0) {
          // curIl = result.rows[0];
          curIl = {
            model: result.rows[0].model,
            exp1: result.rows[0].exp1,
            redu: result.rows[0].redu,
            oring1: result.rows[0].oring1,
            exp2: result.rows[0].exp2,
            nipple: result.rows[0].nipple,
            oring2: result.rows[0].oring2,
          };
          // console.log("???????????????", curIl);
        } else {
          // Table Empty!
          console.log("Table il_assem is empty!");
          curIl = {
            model: 0,
            exp1: 0,
            redu: 0,
            oring1: 0,
            exp2: 0,
            nipple: 0,
            oring2: 0,
          };
        }
      } else {
        console.log(result.err);
      }
    }
  });
  let result: any = null;

  result = await sql.insertDayInit(connection, "prod_assem_day");
  if (result.err) {
    console.log("ERROR!!! insertDayInit() - prod_assem_day");
  }
  result = await sql.insertDayInit(connection, "il_assem_day");
  if (result.err) {
    console.log("ERROR!!! insertDayInit() - il_assem_day");
  }
};

//     model: 1200, // 생산모델
//     cnt: 0, // 금일 생산수량
//     exp1: 0, // NG 1-1 수량 (확관)
//     redu: 0, // NG 1-2 수량 (레듀샤)
//     oring1: 0, // NG 1-2 수량 (O-링)
//     exp2: 0, // NG 2-1 수량 (확관)
//     nipple: 0, // NG 2-1 수량 (니쁠)
//     oring2: 0, // NG 2-1 수량 (O-링)
const models = [700, 1000, 1200, 1500, 1800];
const history = [
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
  { cnt: 0, val: 0 },
];
const tempData: KeyAnyPair = comm.assemData();

/**
 * 자동 조립기는 모든 값이 1씩 증가하는 특징
 * 새로운 값이 과거 값보다 작으면 안됨(예외: 설비 재설정 등의 이유로 값이 초기화 되면 모든 값이 0으로 변경된다)
 * 새로운 값이 과거 값보다 너무 크면 안됨
 * @param rawData
 * @param oldData
 * @param newData
 * @param id
 * @returns
 */
const checkData = (rawData: any, oldData: any, newData: any, id: number) => {
  // 1000 이상의 값은 버린다.
  if (newData > 1000) {
    console.log("checkData(", id, ") - 1", "old:", oldData, "new:", newData);
    false;
  }

  if (oldData < newData) {
    // 새값이 이전값 보다 100 이상 크면 버린다.
    if (newData - oldData > 100) {
      console.log("checkData(", id, ") - 2", "old:", oldData, "new:", newData);
      return false;
    }
    history[id].cnt = 0;
    history[id].val = 0;
    return true;
  } else if (oldData > newData) {
    // 새로운 값이 더 작을 경우 0만 허용된다.
    let isAllZero = true;
    if (newData === 0) {
      // 단, 다른 값도 모두 0이여야 한다.
      Object.keys(rawData).forEach((key: string) => {
        if (key != "model_no") {
          if (rawData[key] != 0) {
            console.log("checkData(", id, ")", newData.toString());
            isAllZero = false;
          }
        }
      });
      return isAllZero;
    }

    // 새로들어온 작은 값을 저장한 후에 이후 계속(50회 정도?) 같은 값이 들어오면 적용한다
    if (history[id].val === newData) history[id].cnt = history[id].cnt + 1;
    else history[id].cnt = 0;

    if (history[id].cnt > 50) {
      history[id].cnt = 0;
      return true;
    }
    console.log("checkData(", id, ") - 4", "old:", oldData, "new:", newData);
    return false;
  } else {
    // 값이 같은 경우
    return true;
  }
};

export const chekcDataAssem = (rawData: any) => {
  // 값이 1개라도 이상하면 전체 데이터를 버린다.
  // TODO: => 데이터 수집이 너무 안될 경우 해당 값만 버리도록 수정
  if (rawData.model_no > 5 || rawData.model_no < 1) return null;
  tempData.data.model = models[rawData.model_no - 1];

  if (!checkData(rawData, tempData.data.cnt, rawData.prod, 0)) return null;
  tempData.data.cnt = rawData.prod;
  if (!checkData(rawData, tempData.data.exp1, rawData.ng1_1, 1)) return null;
  tempData.data.exp1 = rawData.ng1_1;
  if (!checkData(rawData, tempData.data.redu, rawData.ng1_2a, 2)) return null;
  tempData.data.redu = rawData.ng1_2a;
  if (!checkData(rawData, tempData.data.oring1, rawData.ng1_2b, 3)) return null;
  tempData.data.oring1 = rawData.ng1_2b;
  if (!checkData(rawData, tempData.data.exp2, rawData.ng2_1, 4)) return null;
  tempData.data.exp2 = rawData.ng2_1;
  if (!checkData(rawData, tempData.data.nipple, rawData.ng2_2a, 5)) return null;
  tempData.data.nipple = rawData.ng2_2a;
  if (!checkData(rawData, tempData.data.oring2, rawData.ng2_2b, 6)) return null;
  tempData.data.oring2 = rawData.ng2_2b;
  // console.log(tempData.toString());
  return tempData;
};
