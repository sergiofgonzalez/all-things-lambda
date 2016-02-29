"use strict";

var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("DEBUG");


var CACHE = {
  nums: []
};


exports.handler = function (event, context) {
  logger.info("Before: ", JSON.stringify(CACHE));
  CACHE.nums.push(Math.floor(Math.random() * 10 + 1));
  logger.info("After: ", JSON.stringify(CACHE));

  context.succeed("success");
};
