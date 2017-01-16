"use strict";

const zeptolog = require("./lib/zeptolog-node4");
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");


exports.handler = function (event, context, done) {
  logger.debug(`Received invocation for function ${context.functionName}`);
  logger.debug(`event=${event}`);


  done(null, "finished!");
};