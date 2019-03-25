'use strict';

const fs = require('fs');

/**
* Bitmap -- receives a file name, used in the transformer to note the new buffer
* @param filePath
* @constructor
*/
function Bitmap(filePath) {
 this.file = filePath;
}

/**
* Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
* @param buffer
*/
Bitmap.prototype.parse = function(buffer) {

 this.COLOR_TABLE_OFFSET = 54;
 this.PIXEL_ARRAY_OFFSET = 1145;
 this.buffer = buffer;
 this.type = buffer.toString('utf-8', 0, 2);
 //... and so on

 this.colorTable = buffer.slice(this.COLOR_TABLE_OFFSET, this.PIXEL_ARRAY_OFFSET);
 this.pixelArray = buffer.slice(this.PIXEL_ARRAY_OFFSET);


};

/**
* Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
* @param operation
*/
Bitmap.prototype.transform = function(operation) {
 // This is really assumptive and unsafe
 transforms[operation](this);
 this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
* Sample Transformer (greyscale)
* Would be called by Bitmap.transform('greyscale')
* Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
* @param bmp
*/
const transformGreyscale = (bmp) => {

 console.log('Transforming bitmap into greyscale', bmp);

 //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it
if (!Buffer.isBuffer(bmp) && bmp.buffer.readInt32LE(2)!== bmp.buffer.length && !){
  return null
}

let colorPallet = bmp.colorTable;

 for(let i = 0; i < bmp.PIXEL_ARRAY_OFFSET-bmp.COLOR_TABLE_OFFSET; i = i + 4){
   let grey = ((colorPallet[i] + colorPallet[i+1] + colorPallet[i+2]) /3);
   colorPallet[i] = grey;
   colorPallet[i+1] = grey;
   colorPallet[i+2] = grey;
 }

};

const doTheInversion = (bmp) => {
 let colorPallet = bmp.colorTable;
 for(let i = 0; i < bmp.PIXEL_ARRAY_OFFSET-bmp.COLOR_TABLE_OFFSET; i = i + 4){
   colorPallet[i] = 255-colorPallet[i];
   colorPallet[i+1] = 255-colorPallet[i+1];
   colorPallet[i+2] = 255-colorPallet[i+2];
 }
};

const mime = (bmp) => {
  let pixelMap = bmp.pixelArray;
  for (let i = 0; i< pixelMap.length; i++){
    if(pixelMap[i]=== 244){
      pixelMap[i]=255;
    }
  }
  let pixwid=112
  for(let i=6648; i<6650; i++){
    [pixelMap[i], pixelMap[i+pixwid],pixelMap[i-pixwid],pixelMap[i-2*pixwid],pixelMap[i-3*pixwid],pixelMap[i-4*pixwid],pixelMap[i+14*pixwid],pixelMap[i+15*pixwid],pixelMap[i+16*pixwid],pixelMap[i+16*pixwid]] = [0,0,0,0,0,0,0,0,0]
  }
  for(let i=6682; i<6684; i++){
    [pixelMap[i], pixelMap[i+pixwid],pixelMap[i-pixwid],pixelMap[i-2*pixwid],pixelMap[i-3*pixwid],pixelMap[i-4*pixwid],pixelMap[i+14*pixwid],pixelMap[i+15*pixwid],pixelMap[i+16*pixwid],pixelMap[i+16*pixwid]] = [0,0,0,0,0,0,0,0,0]
  }
}
const psychadelic = (bmp) =>{
  console.log('started')
  let colorPallet = bmp.colorTable;
  for (let i = 0; i<colorPallet.length; i= i+4){
    colorPallet[i] = Math.floor(Math.random()*255);
    colorPallet[i+1] = Math.floor(Math.random()*255);
    colorPallet[i+2] = Math.floor(Math.random()*255);
    console.log (colorPallet[i],colorPallet[i+1],colorPallet[i+2])
  }
}


/**
* A dictionary of transformations
* Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
*/
const transforms = {
 greyscale: transformGreyscale,
 invert: doTheInversion, clown: mime,
 rando: psychadelic
};

// ------------------ GET TO WORK ------------------- //

function transformWithCallbacks() {

 fs.readFile(file, (err, buffer) => {

   if (err) {
     throw err;
   }

   bitmap.parse(buffer);

   bitmap.transform(operation);

   // Note that this has to be nested!
   // Also, it uses the bitmap's instance properties for the name and thew new buffer
   fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
     if (err) {
       throw err;
     }
     console.log(`Bitmap Transformed: ${bitmap.newFile}`);
   });

 });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);
//slices off the 1st 2 values of what your input was, and defines file and operation by the thrid and fourth value of your input
let bitmap = new Bitmap(file);
//using the file value from input create a new bitmap

transformWithCallbacks();
