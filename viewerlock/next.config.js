const path = require("path");
const WorkerPlugin = require("worker-plugin");
// const { merge } = require("webpack-merge");

module.exports = {
  reactStrictMode: false,
  async rewrites() {
    console.log("Rewrites called");
    return [
      {
        source: "/customers",
        destination: "/",
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (isServer) {
      // return merge(config, {
      //   entry() {
      //     return config.entry().then((entry) => {
      //       return Object.assign({}, entry, {
      //         "test.worker": path.resolve(process.cwd(), "src/workers/test.worker.ts"),
      //       });
      //     });
      //   },
      // });
      config.output.globalObject = "this";
      return {
        ...config,
        entry() {
          return config.entry().then((entry) => ({
            ...entry,
            // adding custom entry points
            "test-worker": path.resolve(process.cwd(), "src/workers/test.worker.js"),
            // run: path.resolve(process.cwd(), 'src/run.js'),
          }));
        },
      };
    } else {
      // config.plugins.push(
      //   new WorkerPlugin({
      //     globalObject: "self",
      //   })
      // );
      return config;
    }
  },
};
