# All Things Lambda &mdash; 009-s3-trigger
> triggering lambda execution from actions on S3 buckets

## Description
Illustrates how to interact with AWS S3 service from a Lambda function and how to activate a lambda function as a result as a `PUT` action on a S3 bucket. 
The example is a modification of the *Hello, World* example, only that the name to be returned in the callback is taken from the contents of an S3 file. 

The lambda function is prepared to be activated each time a file is uploaded to the configured bucket.

These are the configuration details:
+ S3 bucket &mdash; `s3-lambda-test-bucket-2017`, created on the same region as the Lambda function
+ S3 file &mdash; `name.txt`, contains a single line with a name (e.g. *Jason Isaacs*)


The Lambda function must be configured with a role that includes two policies:
+ policy to be able to write the logs in CloudWatch
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:382027692032:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:382027692032:log-group:/aws/lambda/009-s3-event:*"
            ]
        }
    ]
  }
  ```

+ policy to be able to read information from the configured bucket
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::s3-lambda-test-bucket-2017/*"
        }
    ]
  }
  ```
