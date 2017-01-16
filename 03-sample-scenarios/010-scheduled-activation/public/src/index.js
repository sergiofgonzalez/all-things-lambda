"use strict";

const zeptolog = require("./lib/zeptolog-node4");
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");



exports.handler = function (event, context, done) {
  const activationInstant = new Date();
  logger.info(`Lambda ${context.functionName} activated at ${activationInstant.toISOString()}`);
  done(null, `Lambda ${context.functionName} activated at ${activationInstant.toISOString()}`);
};
