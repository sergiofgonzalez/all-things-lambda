"use strict";

exports.handler = function (event, context) {
  event.name = event.name || "unknown Lambda tester";

  console.log("About to succeed with event.name:", event.name);
  context.succeed("Hello, " + event.name + "!!!");
};
