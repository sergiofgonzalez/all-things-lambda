"use strict";



var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("DEBUG");
var async = require("async");
var AWS = require("aws-sdk");
var s3 = new AWS.S3();
var gm = require("gm").subClass({imageMagick: true});

logger.debug("Initialization completed");


var widths = [480, 640, 1000];

exports.handler = function (event, context) {

  logger.debug("Retrieving information from event");

  var bucket = event.Records[0].s3.bucket.name;
  var key = decodeURIComponent(event.Records[0].s3.object.key).replace(/\+/g, " ");

  logger.debug("Bucket: `" + bucket + "`, key: `" + key + "`");

  s3.getObject({Bucket: bucket, Key: key}, function (s3Err, s3Data) {
    if (s3Err) {
      logger.error("Error retrieving `" + key + "` from `" + bucket + "`: " + s3Err);
      return context.fail(s3Err);
    }

    var origImage = gm(s3Data.Body);

    // async loop through each width to generate the resize
    async.each(widths, function(width, next) {
      origImage.resize(width).toBuffer("jpg", function (resizeErr, resizedBuffer) {
        if (resizeErr) {
          logger.error("Resize Error:", resizeErr);
          return next(resizeErr);
        }
        // Upload the resized data to S3
        s3.putObject({
          Bucket: bucket,
          Key: "resized/" + width + "/" + key,
          Body: resizedBuffer,
          ContentType: "image/jpg" }, function (s3UploadErr) {
            logger.error("Error uploading resized image to s3:", s3UploadErr);
            next(s3UploadErr);
          });
      });
    }, function done(err) {
      if (err) {
        logger.error("Error generating the resized images:", err);
        return context.fail(err);
      }
      logger.info("Resizing completed for `" + key + "`");
      context.succeed("Completed generating the resized images for `" + key + "`. " + widths.length + " images created.");
    });
  });
};
