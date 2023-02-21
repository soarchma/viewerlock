import process from "process";
import * as db from "./lib/db/db_action";
import * as sql from "./lib/db/sql_action";

const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

function connect() {
  db.connect(
    config.host,
    config.port,
    config.username,
    config.password,
    config.database,
    (rsc: any) => {
      if (rsc == "1") {
        db.getConnection((code: any, connection: any) => {
          if (code === "200") {
            connection.on("error", (err: any) => {
              console.log("PROTOCOL_CONNECTION_LOST", err);
              if (err.code === "PROTOCOL_CONNECTION_LOST") {
                setTimeout(() => {
                  connect();
                }, 5000);
              }
            });
            //////////////////////////
            sql.getShapeRef(connection).then((result) => {
              if (!result.err) {
                // console.log(result.rows);
              } else {
                // console.log(result.err);
              }
            });
            //////////////////////////
          } else {
            console.log("[db.connect] No Connection");
            setTimeout(() => {
              connect();
            }, 5000);
          }
        });
      }
    }
  );
}
connect();
