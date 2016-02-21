"use strict";

var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("INFO");


exports.handler = function (event, context) {

  logger.info("Lambda activated at " + new Date());

  context.succeed("Lambda activated:" + new Date());

};
