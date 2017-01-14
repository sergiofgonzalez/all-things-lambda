# All Things Lambda &mdash; 002-hello-lambda-with-console-messages
> hello, world! lambda with extra debugging info

## Description
This application is a simple *hello world* with additional debugging info printed in the standard output.

In the example, the function just displays some message in the console and returns "Hello, world!" in the callback.

The Lambda must be configured with the following policy:
**Policy Name &mdash; lambda_basic_execution_test**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```
