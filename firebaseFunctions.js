const { join } = require("path");
const { https, logger } = require("firebase-functions");
const { default: next } = require("next");

const nextjsDistDir = join("./", require("./next.config.js").distDir);

logger.info("Using nextjs dir " + nextjsDistDir);

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
