# All Things Lambda &mdash; 011-s3-image-processing
> Image processing from a Lambda function

## Description
Lambda function that looks for images on `s3-lambda-test-bucket-2017/orig` bucket, downloads the image, creates three resized images on `s3-lambda-test-bucket-2017/resized` with widths of 480, 640 and 1080 pixels.


### Dependencies
The Lambda function uses `async` and `gm` packages. Those are included as part of the zipped package as part of the `npm run build:dist`task.


### Configuration and Testing
The Lambda function needs to be configured with an S3 policy that allows for reading and writing the configured S3 bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::s3-lambda-test-bucket-2017/*"
        }
    ]
}
```

For testing, you can use the following event:
```json
{
  "Records": [
    {
      "s3": {
        "object": {
          "key": "orig/the-image-name.jpg"
        },
        "bucket": {
          "name": "s3-lambda-test-bucket-2017"
        }
      }
    }
  ]
}
```
***IMPORTANT NOTE (Recursive activation)***
The function is prepared to be activated by S3 triggers, but take into account that as the same bucket is used for both input and output processing, the trigger must be configured with a **prefix**. For example, `prefix=orig/`.

