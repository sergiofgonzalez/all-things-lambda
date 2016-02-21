"use strict";


exports.handler = function (event, context) {
  console.log("Received event:", event);
  context.succeed(["Hello, " + event.name, "another thing"]);
};
