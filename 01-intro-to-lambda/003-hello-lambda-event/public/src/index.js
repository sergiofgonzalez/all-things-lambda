"use strict";


exports.handler = function (event, context, done) {
  const testerUsername = event.username || `unknown tester name`;
  console.log(`username=${testerUsername}`);
  done(null, {message:`Hello, ${testerUsername}`});
};
