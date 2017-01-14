"use strict";

const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({region: "us-east-1"});


/*
    Invocation Mode 1: fire & forget
*/
const paramsEvent = {
  FunctionName: "003-hello-lambda-event",
  InvocationType: "Event",
  Payload: JSON.stringify({username: "inma.b.balboa"})
};
lambda.invoke(paramsEvent, (err, results) => {
  if (err) {
    console.log(`Error invoking lambda function ${paramsEvent.FunctionName}: ${err}`);
    throw err;
  }
  console.log(`Lambda function ${paramsEvent.FunctionName} successfully invoked`);
  printObjProps(results);
});

/*
    Invocation Mode 2: Expect result from Lambda function
*/
const paramsRequestResponse = {
  FunctionName: "003-hello-lambda-event",
  InvocationType: "RequestResponse",
  Payload: JSON.stringify({username: "inma.b.balboa"})
};
lambda.invoke(paramsRequestResponse, (err, results) => {
  if (err) {
    console.log(`Error invoking lambda function ${paramsRequestResponse.FunctionName}: ${err}`);
    throw err;
  }
  console.log(`Lambda function ${paramsRequestResponse.FunctionName} successfully invoked`);
  printObjProps(results);
});

function printObjProps(obj) {
  for (let prop in obj) {
    console.log(`${prop}=${obj[prop]}`);
  }
}