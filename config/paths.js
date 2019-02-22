const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: resolve("../src/index.js"),
  template: resolve("../src/index.html"),
  src: resolve("../src"),
  dist: resolve("../dist"),
  root: resolve("../"),
  public: resolve("../public"),
  nodeModules: resolve("../node_modules"),
  packageFile: resolve("../package.json"),
  packageLockFile: resolve("../package-lock.json"),
  staticPath: "feb23/static",

  evergis: resolve("../node_modules/@evergis/sp-api/source"),
  sgis: resolve("../node_modules/@evergis/sgis/source")
};
