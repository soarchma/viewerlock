/** InfluxDB v2 URL */
const url = process.env["INFLUX_URL"] || "http://localhost:8086";
/** InfluxDB authorization token */
const token = process.env["INFLUX_TOKEN"] || "mytoken";
/** Organization within InfluxDB  */
const org = process.env["INFLUX_ORG"] || "cn";
/**InfluxDB bucket used in examples  */
const bucket = "insert-leak";
// ONLY onboarding example
/**InfluxDB user  */
const username = "shbaek";
/**InfluxDB password  */
const password = "tmdghkqor0";

export const db_username = "root";
export const db_password = "root";
export const db_database = "viewerlock";
export const db_host = "127.0.0.1";
export const db_port = "3306";
export const db_dialect = "mysql";

export { url, token, org, bucket, username, password };
