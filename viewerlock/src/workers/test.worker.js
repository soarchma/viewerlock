// const paymentId = process.argv[2];

// console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQssQQ");
// (async () => {
//   console.log("aaaaaaaaaaaaaaaaaaaaaaaa", process.argv);
// })();

let intervalId = undefined;

function start() {
  intervalId = setInterval(() => process.send("hahahaha"), 1000);
  console.log(intervalId);
  process.send("start");
  setTimeout(() => clearInterval(intervalId), 10000);
}

function stop() {
  console.log(intervalId);
  clearInterval(intervalId);
  process.send("stop");
}

const noop = () => {
  try {
    process.on("message", (message) => {
      console.log("wwwwwwwwwwwwwwwwwwwwwww");
      if (message === "start") {
        start();
      } else if (message === "stop") {
        stop();
      }
    });
    console.log("wwwwwwwwwwwwwadw34ww1wwww");
  } catch (e) {
    console.error(e);
  }

  // setInterval(() => console.log("hahahaha"), 1000);
};

noop();

// export default noop;
