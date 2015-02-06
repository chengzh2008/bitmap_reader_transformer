"use strict";
var bitmap = require('./bitmap'),
    path = require('path'),
    fs = require('fs'),
    myApp = {};

myApp.getOutputFilename = function (fileName, transformTo) {
    var extension = '.' + fileName.split('.')[1],
        basename = path.basename(fileName, extension);
    return basename + "-" + transformTo + extension;
};

myApp.getTransformer = function (bitmap, transformTo) {
    var transformFnMap = {
        invert: bitmap.invert,
        grascale: bitmap.invert,
        scale: bitmap.scale
    };
    return transformFnMap[transformTo];
};

myApp.saveBufToFile = function (filename, buf) {
    fs.writeFile(filename, buf, function (err) {
        if (err) {
            throw err;
        }
        console.log("Saved the transformed image to " + filename);

    });
};


myApp.modifyPalette = function (buf, transformer) {
    var palette = bitmap.getPaletteArray(buf),
        count,
        currentPalette,
        metaInfo = bitmap.metaReader(buf);

    for (count = 0; count < palette.length; count++) {
        currentPalette = palette.slice(count * 4, count * 4 + 4);
        //console.log(currentPixel);
        transformer(currentPalette); // invert each pixel
        //console.log(currentPixel);
    }

    // put modified pixelData into original buffer
    palette.copy(buf, metaInfo.startOfPalette, 0, palette.length);
}

myApp.transform = function (fileName, transformTo) {
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
        that.modifyPalette(buf, transformer);

        // save buf to a file
        outputFileName = that.getOutputFilename(fileName, transformTo);
        that.saveBufToFile(outputFileName, buf);

    });
};

module.exports = myApp;