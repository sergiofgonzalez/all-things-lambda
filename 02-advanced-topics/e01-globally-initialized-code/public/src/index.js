"use strict";

const zeptolog = require("./lib/zeptolog-node4");
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");

const CACHE = {
  nums: []
};

exports.handler = function (event, context, done) {
  logger.debug(`Before: ${JSON.stringify(CACHE)}`);
  CACHE.nums.push(CACHE.nums.length);
  logger.debug(`After : ${JSON.stringify(CACHE)}`);  

  done();
};
