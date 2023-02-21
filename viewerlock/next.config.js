// const path = require("path");
// const WorkerPlugin = require("worker-plugin");
// const { merge } = require("webpack-merge");

module.exports = {
  reactStrictMode: false,

  async redirects() {
    console.log("redirects called");
    return [
      {
        source: "/eqpt-shape",
        destination: "/",
        permanent: true,
      },
      {
        source: "/eqpt-leak",
        destination: "/",
        permanent: true,
      },
      {
        source: "/eqpt-assemble",
        destination: "/",
        permanent: true,
      },
      {
        source: "/system",
        destination: "/",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/",
        permanent: true,
      },
    ];
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
  //   if (isServer) {
  //     // return merge(config, {
  //     //   entry() {
  //     //     return config.entry().then((entry) => {
  //     //       return Object.assign({}, entry, {
  //     //         "test.worker": path.resolve(process.cwd(), "src/workers/test.worker.ts"),
  //     //       });
  //     //     });
  //     //   },
  //     // });
  //     config.output.globalObject = "this";
  //     return {
  //       ...config,
  //       entry() {
  //         return config.entry().then((entry) => ({
  //           ...entry,
  //           // adding custom entry points
  //           "test-worker": path.resolve(process.cwd(), "src/workers/test.worker.js"),
  //           // run: path.resolve(process.cwd(), 'src/run.js'),
  //         }));
  //       },
  //     };
  //   } else {
  //     // config.plugins.push(
  //     //   new WorkerPlugin({
  //     //     globalObject: "self",
  //     //   })
  //     // );
  //     return config;
  //   }
  // },
};
