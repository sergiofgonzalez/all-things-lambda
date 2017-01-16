"use strict";

const zeptolog = require("./lib/zeptolog-node4");
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");

const async = require("async");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const gm = require("gm").subClass({imageMagick: true});

const widths = [480, 640, 1080];

exports.handler = function (event, context, done) {
  logger.debug(`${context.functionName} activated: about to retrieve info from event`);
  
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key).replace(/\+/g, " "); // replace `+` by spaces

  logger.debug(`Received event from bucket ${bucket} and key ${key}`);
  s3.getObject({Bucket: bucket, Key: key}, (s3Err, s3Data) => {
    if (s3Err) {
      logger.error(`Error reading from ${bucket}/${key}: ${s3Err}`);
      return done(s3Err);
    }

    const origImage = gm(s3Data.Body);

    // loop asynchronously through each configured width to generate a resized image
    async.each(widths, (width, next) => {
      origImage.resize(width).toBuffer("jpg", (resizeErr, resizedBuffer) => {
        if (resizeErr) {
          logger.error(`Error resizing image: ${resizeErr}`);
          return next(resizeErr);
        }
        s3.putObject({Bucket: bucket, Key: `resized/${width}/${key}`, Body: resizedBuffer, ContentType: "image/jpg"}, s3UploadErr => {
          if (s3UploadErr) {
            logger.error(`Error uploading image to resized/${width}/${key}: ${s3UploadErr}`);
            return next(s3UploadErr);
          }
          logger.info(`Completed resizing for ${bucket}/${key}; width=${width}`);
        });
      });
    }, function resizingDone(err) {
      if (err) {
        logger.error(`Error generating the resized images: ${err}`);
        return done(err);
      }
      logger.info(`Resizing completed for ${bucket}/${key} image. ${widths.length} image(s) created`);
    });
  });
};
