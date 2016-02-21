"use strict";

var aws = require("aws-sdk");
var s3 = new aws.S3();
var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("INFO");


exports.handler = function (event, context) {
  var bucket = event.Records[0].s3.bucket.name;
  var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  var params = {
    Bucket: bucket,
    Key: key
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      logger.error(err);
      context.fail("Error getting object `" + key + "` from bucket `" + bucket + "`. Make sure they exist and your bucket is in the same region as this function");
    } else {
      logger.info("Successful activation. Returning `Hello, " + data.Body + "`");
      context.succeed("Hello, " + data.Body);
    }
  });
};
