"use strict";

var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("INFO");

exports.handler = function (event, context) {
  logger.debug("Received event: " + event);

  logger.info("Returning without nothing else to do from:", context.functionName);
  context.succeed();
};
