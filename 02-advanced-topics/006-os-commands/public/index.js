"use strict";

exports.handler = function (event, context) {
  var spawn = require("child_process").spawn;
  var ls = spawn("ls", ["-lah"]);

  ls.stdout.on("data", function (byteBuffer) {
    console.log("stdout:", byteBuffer.toString("utf8"));
  });

  ls.stderr.on("data", function (byteBuffer) {
    console.log("stderr", byteBuffer.toString("utf8"));
  });

  ls.on("close", function (code) {
    console.log("child process exited with status code:", code);
    context.succeed();
  });
};
