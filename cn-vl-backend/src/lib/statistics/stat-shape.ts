import type { KeyAnyPair } from "../interface";
import * as sql from "../db/sql_action";
import * as comm from "../common";

const shapeData: KeyAnyPair = comm.shapeData();
// const shapeRefs: any = comm.shapeRefs();
const rawData = {
  intuition1: "",
  intuition2: "",
  modeling1: "",
  modeling2: "",
  cut1: "",
  cut2: "",
  production: "",
  setting_model: "",
};

let curProdCnt: number = -1;
let curErrProdCnt: number = -1;
let shapeRef: any = [];
let pendinfCnt: number = -1;
let pendinfErrCnt: number = -1;

// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
//
// DB insert 시 DB 응답이 늦게 오는 경우 중복된 값이 insert되는 문제
//
// TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:

// let con: any = null;
function prodShape(con: any, msg: any, myEmitter: any) {
  if (shapeData.data.beeline1 === 0) console.log("BBBBBBBBBB", shapeData);
  if (curProdCnt >= 0) {
    if (curProdCnt != msg.data.cnt && msg.data.cnt != 0) {
      if (pendinfCnt != msg.data.cnt) {
        // console.log(shapeData.KILL[0]);
        pendinfCnt = msg.data.cnt;
        sql
          .insertProdShape(con, msg.data.model, msg.data.cnt)
          .then((result) => {
            if (result) {
              if (!result.err) {
                // console.log(result.rows[0].cnt);
                curProdCnt = msg.data.cnt;
                shapeData.update = [];
                shapeData.data = msg.data;
                // console.log(msg);
                myEmitter.emit("myStats", "newProd", shapeData.type, shapeData);
              } else {
                console.log(result.err);
              }
              pendinfCnt = -1;
            }
          });
      } else {
        console.log("pendinfCnt---------------------->", pendinfCnt);
      }
    }
  } else {
    // 최초 1회 DB에서 값을 가져와야 한다.
    sql.getLastProdShape(con).then((result) => {
      if (result) {
        if (!result.err) {
          if (result.rows.length > 0) {
            curProdCnt = result.rows[0].cnt;
          } else {
            // Table Empty!
            console.log("Table prod_shape is empty!");
            curProdCnt = 0;
          }
        } else {
          console.log(result.err);
        }
      }
    });
  }
}

/**
 * MQTT sub 시 마다 호출되는 함수.
 * 미스매치 되는 값이 있더라도 prodCnt가 변하지 않으면 인터락으로 판단하지 않는다.
 */
function ilShape(con: any, msg: any, myEmitter: any) {
  let diff: boolean = false;
  let ref: any = {};
  const temp: KeyAnyPair = JSON.parse(JSON.stringify(msg));
  // 기준 데이타가 있을 경우에만 진행
  if (shapeRef.length) {
    for (let i = 0; i < shapeRef.length; i++) {
      if (shapeRef[i].model === temp.data.model) {
        ref = shapeRef[i];
        break;
      }
    }

    if (ref.model) {
      if (curErrProdCnt >= 0) {
        if (curErrProdCnt != temp.data.cnt && temp.data.cnt != 0) {
          Object.keys(temp.data).forEach((key: string) => {
            if (ref[key] && temp.data[key] != ref[key]) {
              diff = true;
              // console.log(temp.data[key], ref[key]);
            } else {
              // 기준 데이터와 같은 경우 0으로 치환 - 왜?
              // if (key != "model" && key != "cnt") temp.data[key] = 0;
            }
          });
          if (diff) {
            if (pendinfErrCnt != temp.data.cnt) {
              pendinfErrCnt = temp.data.cnt;
              sql
                .insertIlShape(
                  con,
                  temp.data.model,
                  temp.data.cnt,
                  temp.data.beeline1,
                  temp.data.beeline2,
                  temp.data.shape1,
                  temp.data.shape2,
                  temp.data.cut1,
                  temp.data.cut2
                )
                .then((result) => {
                  if (result) {
                    if (!result.err) {
                      // console.log(result.rows[0].cnt);
                      curErrProdCnt = temp.data.cnt;
                      // curProdCnt = temp.data.cnt;
                      shapeData.update = [];
                      // shapeData.data = temp.data;
                      myEmitter.emit(
                        "myStats",
                        "newIl",
                        shapeData.type,
                        shapeData
                      );
                    } else {
                      console.log(result.err);
                    }
                  }
                  pendinfErrCnt = -1;
                });
            } else {
              console.log("pendinfErrCnt=====================>", pendinfErrCnt);
            }
          }
        }
      } else {
        // 최초 1회 DB에서 값을 가져와야 한다.
        sql.getLastIlShape(con).then((result) => {
          if (result) {
            if (!result.err) {
              if (result.rows.length > 0) {
                curErrProdCnt = result.rows[0].cnt;
              } else {
                // Table Empty!
                console.log("Table il_assem is empty!");
                curErrProdCnt = 0;
              }
            } else {
              console.log(result.err);
            }
          }
        });
      }
    }
  }
}

export const setShapeRef = (ref: any) => {
  shapeRef = ref;
};

export const statShape = (connection: any, message: any, myEmitter: any) => {
  prodShape(connection, message, myEmitter);
  ilShape(connection, message, myEmitter);
};

export const initStatShape = async (connection: any) => {
  // let result1 = await sql.getLastTestLeak(connection);
  // console.log(result1);
  // let result2 = await sql.getTodayLeakCnt(connection);
  // console.log(result2);
  let result: any = null;

  result = await sql.insertDayInit(connection, "prod_shape_day");
  if (result.err) {
    console.log("ERROR!!! insertDayInit() - prod_shape_day");
  }
  result = await sql.insertDayInit(connection, "il_shape_day");
  if (result.err) {
    console.log("ERROR!!! insertDayInit() - il_shape_day");
  }
};

const tempData: KeyAnyPair = comm.shapeData();

export const chekcDataShape = (rawData: any) => {
  let isError: boolean = false;

  // 너무 큰 숫자 버림
  Object.keys(rawData).forEach((key: string) => {
    if (rawData[key] > 50000) isError = true;
  });

  // TODO: 이전값 보다 작은값 대응

  if (!isError) {
    tempData.data.model = rawData.setting_model;
    tempData.data.cnt = rawData.production;
    tempData.data.beeline1 = rawData.intuition1;
    tempData.data.beeline2 = rawData.intuition2;
    tempData.data.shape1 = rawData.modeling1;
    tempData.data.shape2 = rawData.modeling2;
    tempData.data.cut1 = rawData.cut1;
    tempData.data.cut2 = rawData.cut2;
    return tempData;
  } else return null;
};
