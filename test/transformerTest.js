'use strict';

var transformer = require('../lib/transformer'),
    expect = require('chai').expect,
    path = require('path'),
    fs = require('fs');

describe('myApp from transformer.js', function () {

    it('should get right output filename based in input', function () {
        var filename = "abc.bmp",
            transformTo = "scale",
            rgb = "blue",
            factor = 30;
        expect(transformer.getOutputFilename(filename, transformTo, factor, rgb)).to.be.eql("abc-blue-scale-30.bmp");
    });

    it('should get right output filename based in input', function () {
        var filename = "abc.bmp",
            transformTo = "invert";
        expect(transformer.getOutputFilename(filename, transformTo)).to.be.eql("abc-invert.bmp");
    });

    it('should get right output filename based in input', function () {
        var filename = "abc.bmp",
            transformTo = "grayscale";
        expect(transformer.getOutputFilename(filename, transformTo)).to.be.eql("abc-grayscale-10.bmp");
    });

    it('should save buf to file', function (done) {
        var buf = new Buffer(20),
            outputFileName = 'saved.bmp';
        transformer.saveBufToFile(outputFileName, buf, function () {
            fs.exists("saved.bmp", function (isThere) {
                expect(isThere).to.be.eql(true);
                done();
            });
        });
    });

});
