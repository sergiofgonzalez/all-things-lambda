"use strict";

const AWS = require("aws-sdk");
const zeptolog = require("./lib/zeptolog-node4");

const s3 = new AWS.S3();
const logger = zeptolog(process.env["LOG_LEVEL"] || "DEBUG");



exports.handler = function (event, context, done) {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  
  const params = {
    Bucket: bucket,
    Key: key
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      logger.error(`Error getting object ${key} from bucket ${bucket}: ${err}`);
      return done(err);
    }

    const fileContents = data.Body;
    const helloMessage = `Hello, ${fileContents}!`;
    logger.info(helloMessage);
    done(null, helloMessage);
  });
};
