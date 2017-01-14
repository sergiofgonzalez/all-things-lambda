# All Things Lambda &mdash; Introduction to Lambda
> The basics of AWS Lambda

## 001-hello-lambda
The simplest Lambda function. The implementation declares a handler that returns the message "Hello, world".

## 002-hello-lambda-with-console-messages
The simplest Lambda function with extra `console.log` statements for debugging purposes. Illustrates how `console.log` messages show up on *CloudWatch* logs and also that statements after the `callback(err, results)` are also executed.

## 003-hello-lambda-event
Illustrates how to access custom events from a Lambda function. In the example, the function expects an event including a `username` property, which will be used in the results part of the Lambda's callback.

## 004-invoking-lambda-from-node
Illustrates how to invoke lambda functions from a *Node.js* application using the `aws-sdk`, as well as the different invocation modes.
