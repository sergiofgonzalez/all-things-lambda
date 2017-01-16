"use strict";

const zeptolog = require("../../build/lib/zeptolog-node4");
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");

const lambdaFn = require("../../build/index.js");

const context = {
  functionName: "008-testing-lambdas-locally (test)",
  awsRequestId: "test",
  logGroupName: "test-log-group-name",
  logStreamName: "test-log-stream-name",
  memoryLimitInMB: "test",
  getRemainingTimeInMillis: function () { return "test";}
};

const event = {
  key1: "value1",
  key2: "value2",
  key3: "value3"
};

const lambdaCallback = (err, results) => {
  if (err) {
    logger.error(`Error returned by the lambda ${context.functionName}: ${err}`);
    return;
  }
  logger.info(`Lambda ${context.functionName} finished successfully; results=${results}`);
};

lambdaFn.handler(event, context, lambdaCallback);