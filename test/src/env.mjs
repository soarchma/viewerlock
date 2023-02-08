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

export { url, token, org, bucket, username, password };
