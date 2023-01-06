import { NextApiRequest, NextApiResponse } from "next";
import { fork } from "child_process";
import path from "path";
import fs from "fs";

let isRun = false;
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const paymentId = req.body.paymentId as string;
    // const testWorker = fork("./.next/server/test-worker.js", ["1"], { cwd: process.cwd() });
    const testWorker = fork("./.next/server/test-worker.js");
    if (!isRun) {
      testWorker.send("start");
      isRun = true;
    } else {
      testWorker.send("stop");
      isRun = false;
    }
    testWorker.on("message", (msg) => {
      console.log("msg:", msg);
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ test: "test500" });
  }

  res.status(200).json({ test: "test200" });
}

export default handler;
