#! /usr/bin/env node
"use strict";
var myApp = require('./lib/transformer'),
    fileName = process.argv[3],
    format = process.argv[2],
    options = ['invert', 'grayscale', 'scale'],
    rgb, transformTo, factor;

// get input from command line
if (format.indexOf(':') >= 0) {
    format = format.split(":");
    if (format.length === 3) {
        rgb = format[0];
        transformTo = format[1];
        factor = parseInt(format[2], 10);
    } else {
        transformTo = format[0];
        factor = parseInt(format[1], 10);

    }
} else {
    transformTo = format;
}

console.log(rgb, transformTo, factor);

// check input is valid or not
if (options.indexOf(transformTo) < 0) {
    console.log("invalid transform request");
    process.exit(1);
}

// check if the picture is provided or not
if (!fileName) {
    console.log("please give a picture to transform");
    process.exit(1);
}

// do the image transformation
console.log("Doing the transformation...");
myApp.transform(fileName, transformTo, factor, rgb);

module.exports = myApp;
