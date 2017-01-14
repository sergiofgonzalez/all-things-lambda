"use strict";

exports.handler = function (event, context, done) {
  console.log(`Request ID          : ${context.awsRequestId}`);
  console.log(`Log Group Name      : ${context.logGroupName}`);
  console.log(`Log Stream Name     : ${context.logStreamName}`);
  console.log(`Function Name       : ${context.functionName}`);
  console.log(`Function Version    : ${context.functionVersion}`);
  console.log(`Function ARN        : ${context.invokedFunctionArn}`);
  console.log(`Memory Limit (MB)   : ${context.memoryLimitInMB}`);
  console.log(`Remaining Time in ms: ${context.getRemainingTimeInMillis()}`);
  done(null, "See logs for info on context");
};
