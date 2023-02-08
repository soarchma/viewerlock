import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
// import { url, token, org } from "./env.mjs";

/** InfluxDB v2 URL */
// const url = process.env["INFLUX_URL"] || "http://localhost:8086";
const url = "http://localhost:8086";
/** InfluxDB authorization token */
// const token = process.env["INFLUX_TOKEN"] || "mytoken";
const token = "mytoken";
/** Organization within InfluxDB  */
// const org = process.env["INFLUX_ORG"] || "cn";
const org = "cn";
/**InfluxDB bucket used in examples  */
const bucket = "insert-leak";
// ONLY onboarding example
/**InfluxDB user  */
const username = "shbaek";
/**InfluxDB password  */
const password = "tmdghkqor0";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
// const fluxQuery1 =
//   'from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "temperature")'
// const fluxQuery1 =
//   'from(bucket: "insert_leak") |> range(start: -20d) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r._field == "data_leak1") |> limit(n:1)';
// const fluxQuery2 =
//   'from(bucket: "insert_leak") |> range(start: -20d) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r._field == "data_leak1") |> count()';

// There are more ways of how to receive results,
// the essential ones are shown in functions below.
// Execution of a particular function follows
// its definition, comment/uncomment it at will.
// See also rxjs-query.ts and queryWithParams.mjs .

// Execute query and receive table metadata and table row values using async iterator.
async function iterateRows() {
  console.log("*** IterateRows ***");
  console.time("test");
  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery1)) {
    // the following line creates an object for each row
    const o = tableMeta.toObject(values);
    // console.log(JSON.stringify(o, null, 2))
    console.timeEnd("test");
    console.log(
      `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    );

    // alternatively, you can get only a specific column value without
    // the need to create an object for every row
    // console.log(tableMeta.get(row, '_time'))
  }
  console.log("\nIterateRows SUCCESS");
}
// iterateRows().catch((error) => console.error("IterateRows ERROR", error));

// Execute query and receive table metadata and rows in a result observer.
function queryRows() {
  console.log("*** QueryRows ***");
  queryApi.queryRows(fluxQuery1, {
    next: (row: string[], tableMeta: FluxTableMetaData) => {
      // the following line creates an object for each row
      const o = tableMeta.toObject(row);
      // console.log(JSON.stringify(o, null, 2))
      console.log(
        `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
      );

      // alternatively, you can get only a specific column value without
      // the need to create an object for every row
      // console.log(tableMeta.get(row, '_time'))
    },
    error: (error: Error) => {
      console.error(error);
      console.log("\nQueryRows ERROR");
    },
    complete: () => {
      console.log("\nQueryRows SUCCESS");
    },
  });
}
// queryRows();

// Execute query and collect result rows in a Promise.
// Use with caution, it copies the whole stream of results into memory.

const fluxQuery1 =
  'from(bucket: "insert_leak") \
    |> range(start: -20d) \
    |> filter(fn: (r) => r._measurement == "mqtt_consumer") \
    |> filter(fn: (r) => r._field == "data_leak1") \
    |> limit(n:1)';
const fluxQuery2 =
  'from(bucket: "insert_leak") \
    |> range(start: -20d) \
    |> filter(fn: (r) => r._measurement == "mqtt_consumer") \
    |> filter(fn: (r) => r._field == "data_leak1") \
    |> count()';

async function collectCount() {
  const data = await queryApi.collectRows(fluxQuery2);
  data.forEach((x: any) => {
    console.log("Data total ===> ", "field:", x._field, "value:", x._value);
  });
}
collectCount().catch((error) => console.error("CollectRows ERROR", error));

let count = 0;
let start = 0;
let end = 0;
let sum = 0;
let avg = 0;
async function collectRows() {
  start = Date.now();
  // console.time("Duration");
  const data = await queryApi.collectRows(fluxQuery1);
  end = Date.now();
  // console.log(end - start);
  sum = sum + (end - start);
  ++count;
  avg = sum / count;
  console.log("Duration:", end - start, "ms, ", "Average:", avg, "ms");
  // console.timeEnd("Duration");
  data.forEach((x: any) => {
    console.log(
      "Count: ",
      count,
      "===> time:",
      x._time,
      "filed:",
      x._field,
      "value:",
      x._value
    );
  });
}

setInterval(() => {
  collectRows().catch((error) => console.error("CollectRows ERROR", error));
}, 1000);

// Execute query and return the whole result as a string.
// Use with caution, it copies the whole stream of results into memory.
async function queryRaw() {
  const result = await queryApi.queryRaw(fluxQuery1);
  console.log(result);
  console.log("\nQueryRaw SUCCESS");
}
// queryRaw().catch((error) => console.error("QueryRaw ERROR", error));

// Execute query and receive result CSV lines in an observer
function queryLines() {
  queryApi.queryLines(fluxQuery1, {
    next: (line: string) => {
      console.log(line);
    },
    error: (error: Error) => {
      console.error(error);
      console.log("\nQueryLines ERROR");
    },
    complete: () => {
      console.log("\nQueryLines SUCCESS");
    },
  });
}
// queryLines();

// Execute query and receive result csv lines using async iterable
async function iterateLines() {
  for await (const line of queryApi.iterateLines(fluxQuery1)) {
    console.log(line);
  }
  console.log("\nIterateLines SUCCESS");
}
// iterateLines().catch((error) => console.error("\nIterateLines ERROR", error));
