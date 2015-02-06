"use strict";

var expect = require('chai').expect,
    fs = require('fs'),
    myApp = require('../lib/bitmap');

describe('bitmap test', function () {
    var bitmapFile, bitmapMetaData, buf;

    before(function () {
        bitmapFile = 'test.bmp';
        bitmapMetaData = {
            type: 'BM',
            size: 11078,
            startOfPixels: 1078,
            bitmapInfoHeaderSize: 40,
            width: 100,
            height: 100,
            colorDepth: 8,
            paletteSize: 256,
            imageSize: 10000,
            startOfPalette: 54
        };
        buf = fs.readFileSync(bitmapFile);
    });

    it('should read the meta info from bitmap image file', function () {
        expect(myApp.metaReader(buf)).to.deep.equal(bitmapMetaData);
    });

    it('should read the pixel data as buffer with correct size', function () {
        var pixelOutput = myApp.pixelReader(buf);
    });

    it('should invert color in a buffer of size 4', function () {
        var before = new Buffer([0xff, 0x0, 0xaa, 0]),
            after = new Buffer([0x00, 0xff, 0x55, 0]);
        myApp.invert(before);
        expect(before).to.deep.eql(after);
    });


});

