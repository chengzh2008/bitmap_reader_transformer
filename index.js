#! /usr/bin/env node
"use strict";
var bitmap = require('./lib/bitmap'),
    path = require('path'),
    fs = require('fs'),
    myApp = function () {
        var fileName = process.argv[2],
            outputFileName,
            buf, metaInfo, palette,
            count, currentPalette,
            inputFileInfo,
            basename, extension;

        if (!fileName) {
            console.log("please give a picture to transform");
            return;
        }

        buf = fs.readFileSync(fileName);

        metaInfo = bitmap.metaReader(buf);
        palette = bitmap.getPaletteArray(buf);
        //console.log(pixelData.length);

        for (count = 0; count < palette.length; count++) {
            currentPalette = palette.slice(count * 4, count * 4 + 4);
            //console.log(currentPixel);
            bitmap.invert(currentPalette); // invert each pixel
            //console.log(currentPixel);
        }
        console.log(count);

        // put modified pixelData into original buffer
        palette.copy(buf, 54, 0, palette.length);


        // save buf to a file
        extension = '.' + fileName.split('.')[1];
        basename = path.basename(fileName, extension);
        outputFileName = basename + "-inverted" + extension;
        fs.writeFile(outputFileName, buf, function (err) {
            if (err) {
                throw err;
            }
        });
    };

myApp();

module.exports = myApp;
