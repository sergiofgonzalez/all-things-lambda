"use strict";

/*
  zeptolog: a minimalist logging library targeted for Lambda

  Inspired on the work by Matthew Fuller.
*/

module.exports = function (level) {
  var levelValue = 100;
  switch (level) {
    case "TRACE":
      levelValue = 0;
      break;
    case "DEBUG":
      levelValue = 1;
      break;
    case "INFO":
      levelValue = 2;
      break;
    case "WARN":
      levelValue = 3;
      break;
    case "ERROR":
      levelValue = 4;
      break;
    case "FATAL":
      levelValue = 5;
      break;
    default:
      levelValue = 2;
  }



  return {
    trace: function (message) { /*jshint ignore: line */
      if (levelValue <= 0) {
        console.log("TRACE:" + Array.prototype.join.call(arguments, " "));
      }
    },
    debug: function (message) { /*jshint ignore: line */
      if (levelValue <= 1) {
        console.log("DEBUG:" + Array.prototype.join.call(arguments, " "));
      }
    },
    info: function (message) { /*jshint ignore: line */
      if (levelValue <= 2) {
        console.log("INFO:" + Array.prototype.join.call(arguments, " "));
      }
    },
    warn: function (message) { /*jshint ignore: line */
      if (levelValue <= 3) {
        console.log("WARN:" + Array.prototype.join.call(arguments, " "));
      }
    },
    error: function (message) { /*jshint ignore: line */
      if (levelValue <= 4) {
        console.log("ERROR:" + Array.prototype.join.call(arguments, " "));
      }
    },
    fatal: function (message) { /*jshint ignore: line */
      if (levelValue <= 5) {
        console.log("FATAL:" + Array.prototype.join.call(arguments, " "));
      }
    }
  };
};
