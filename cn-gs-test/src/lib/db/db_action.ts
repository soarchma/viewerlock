import mysql from "mysql2";

let mysql_pool: any = null;
let promisePool: any = null;

//var _this = this;

let _host,
  _port,
  _user,
  _password,
  _database,
  _callback = undefined;

export const connect = function (
  host: any,
  port: any,
  user: any,
  password: any,
  database: any,
  callback: Function
) {
  mysql_pool = mysql.createPool({
    host: (_host = host),
    port: (_port = port),
    user: (_user = user),
    password: (_password = password),
    database: (_database = database),
    connectionLimit: 50,
    waitForConnections: true,
    debug: false,
    idleTimeout: 6000,
    queueLimit: 0,
  });
  _callback = callback;
  callback("1", mysql_pool);
};

export const end = () => {
  mysql_pool.end();
};

export const connectAsync = async (
  host: any,
  port: any,
  user: any,
  password: any,
  database: any
) => {
  mysql_pool = mysql.createPool({
    host: (_host = host),
    port: (_port = port),
    user: (_user = user),
    password: (_password = password),
    database: (_database = database),
    connectionLimit: 50,
    waitForConnections: true,
    debug: false,
    idleTimeout: 6000,
    queueLimit: 0,
  });
  return mysql_pool.promise();
};

export const getConnection = (callback: Function) => {
  if (mysql_pool == null) {
    console.error("mysql is not connected");
    callback(true, "mysql is not connected");
    return "0";
  }

  mysql_pool.getConnection((err: any, connection: any) => {
    if (err) {
      callback("500-5");
    } else {
      if (connection) {
        callback("200", connection);
      } else {
        callback("500-5");
      }
    }
  });
};

function executeQuery(
  pool: any,
  query: any,
  connection: any,
  callback: Function
) {
  console.log("query:", query);
  // pool.query(
  connection.query(
    { sql: query, timeout: 60000 },
    (err: any, rows: any, fields: any) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      console.log("result:", rows.length);
      return callback(null, rows);
    }
  );
}

export const getResult = (query: any, connection: any, callback: Function) => {
  if (mysql_pool == null) {
    console.error("mysql is not connected");
    return "0";
  }

  executeQuery(mysql_pool, query, connection, (err: any, rows: any) => {
    if (!err) {
      callback(null, rows);
    } else {
      callback(true, err);
    }
  });
};

async function executeQueryAsync(
  pool: any,
  query: any,
  connection: any
  // callback: Function
) {
  console.log("query:", query);
  return await connection.promise().query({ sql: query, timeout: 60000 });
}

export const getResultAsync = async (query: any, connection: any) => {
  if (mysql_pool == null) {
    console.error("mysql is not connected");
    // return "0";
    return { err: true, rows: null };
  }

  try {
    const [rows, fields] = await executeQueryAsync(
      mysql_pool,
      query,
      connection
    );
    // .catch((err) => {
    //   console.log("???????????????????????????????", err);
    //   return { err: err, rows: null };
    // });
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", rows);

    // if (rows.length) {
    //   console.log("result(async):", rows.length);
    // } else {
    //   console.log("result(async):", rows);
    // }
    return { err: null, rows: rows };
  } catch (err) {
    console.log(err);
    return { err: err, rows: null };
  }
};
