/* eslint-disable no-undef */
const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://todolist-deploy-thwl.onrender.com/",
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  },
];

module.exports = PROXY_CONFIG;
