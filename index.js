#! /usr/bin/env node
"use strict";

var myApp = function () {
    var bitmap = require('./lib/bitmap'),
        fs = require('fs'),
        fileName = process.argv[2],
        outputFileName,
        buf, metaInfo, palette,
        count, currentPalette;

    if (!fileName) {
        console.log("please give a picture to transform");
        return;
    }

    buf = fs.readFileSync(fileName);

    metaInfo = bitmap.metaReader(buf);
    palette = bitmap.getPaletteArray(buf);
    //console.log(pixelData.length);

    for (count = 0; count < palette.length; count++) {
        currentPalette = palette.slice(count * 4, count * 4 + 4);
        //console.log(currentPixel);
        bitmap.invert(currentPalette); // invert each pixel
        //console.log(currentPixel);
    }
    console.log(count);

    // put modified pixelData into original buffer
    palette.copy(buf, 54, 0, palette.length);


    // save buf to a file
    var inputFileInfo = fileName.split(".");
    outputFileName = inputFileInfo[0] + "-inverted." + inputFileInfo[1];
    fs.writeFile(outputFileName, buf, function (err) {
        if (err) {
            throw err;
        }
    });
};

myApp();

module.exports = myApp;
