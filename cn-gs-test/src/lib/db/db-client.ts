import process from "process";
import * as db from "./db_action";
import * as sql from "./sql_action";

const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];

export const endConnection = () => {
  db.end();
};

export const connectDatabase = (myEmitter: any) => {
  db.connect(
    config.host,
    config.port,
    config.username,
    config.password,
    config.database,
    (rsc: any, con: any) => {
      console.log("Database Connection start!");
      if (rsc == "1") {
        db.getConnection((code: any, connection: any) => {
          if (code === "200") {
            // console.log("Connection", connection);
            connection.on("error", (err: any) => {
              console.log("PROTOCOL_CONNECTION_LOST", err);
              if (err.code === "PROTOCOL_CONNECTION_LOST") {
                setTimeout(() => {
                  connectDatabase(myEmitter);
                }, 5000);
              }
            });
            myEmitter.emit("dbConnected", connection);
            // callback(connection);
            //////////////////////////
            // sql.getShapeRef(connection).then((result) => {
            //   if (!result.err) {
            //     // console.log(result.rows);
            //   } else {
            //     // console.log(result.err);
            //   }
            // });
            //////////////////////////
          } else {
            console.log("[db.connect] No Connection");
            setTimeout(() => {
              connectDatabase(myEmitter);
            }, 5000);
          }
        });
      }
    }
  );
};

export const getConnection = () => {
  db.getConnection((code: any, connection: any) => {
    console.log("code:", code);
    if (code === "200") {
      return connection;
    } else {
      return null;
    }
  });
};
