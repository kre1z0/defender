const EVERPOINT_SERVER = "https://msp.everpoint.ru";

module.exports = {
  "/api": {
    target: EVERPOINT_SERVER,
    changeOrigin: true,
    autoRewrite: true,
    secure: false,
  },
  "/auth": {
    target: EVERPOINT_SERVER,
    changeOrigin: true,
    autoRewrite: true,
    secure: false,
  },
  "/static": {
    target: EVERPOINT_SERVER,
    changeOrigin: true,
    autoRewrite: true,
    secure: false,
  },
};
