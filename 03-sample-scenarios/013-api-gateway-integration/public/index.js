"use strict";

var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("DEBUG");

exports.handler = function (event, context) {

  logger.debug("Received event:", JSON.stringify(event));
  context.succeed({code: 0, data: "Hello there, " + event.query.name});
};
