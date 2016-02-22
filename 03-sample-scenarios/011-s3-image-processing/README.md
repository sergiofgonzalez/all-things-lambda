# All Things Lambda &mdash; 011-s3-image-processing
> image processing on S3 using a Lambda function

## Description
Lambda function that looks for images on `s3-lambda-test-images` bucket, downloads the image, creates three resized images on `s3-lambda-test-images/resized` with widths of 480, 640 and 1000 pixels.


### Dependencies
The Lambda function uses `async` and `gm` packages. Those should be included as part of the zipped package.
This packaging has been automated on the *Gruntfile*, on the `compress task`:
```JavaScript
...
compress: {
  build: {
    options: {
      archive: "build/<%= pkg.name %>-<%= pkg.version %>.zip"
    },
    files: [
      { cwd: "public/", expand: true, src: ["**/*.js"] },
      { cwd: "node_modules/", expand: true, src: ["async/**", "gm/**"], dest: "node_modules" },
    ]
  }
},
...
```

### Configuration and Testing
The Lambda function needs to be configured with access to `s3-lambda-test-images` bucket with `GetObject` and `PutObject` permissions.
This is the policy that needs to be attached to the role:
```JSON
Show Policy
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
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::s3-lambda-test-images/*"
            ]
        }
    ]
}
```

For testing, you can use the following event:
```JSON
{
  "Records": [
    {
      "s3": {
        "object": {
          "key": "Community Accenture Technology FY15, Madrid (Source).mp4_snapshot_00.17_[2015.07.02_13.52.48].jpg"
        },
        "bucket": {
          "name": "s3-lambda-test-images"
        }
      }
    }
  ]
}
```
Note that if you intend to use S3 triggers, you should configure a *prefix* and *suffix* to prevent recursive activation of the Lambda function!!
