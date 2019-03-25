'use strict';

const fs = require('fs');
const buffer = require('buffer');

// NO, you may not read synchronosly ... this is only for expedience in the demo
const bald = fs.readFileSync(`${__dirname}/assets/baldy.bmp`);
console.log('Bald:', bald);

// Create a naked object to model the bitmap properties
const parsedBitmap = {};

// Identify the offsets by reading the bitmap docs
const FILE_SIZE_OFFSET = 2;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const BYTES_PER_PIXEL_OFFSET = 28;
const COLOR_PALLET_OFFSET = 46;
const COLOR_TABLE_OFFSET = 54; // number of bytes in the color table (color table === pixel array)
const PIXEL_ARRAY_OFFSET = 1146; // The actual colors of the image. 256 (color table, a table of colors!) + 54 previous header)
const white = 1142

// pixel-array tells you which part of the color table is being used by that pixel.

//------------------------------------------------------
// READING INFORMATION FROM THE BITMAP FILE
//------------------------------------------------------

parsedBitmap.type = bald.toString('utf-8', 0, 2);
parsedBitmap.fileSize = bald.readInt32LE(FILE_SIZE_OFFSET);
parsedBitmap.bytesPerPixel = bald.readInt16LE(BYTES_PER_PIXEL_OFFSET);
parsedBitmap.height = bald.readInt32LE(HEIGHT_OFFSET);
parsedBitmap.width = bald.readInt32LE(WIDTH_OFFSET);
parsedBitmap.colorPallet = bald.readInt32LE(COLOR_PALLET_OFFSET);
parsedBitmap.colorTable = bald.readInt32LE(COLOR_TABLE_OFFSET);
parsedBitmap.pixelArray = bald.readInt32LE(PIXEL_ARRAY_OFFSET);

console.log(parsedBitmap);

const colorTable = bald.slice(PIXEL_ARRAY_OFFSET);
const tableOfColors = bald.slice(COLOR_TABLE_OFFSET, PIXEL_ARRAY_OFFSET);

// Bottom left boundary = 1146
// Top right boundary = bald.length
// Color table
//  let other = '0f29a';
// for (let i = 2000; i < 4000; i++) {
//    bald[i] = other;
// }
console.log (bald[3000  ])
console.log('bald.length:', bald.length);
fs.writeFile('./test2.bmp', bald, err => {
  if (err) throw err;
});