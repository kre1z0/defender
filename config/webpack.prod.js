const merge = require("webpack-merge");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const { entry, dist, root } = require("./paths");

module.exports = merge(common, {
  entry: {
    useBuiltIns: "@babel/polyfill",
    app: [entry]
  },
  output: {
    publicPath: "./feb23"
  },
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin([dist], { root })]
});
