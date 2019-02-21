const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const proxy = require("./webpack.proxy.settings");
const { entry, dist, root } = require("./paths");

const port = 8444;

module.exports = merge(common, {
  entry: {
    useBuiltIns: "@babel/polyfill",
    app: [
      `webpack-dev-server/client?http://localhost:${port}`,
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      "webpack/hot/only-dev-server",
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      entry,
    ],
  },
  output: {
    publicPath: "/",
  },
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
  devServer: {
    contentBase: [dist, root],
    historyApiFallback: true,
    overlay: true,
    hot: true,
    disableHostCheck: true,
    port,
    proxy,
  },
});
