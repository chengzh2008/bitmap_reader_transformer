"use strict";
var fs = require('fs'),
    defaultFactor = 5,
    myApp = exports = module.exports = {}; // jshint ignore:line

myApp.metaReader = function (buf) {
    var metaInfo = {};
    metaInfo.type = buf.toString('utf-8', 0, 2);
    metaInfo.size = buf.readUInt32LE(2);
    metaInfo.startOfPixels = buf.readUInt32LE(10);
    metaInfo.bitmapInfoHeaderSize = buf.readUInt32LE(14);
    metaInfo.width = buf.readUInt32LE(18);
    metaInfo.height = buf.readUInt32LE(22);
    metaInfo.colorDepth = buf.readUInt16LE(28);
    metaInfo.paletteSize = buf.readUInt32LE(46);
    metaInfo.imageSize = buf.readUInt32LE(34);
    metaInfo.startOfPalette = 54;
    return metaInfo;
};

// return a buffer contains pixel data only without metaInfo
myApp.pixelReader = function (buf) {
    var metaInfo = myApp.metaReader(buf),
        pixelArray = new Buffer(metaInfo.imageSize);
    buf.copy(pixelArray, 0, metaInfo.startOfPixels, buf.length);
    return pixelArray;
};

myApp.getPaletteArray = function (buf) {
    var metaInfo = myApp.metaReader(buf),
        palette = new Buffer(metaInfo.paletteSize * 4);
    buf.copy(palette, 0, metaInfo.startOfPalette, metaInfo.startOfPixels);
    return palette;
};


// take buf of size 4 and invert the color
myApp.invert = function (palette) {
    for (var i = 0; i < palette.length - 1; i++) {
        palette[i] = 0xff - palette[i];
    }
};

// take buf of size 4 and grayscale by the factor
myApp.grayscale = function (palette, factor) {
    var i;
    for (i = 0; i < palette.length - 1; i++) {
        palette[i] *= factor || defaultFactor;
        palette[i] = palette[i] > 255 ? 255 : palette[i];
    }
};

// take buf of size 4 and scale the r|g|b (randomly) by the factor
myApp.scale = function (palette, factor) {
    var i = Math.floor(Math.random() * 3);
    palette[i] *= factor || defaultFactor;
    palette[i] = palette[i] > 255 ? 255 : palette[i];
};

