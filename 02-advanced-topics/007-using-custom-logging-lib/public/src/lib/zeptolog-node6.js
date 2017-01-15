"use strict";

/*
    zeptolog: a minimalist logging library for my Lambda projects

    Inspired by the work of Matthew Fuller.
*/

module.exports = function (level) {
  let levelValue = 100;
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
    trace: (...args) => {if (levelValue <= 0) printArguments("TRACE ", args);},
    debug: (...args) => {if (levelValue <= 1) printArguments("DEBUG ", args);},
    info:  (...args) => {if (levelValue <= 2) printArguments("INFO  ", args);},    
    warn:  (...args) => {if (levelValue <= 3) printArguments("WARN  ", args);},
    error: (...args) => {if (levelValue <= 4) printArguments("ERROR ", args);},
    fatal: (...args) => {if (levelValue <= 5) printArguments("FATAL ", args);}
  };
};

function printArguments(paddedLabel, args) {
  console.log(`${new Date().toISOString()} |- ${paddedLabel} : ${Array.prototype.join.call(args, " ")}`);
}