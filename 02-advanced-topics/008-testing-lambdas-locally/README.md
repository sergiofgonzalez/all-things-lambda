# All Things Lambda &mdash; 008-testing-lambdas-locally
> testing lambdas locally

## Description
Illustrates how to conduct local shakedown tests of a lambda function to detect evident errors. In no way this is a serious testing framework for the lambda (no `vm.runInThisContext`, but rather a sync call is used; `context` and `event` objects are provided inline in the testing file).

Despite the simplicity of the example, it can be useful to spot problems in lambdas as the debugging environment for the lambdas is extremely hostile.

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
