function createState() {
  let cnt = 0;
  const state: { [key: string]: number } = {
    ready: cnt++,
    starting: cnt++,
    readyToGather: cnt++,
    gathering: cnt++,
    readyToEnd: cnt++,
    ending: cnt++,
  };
  return state;
}

const leakState = createState();

// console.log(leakState);

// function setTimeout(arg0: () => void, arg1: number) {
//   throw new Error("Function not implemented.");
// }

let curState: number = leakState.ready;

setInterval(() => {
  if (curState === leakState.ready) {
    // if(500 이상) {
    curState = leakState.starting;
    console.log("Starting!");
    setTimeout(() => {
      curState = leakState.readyToGather;
      console.log("Ready to gather!");
    }, 1000);
    // }
  } else if (curState === leakState.readyToGather) {
    console.log("Gathering!");
    curState = leakState.gathering;
    setTimeout(() => {
      curState = leakState.readyToEnd;
      console.log("Ready to end!");
    }, 1000 * 5);
  } else if (curState === leakState.readyToEnd) {
    console.log("Ending!");
    curState = leakState.ending;
    setTimeout(() => {
      curState = leakState.ready;
      console.log("Ready!");
    }, 1000 * 5);
  }
}, 1000);
