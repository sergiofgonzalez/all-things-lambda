# All Things Lambda
> AWS Lambda functions using Node.js

## 001-hello-lambda
The simplest Lambda function. The implementation declares a handler that returns the message "Hello, world".

## 002-hello-lambda-with-console-messages
The simplest Lambda function with add `console.log` statements. Illustrates how `console.log` messages show up on *CloudWatch* logs and also how statements after `context.succeed` are also executed.

## 003-hello-lambda-event
Illustrates how to consume custom events from a Lambda function. In the example, the function expects an event including a `name` property, which will be returned by the `context.succeed` method.
