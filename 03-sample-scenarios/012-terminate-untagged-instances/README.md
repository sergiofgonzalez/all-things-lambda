# All Things Lambda &mdash; 012-terminate-untagged-instances
> terminate untagged instances using Lambda

## Description
Lambda function that retrieves the list of instances in your environment and terminates those that do not include the `Name` tag.

### Dependencies
The Lambda function uses the `async` package. This should be included as part of the zipped package.
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
      { cwd: "node_modules/", expand: true, src: ["async/**"], dest: "node_modules" },
    ]
  }
},
...
```

### Configuration and Testing
The Lambda function needs to be configured with a role that includes a policy that allows for listing and terminating instances:
This is the policy that needs to be attached to the role:
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
      "Action": ["ec2:DescribeInstances","ec2:TerminateInstances"],
      "Resource": "*"
    }
  ]
}
```

The Lambda function do not expect any input event.
