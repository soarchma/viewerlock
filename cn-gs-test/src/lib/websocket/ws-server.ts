import WebSocket, { WebSocketServer } from "ws";

export const createWsServer = (
  mqttClient: any,
  myEmitter: any,
  topics: any
) => {
  console.log("Web Socket Server start!");
  const wss = new WebSocketServer({
    port: 8070,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024, // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
    },
  });

  wss.on("connection", (ws: any) => {
    const testmsgHandler = (type: string, msg: any) => {
      // console.log("testmsgHandler() -> dbRes:", type, msg);
      // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
      console.log("MAKE ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    };

    const statHandler = (type: string, unit: string, data: any) => {
      // console.log("testmsgHandler() -> dbRes:", type, msg);
      // TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:TODO:FIXME:
      // console.log("MAKE ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", type, msg);
      // if (type === "assem") {
      //   ws.send(JSON.stringify(msg));
      // } else if (type === "shape") {
      //   ws.send(JSON.stringify(msg));
      // }
      const msg = {
        type,
        unit,
        data,
      };
      ws.send(JSON.stringify(msg));
    };

    const mqttMsgHandler = (topic: string, msg: any) => {
      // console.log(topic, msg.toString());
      // 실시간 데이터는 리크측정기만 보낸다.
      // TODO:FIXME: 대신 ws 접속시 현재 값을 보내거나 웹서버에서 처리해야 한다.
      // if (topic === topics.leak) {
      // }
      ws.send(JSON.stringify(msg));
    };

    console.log("connection");

    myEmitter.on("dbRes", testmsgHandler);
    myEmitter.on("myStats", statHandler);
    myEmitter.on("mqttMsg", mqttMsgHandler);

    myEmitter.emit("dbReq", "getShapeRef");
    myEmitter.emit("myStats", "newProd", "init", null);
    myEmitter.emit("myStats", "newIl", "init", null);

    ws.on("message", (data: any) => {
      console.log("received: %s", data);
    });
    ws.on("close", (code: any, reason: any) => {
      console.log("close", code, reason);
      myEmitter.removeListener("dbRes", testmsgHandler);
      myEmitter.removeListener("myStats", statHandler);
      myEmitter.removeListener("mqttMsg", mqttMsgHandler);
    });
    // if (mqttClient) {
    //   mqttClient.on("message", (topic: string, message: any) => {
    //     // message is Buffer
    //     // console.log(topic, message.toString());
    //     // 실시간 데이터는 리크측정기만 보낸다.
    //     // TODO:FIXME: 대신 ws 접속시 현재 값을 보내거나 웹서버에서 처리해야 한다.
    //     if (topic === topics.leak) {
    //       ws.send(message.toString());
    //     }
    //   });
    // }
  });

  return wss;
};
