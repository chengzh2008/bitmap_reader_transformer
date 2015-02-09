"use strict";
var bitmap = require('./bitmap'),
    path = require('path'),
    fs = require('fs'),
    myApp = {};

myApp.getOutputFilename = function (fileName, transformTo, factor) {
    var extension = '.' + fileName.split('.')[1],
        basename = path.basename(fileName, extension);
    if (!factor) {
        factor = "";
    } else {
        factor = "-" + factor;
    }
    return basename + "-" + transformTo + factor + extension;
};

myApp.getTransformer = function (bitmap, transformTo) {
    var transformFnMap = {
        invert: bitmap.invert,
        grayscale: bitmap.grayscale,
        scale: bitmap.scale
    };
    return transformFnMap[transformTo];
};

myApp.saveBufToFile = function (filename, buf, callback) {
    fs.writeFile(filename, buf, function (err) {
        if (err) {
            throw err;
        }
        callback();
    });
};


myApp.modifyPalette = function (buf, transformer, factor) {
    var palette = bitmap.getPaletteArray(buf),
        count,
        currentPalette,
        metaInfo = bitmap.metaReader(buf);

    for (count = 0; count < palette.length; count++) {
        currentPalette = palette.slice(count * 4, count * 4 + 4);
        transformer(currentPalette, factor); // transform each pixel
    }

    // put modified pixelData into original buffer
    palette.copy(buf, metaInfo.startOfPalette, 0, palette.length);
};

myApp.transform = function (fileName, transformTo, factor) {
    var transformer,
        that = this,
        outputFileName;


    // get corresponding transfomer: invert, grayscale and scale
    transformer = that.getTransformer(bitmap, transformTo);
    fs.readFile(fileName, function (err, buf) {
        if (err) {
            throw err;
        }

        // modify the palette
        that.modifyPalette(buf, transformer, factor);

        // save buf to a file
        outputFileName = that.getOutputFilename(fileName, transformTo, factor);
        that.saveBufToFile(outputFileName, buf, function () {
            console.log("Saved the transformed image to " + outputFileName);
            console.log("Done with the transformation.");
        });
    });
};

module.exports = myApp;
