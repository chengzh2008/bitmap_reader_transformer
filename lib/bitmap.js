"use strict";
var fs = require('fs'),
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
    buf.copy(palette, 0, 54, 1078);
    return palette;
};


// take buff of size 4 and invert the color
myApp.invert = function (palette) {
    for (var i = 0; i < palette.length - 1; i++) {
        palette[i] = 0xff - palette[i];
    }
};

myApp.grayscale = function (palette) {

    // TODO
};

myApp.scale = function (palette) {

    // TODO
};
