# All Things Lambda &mdash; e01-globally-initialized-code
> hello, world! lambda

## Description
Lambdas are executed via `vm.runInThisContext`, and thus the handler is *required* and initialized only once (the first time), and then cached for the rest of the executions of the Lambda.

In the example, it is demonstrated how the internal state of the lambda is preserved from execution to execution. 
The application declares an initally empty array of numbers is initialized outside the definition of the handler (therefore, it would be cached for subsequent executions), and additional numbers are pushed into the array in the subsequent executions.
The program will display the state of the array before and after executing the Lambda function, so that you can check that the arrays is effectively cached.

First execution:
```
Version: $LATEST
 |- DEBUG  : Before: {"nums":[]}
 |- DEBUG  : After : {"nums":[0]}
```

Second execution:
```
Version: $LATEST
 |- DEBUG  : Before: {"nums":[0]}
 |- DEBUG  : After : {"nums":[0,1]}
```

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
