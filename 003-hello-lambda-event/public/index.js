"use strict";

exports.handler = function (event, context) {
  event.name = event.name || "unknown Lambda tester";
  context.succeed("Hello, " + event.name + "!!!");
};
