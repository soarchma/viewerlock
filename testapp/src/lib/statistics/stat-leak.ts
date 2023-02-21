import type { KeyAnyPair } from "../interface";
import * as sql from "../db/sql_action";
import * as comm from "../common";

const leakData: KeyAnyPair = comm.leakData();
const maxCapCnt: number = 220; // 8시간 기준 하루 최대 가동 회수
// let
let ilLeak: any = {};
// let
let testStart: boolean = false;

function testLeak(con: any, msg: any, myEmitter: any) {
  if (ilLeak.err1 != undefined) {
    if (msg.active) {
      testStart = msg.active;
    } else {
      if (testStart != msg.active) {
        // 에러 카운팅
        let errOccur = false;
        for (let i = 0; i < msg.update.length; i++) {
          const key = msg.update[i].replace("leak", "err");
          // console.log(msg.update[i], key, ilLeak[key]);
          ilLeak[key] = ilLeak[key] + 1;
          errOccur = true;
        }
        sql
          .insertTestLeak(
            con,
            ilLeak.err1,
            ilLeak.err2,
            ilLeak.err3,
            ilLeak.err4,
            ilLeak.err5,
            ilLeak.err6
          )
          .then((result) => {
            if (result) {
              if (!result.err) {
                // console.log(result.rows[0]);
                // TODO:FIXME: maxCapCnt
                myEmitter.emit("myStats", "newProd", "leak", null);
                if (errOccur) {
                  myEmitter.emit("myStats", "newIl", "leak", null);
                }
              } else {
                console.log(result.err);
              }
            }
          });

        testStart = msg.active;
      }
    }
    // Object.keys(ilLeak).forEach((key: string) => {
    // });
  } else {
    // 최초 1회 DB에서 값을 가져와야 한다.
    sql.getLastTestLeak(con).then((result) => {
      if (result) {
        if (!result.err) {
          if (result.rows.length > 0) {
            // curProdCnt = result.rows[0].cnt;
            ilLeak = JSON.parse(JSON.stringify(result.rows[0]));
            // console.log(ilLeak);
          } else {
            // Table Empty!
            console.log("Table test_leak is empty!");
            ilLeak.err1 = 0;
            ilLeak.err2 = 0;
            ilLeak.err3 = 0;
            ilLeak.err4 = 0;
            ilLeak.err5 = 0;
            ilLeak.err6 = 0;
          }
        } else {
          console.log(result.err);
        }
      }
    });
  }
}

export const statLeak = (connection: any, message: any, myEmitter: any) => {
  // if (ilLeak.err1 != undefined) {
  // }

  // if (message.active) {
  //   testStart = message.active;
  // } else {
  //   if (testStart != message.active) {
  //   }
  // }
  testLeak(connection, message, myEmitter);
};

export const initStatLeak = async (connection: any) => {
  let result: any = null;
  result = await sql.getLastTestLeak(connection);
  if (!result.err) {
    // console.log("getLastTestLeak", result.rows);
    if (result.rows.length > 0) {
      ilLeak = JSON.parse(JSON.stringify(result.rows[0]));
    } else {
      // Table Empty!
      console.log("Table test_leak is empty!!!!!!!!!!!!");
      ilLeak.err1 = 0;
      ilLeak.err2 = 0;
      ilLeak.err3 = 0;
      ilLeak.err4 = 0;
      ilLeak.err5 = 0;
      ilLeak.err6 = 0;
    }
  }

  result = await sql.getTodayLeakCnt(connection);
  if (!result.err) {
    console.log("금일 작업량", result.rows[0].leak_count);
  }

  result = await sql.insertDayInit(connection, "test_leak_day");
  if (result.err) {
    console.log("ERROR!!! insertDayInit() - test_leak_day");
  }
};
