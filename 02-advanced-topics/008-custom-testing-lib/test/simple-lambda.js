"use strict";

var event = {
  name: "Adrian F. Bermejo"
};

var context = {
  succeed: function (event) {
    console.log("Success");
    console.log(JSON.stringify(event, null, 2));
  },
  fail: function (event) {
    console.log("Fail");
    console.log(JSON.stringify(event, null, 2));
  },
  done: function (event) {
    console.log(JSON.stringify(event, null, 2));
  }
};

var lambdaFunction = require("../public/index.js");
lambdaFunction.handler(event, context);
