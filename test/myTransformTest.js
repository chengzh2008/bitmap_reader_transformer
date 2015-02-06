'use strict';

var transform = require('./lib/transform'),
    expect = require('chai').expect,
    fs = require('fs');

describe('myApp from index.js', function () {
    var arg_cache;

    before(function () {
        // cache the current process.argv
        arg_cache = process.argv;
        process.argv = ['node', 'index.js', 'invert', 'test.bmp'];

    });


    it('should take right filename', function () {
        console.log(process.argv, "here!!!");
        //myApp();
        console.log(process.argv);
    });

    // restore the process.argv
    after(function () {
        process.argv = arg_cache;
    });
});
