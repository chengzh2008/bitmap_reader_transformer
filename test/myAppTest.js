'use strict';

var myApp = require('../index'),
    expect = require('chai').expect;

describe('myApp from index.js', function () {
    var arg_cache;

    before(function () {
        // cache the current process.argv
        arg_cache = process.argv;
        process.argv = ['node', 'index.js', 'test.bmp'];
    });

    // restore the process.argv
    after(function () {
        process.argv = arg_cache;
    });

    it('should take right filename', function () {

    });
});
