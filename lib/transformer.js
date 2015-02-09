"use strict";
var bitmap = require('./bitmap'),
    path = require('path'),
    fs = require('fs'),
    defaultFactor = 10,
    myApp = {};

myApp.getOutputFilename = function (fileName, transformTo, factor, rgb) {
    var extension = '.' + fileName.split('.')[1],
        basename = path.basename(fileName, extension);

    if (!factor) {
        factor = "-" + defaultFactor;
    } else {
        factor = "-" + factor;
    }

    if (transformTo === "invert") {
        factor = "";
    }

    if (!rgb) {
        rgb = "";
    } else {
        rgb = "-" + rgb;
    }

    return basename + rgb + "-" + transformTo + factor + extension;
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


myApp.modifyPalette = function (buf, transformer, factor, rgb) {
    var palette = bitmap.getPaletteArray(buf),
        count,
        currentPalette,
        metaInfo = bitmap.metaReader(buf);

    for (count = 0; count < palette.length; count++) {
        currentPalette = palette.slice(count * 4, count * 4 + 4);
        transformer(currentPalette, factor, rgb); // transform each pixel
    }

    // put modified pixelData into original buffer
    palette.copy(buf, metaInfo.startOfPalette, 0, palette.length);
};

myApp.transform = function (fileName, transformTo, factor, rgb) {
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
        that.modifyPalette(buf, transformer, factor, rgb);

        // save buf to a file
        outputFileName = that.getOutputFilename(fileName, transformTo, factor, rgb);
        that.saveBufToFile(outputFileName, buf, function () {
            console.log("Saved the transformed image to " + outputFileName);
            console.log("Done with the transformation.");
        });
    });
};

module.exports = myApp;
