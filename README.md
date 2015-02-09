# Bitmap Reader and Transformer
====================================
For this assignment you will be building a Bitmap reader and transformer. It will read a Bitmap in from disk, run one or more color transforms on the bitmap and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your project should include tests, as well as a Gruntfile and package.json file. Make sure to run all your code through jshint and jscs.




# Design and development
====================================
This project has been done through absulutely Test-driven Development (TDD). Tools and framworks used for this project includes NodeJs, npm, chai, mocha, jshint, jscs and javascript modularity.

It basically contains two modules bitmap.js and transformer.js. The first module deals with the Bitmap images files. it contains several application public interface (APIs):
    metaReader: read meta info from the imgage file
    pixelReader: get the binary buffer of the pixel data
    getPaletteArray: get the palette binary buffer
    invert: invert a 4 byte color encoded by RGBA
    grayscale: scale a 4 byte color encoded by RGBA (multiple a factor to rgb values)
    scale: scale a 4 byte color encoded by RGBA (multiple a sigle r|g|b value)
