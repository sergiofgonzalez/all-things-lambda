"use strict";


exports.handler = function (event, context, done) {
  const testerUsername = event.username || `unknown tester name`;

  done(null, `Hello, ${testerUsername}`);
};
