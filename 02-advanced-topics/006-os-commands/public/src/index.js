"use strict";

const spawn = require("child_process").spawn;



exports.handler = function (event, context, done) {
  const ls = spawn("ls", ["-lah"]);

  ls.stdout.on("data", data => console.log(`stdout: ${data.toString()}`));
  ls.stderr.on("data", data => console.log(`stdout: ${data.toString()}`));
  ls.on("close", code => {
    console.log(`child process exited with status code: ${code}`);
    done();
  });
};
