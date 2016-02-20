"use strict";

var AWS = require("aws-sdk");
var lambda = new AWS.Lambda({region: "us-east-1"});

var params = {
  FunctionName: "003-hello-lambda-event",
  InvocationType: "Event",
  Payload: JSON.stringify({ name: "inma.b.balboa"})
};

lambda.invoke(params, function (err, results) {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Successfully invoked lambda function:", results);
  }
});
