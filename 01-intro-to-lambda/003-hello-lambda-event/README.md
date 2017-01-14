# All Things Lambda &mdash; 003-hello-lambda-event
> using event information in a lambda

## Description
Illustrates how to use event information from a lambda function. In the example, the lambda function looks for a `username` property in the event object. If it is found, it will be used as part of the success callback. Otherwise, it will use a default name.


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
