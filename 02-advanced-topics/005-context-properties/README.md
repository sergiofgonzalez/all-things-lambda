# All Things Lambda &mdash; 005-context-properties
> displaying the properties of the context object

## Description
Displays the values some of the properties on the `context` object by using `console.log` to display the values of:
+ `awsRequestId`
+ `logGroupName`
+ `logStreamName`
+ `identity`
+ `functionName`

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
