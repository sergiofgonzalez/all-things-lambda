# All Things Lambda &mdash; 009-s3-event
> interacting with AWS S3 from a Lambda function

## Description
Illustrates how to interact with AWS S3 service from a Lambda function. The example is a modification of the *Hello, World* example, only that the name to be returned in the `context.succeed` is taken from the context of an S3 file.

These are the configuration details:
+ S3 bucket &mdash; `s3-lambda-test-bucket`, created on the same region as the Lambda function
+ S3 file &mdash; `name.txt`, contains the name *Tyler Durden*

The Lambda function must be configured with the appropriate role to be able to download objects from that bucket:
```JSON
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
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::s3-lambda-test-bucket/*"
      ]
    }
  ]
}
```

And the function can be tested from the Lambda console with the following sample event:
```JSON
{
  "Records": [
    {
      "s3": {
        "object": {
          "key": "name.txt"
        },
        "bucket": {
          "name": "s3-lambda-test-bucket"
        }
      }
    }
  ]
}
```
