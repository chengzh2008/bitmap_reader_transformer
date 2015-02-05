#! /usr/bin/env node
"use strict";

var myApp = function () {
    var bitmap = require('./lib/bitmap'),
        fs = require('fs'),
        fileName = process.argv[2],
        outputFileName,
        buf, metaInfo, pixelData,
        count, currentPixel;

    if (!fileName) {
        console.log("please give a picture to transform");
        return;
    }

    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }

        buf = data;
        metaInfo = bitmap.metaReader(buf);
        pixelData = myApp.pixelReader(buf);

        for (count = 0; count < metaInfo.imageSize; count++) {
            currentPixel = pixelData.slice(count * 4, 4);
            bitmap.invert(currentPixel); // invert each pixel
        }

        // put modified pixelData into original buffer
        pixelData.copy(buf, metaInfo.startOfPixels, 0, pixelData.length);

        // save buf to a file
        var inputFileInfo = fileName.split(".");
        outputFileName = inputFileInfo[0] + "-inverted." + inputFileInfo[1];
        fs.writeFile(outputFileName, buf, function (err) {
            if (err) {
                throw err;
            }
        });
    });
};

myApp();

module.exports = myApp;
