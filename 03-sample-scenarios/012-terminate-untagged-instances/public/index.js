"use strict";

var zeptolog = require("./lib/zeptolog.js");
var logger = zeptolog("DEBUG");
var AWS = require("aws-sdk");
var ec2 = new AWS.EC2();
var async = require("async");

var REQ_TAG_KEY = "Name";

exports.handler = function (event, context) {


  logger.debug("About to obtain instances");
  ec2.describeInstances({}, function (descInstancesErr, descInstancesData) {
    if (descInstancesErr) {
      logger.error("describeInstances failed:", descInstancesErr);
      return context.fail(descInstancesErr);
    }

    if (!descInstancesData || !descInstancesData.Reservations || !descInstancesData.Reservations.length) {
      logger.debug("describeInstances returned no data!!");
      return context.succeed("No instances found!");
    } else {
      logger.debug(descInstancesData.Reservations.length + " instances found");

      var instancesToTerminate = [];
      async.each(descInstancesData.Reservations, function (reservation, nextReservation) {
        async.each(reservation.Instances, function (instance, nextInstance) {
          var found = false;
          logger.trace("Instance:", JSON.stringify(instance));
          logger.debug("Examining", instance.InstanceId);
          for (var i in instance.Tags) {
            logger.debug("Instance `" + instance.InstanceId + "` has tag `" + instance.Tags[i].Key + "`");
            if (instance.Tags[i].Key === REQ_TAG_KEY) {
              logger.debug("Instance `" + instance.InstanceId + "` has tag `" + instance.Tags[i].Key + "`");
              found = true;
              break;
            }
          }
          if (!found) {
            logger.debug("Instance `" + instance.InstanceId + "` does not include the required tag: " + REQ_TAG_KEY);
            instancesToTerminate.push(instance.InstanceId);
          }
          logger.debug("About to process next instance...");
          nextInstance();
        }, function (errInstance) {
          if (errInstance) {
            logger.error("Error checking instance:", errInstance);
            return context.fail(errInstance);
          } else {
            logger.debug("About to process next Reservation block...");
            nextReservation();
          }
        });
      }, function (errReservation) {
        if (errReservation) {
          logger.error("Error checking Reservation block:", errReservation);
          return context.fail(errReservation);
        }
        if (!instancesToTerminate.length) {
          logger.info("Nothing to terminate: all instances are properly tagged");
          return context.succeed("Nothing to terminate: all instances properly tagged");
        } else {
          logger.info("About to terminate improperly tagged instances:", instancesToTerminate);
          ec2.terminateInstances({InstanceIds: instancesToTerminate}, function (terminateErr, terminateData) {
            if (terminateErr) {
              logger.error("Could not terminate instances: " + instancesToTerminate + "; Reason: " + terminateErr);
              return context.fail("Could not terminate instances");
            } else {
              logger.info("Instances correctly terminated: " + instancesToTerminate + ". Additional data: " + terminateData);
              context.succeed("Untagged Instances correctly terminated");
            }
          });
        }
      });
    }
  });
};
