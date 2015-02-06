#! /usr/bin/env node
"use strict";
var bitmap = require('./lib/bitmap'),
    path = require('path'),
    fs = require('fs'),
    myApp = function () {
        console.log(process.argv);
        var fileName = process.argv[3],
            transformTo = process.argv[2],
            outputFileName,
            buf, metaInfo, palette,
            count, currentPalette,
            inputFileInfo,
            basename, extension,
            transformFn;
        transformTo = transformTo.toLowerCase();
        if (transformTo === "invert") {
            transformFn = bitmap.invert;
        } else if (transformTo === "grayscale") {
            transformTo = bitmap.grayscale;
        } else if (transformTo === "scale") {
            transformFn = bitmap.scale;
        }


        if (!fileName) {
            console.log("please give a picture to transform");
            return;
        }


        fs.readFile(fileName, function (err, buf) {
            if (err) {
                throw err;
            }

            metaInfo = bitmap.metaReader(buf);
            palette = bitmap.getPaletteArray(buf);
            //console.log(pixelData.length);

            for (count = 0; count < palette.length; count++) {
                currentPalette = palette.slice(count * 4, count * 4 + 4);
                //console.log(currentPixel);
                transformFn(currentPalette); // invert each pixel
                //console.log(currentPixel);
            }

            // put modified pixelData into original buffer
            palette.copy(buf, 54, 0, palette.length);


            // save buf to a file
            extension = '.' + fileName.split('.')[1];
            basename = path.basename(fileName, extension);
            outputFileName = basename + "-" + transformTo + extension;
            fs.writeFile(outputFileName, buf, function (err) {
                if (err) {
                    throw err;
                }
            });

            console.log("done with the transform!")

        });

    };

myApp();

module.exports = myApp;
