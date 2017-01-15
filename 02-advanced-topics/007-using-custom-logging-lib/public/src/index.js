"use strict";

var zeptolog = require("./lib/zeptolog-node4");
var logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");


exports.handler = function (event, context, done) {
  logger.debug(`Received invocation for function ${context.functionName}`);
  logger.debug(`event=${event}`);

  // Assuming LOG_LEVEL = INFO

  /* simple argument with correct logging level */
  logger.info("Hello, zeptolog");

  /* several arguments with correct logging level */
  logger.info("Hello", "world", "again");

  /* using template strings should be the correct way now */
  let var1 = "hello";
  let var2 = "sergio";
  let var3 = "adri";
  logger.info(`template: ${var1} - ${var2} - ${var3}`);

  /* this should not be printed */
  logger.debug(`logging levels not working!`);

  /* but this should be working */
  logger.warn(`warn: ${var1} - ${var2} - ${var3}`);
  logger.error("Error in ", var1);

  done();
};
