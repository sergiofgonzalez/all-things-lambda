# All Things Lambda &mdash; 001-hello-lambda
> hello, world! lambda

## Description
Hello, world! Lambda style!

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
