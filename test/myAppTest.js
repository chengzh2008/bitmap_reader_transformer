'use strict';

var myApp = require('../index'),
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
        console.log(process.argv);
        myApp();
        console.log(process.argv);
        //expect(fs.existsSync(test-invert.bmp)).to.be.true;
    });

    // restore the process.argv
    after(function () {
        process.argv = arg_cache;
    });
});
