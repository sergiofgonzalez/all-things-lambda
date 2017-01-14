"use strict";

/*
  exports:
    The method associated to exports (in this case `handler`), is the one will be
    called by Lambda when the function is activated .
    It does not have to be called `handler`, but it's the recommended practice.

  function (event, context):
    Then method received two args.
    `event` is the object that contains details
    about the executing event (for example, when it is S3 related you will find
    the bucket and the key).
    `context` contains internal information about the function itself, as well
    as the methods for ending the function (`succeed`).
    The argument passed to `succeed` will be returned to the invoker.
*/
exports.handler = function (event, context, done) {
  done(null, `Hello, world!`);
};
