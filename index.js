#! /usr/bin/env node
"use strict";
var myApp = require('./lib/transformer'),
    fileName = process.argv[3],
    transformTo = process.argv[2],
    options = ['invert', 'grayscale', 'scale'];

// check for command line input validity

if (options.indexOf(transformTo) < 0) {
    console.log("invalid transform request");
    process.exit(1);
}

if (!fileName) {
    console.log("please give a picture to transform");
    process.exit(1);
}

// do the job
myApp.transform(fileName, transformTo);

module.exports = myApp;
