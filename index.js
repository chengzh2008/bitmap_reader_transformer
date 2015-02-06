#! /usr/bin/env node
"use strict";
var myApp = require('./lib/transformer'),
    fileName = process.argv[3],
    transformTo = process.argv[2];

// check for command line input validity
if (!transformTo in ['invert', 'grayscale', 'scale']) {
    console.log("invalid transform request");
    return;
}

if (!fileName) {
    console.log("please give a picture to transform");
    return;
}

// do the job
myApp.transform(fileName, transformTo);

module.exports = myApp;
