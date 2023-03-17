//

const connet = () => {
  console.log("worker.js ===> Websocket connet()");
  // const fileReader = new FileReader();
  // let _ws = new WebSocket("ws://host.docker.internal:8070"); // real server
  let _ws = new WebSocket("ws://localhost:8070"); // test server

  _ws.onclose = (ev) => {
    console.log("worker - onclose", ev);
  };
  _ws.onerror = (ev) => {
    console.log("worker - onerror", ev);
  };
  _ws.onmessage = (ev) => {
    // console.log("onmessage...", ev.data);
    const obj = JSON.parse(ev.data);
    console.log("worker - onmessage...", obj);
    // if (listenEvents.indexOf(obj.type) >= 0) {
    //   myEmitter.emit(obj.type, ev.data);
    // }
  };
  _ws.onopen = (ev) => {
    console.log("worker - onopen", ev);
  };

  return _ws;
};

const disConnet = (ws) => {
  console.log("worker.js ===> Websocket disConnet()", ws);
  if (ws) {
    ws.close();
  }
};

// 새로고침 시 초기화 됨.
let testCnt = 0;

addEventListener("message", (event) => {
  console.log("This is test worker", event.data);
  if (event.data && event.data.type) {
    if (event.data.type === "wsConnect") {
      console.log("----- wsConnect");
    } else if (event.data.type === "wsDisconnect") {
      console.log("----- wsDisconnect");
    }
  }
  postMessage({
    type: "test",
    data: ++testCnt,
  });
  /**
   */
});
