# All Things Lambda &mdash; 004-invoking-lambda-from-nodejs
> programmatically invoking a lambda function from a Node.js application

## Description
Demonstrates how to programmatically invoke an existing lambda function using the `aws-sdk` module.

There are two ways modes to invoke a lambda function:
+ `Event` &mdash; fire and forget mode, in which the application invoking the lambda expects no response from the called lambda.
+ `RequestResponse` &mdash; the application expects results from the invoked lambda function.

The application demonstrates both invocation modes.

**Note**
This example is intented to be run locally &mdash; it is NOT a lambda function. Therefore, you might need to configure the AWS CLI with the appropriate access and secret keys.
