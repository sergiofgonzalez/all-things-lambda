"use strict";

/*
  exports:
    The method associated to exports (in this case `handler`), is the one will be
    called by Lambda when the function is activated .
    It does not have to be called `handler`, but it's the recommended practice.

  function (event, context, callback):
    The method receives three args.
    + `event` is the object that contains details
    about the executing event (for example, when it is S3 related you will find
    the bucket and the key).
    + `context` contains internal information about the function itself, execution 
    time, etc.
    + `callback` standard Node.js callback param used to return information to the caller (optional)

*/
exports.handler = function (event, context, done) {
  console.log(`Executing lambda function with context=${context}`);
  done(null, `Hello, world!`);
};
