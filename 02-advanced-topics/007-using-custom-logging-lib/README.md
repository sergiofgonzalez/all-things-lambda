# All Things Lambda &mdash; 007-using-custom-logging-lib
> using custom modules in lambda

## Description
Illustrates how to pack and use custom Node.js modules in AWS Lambda. In the example, a simplistic logging framework is developed and used from the Lambda handler.

### Zeptolog logging library
A stupidly simplistic logging library for my *AWS Lambda* projects.

+ It only supports configuring the logging level &mdash; TRACE > DEBUG > INFO > WARN > ERROR > FATAL. INFO is the default
+ Hardcoded logging pattern &mdash; ISO DATE |- LOG_LEVEL(6) : MESSAGE as in `2017-01-15T11:12:29.469Z |- INFO   : Hello world again` 

#### usage


```javascript
const zeptolog = require("./lib/zeptolog-node4");
var logger = zeptolog("DEBUG");

logger.debug("Hello", "world", "of", "logging");
logger.info(`Hello ${var1}-${var2}`);
```
**TIP**
Use the following snippet to allow parameterizing the logging level with an environment variable, while setting the default logging level to DEBUG:

```javascript
var zeptolog = require("./lib/zeptolog-node4");
var logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");
```

**NOTE**
I first developed the logging library using the rest parameters notation `...rest` but it is not supported on the the Node.js 4 runtime, so i developed the `zeptolog-node4` module using the old `arguments` approach.

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
