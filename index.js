```'use strict'
const clown = module.exports = {};
clown.name='mime'
clown.mime = (buffer) => {
  let pixelMap = buffer.pixelArray;
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
}```

Chris Merritt [7:18 PM]
'use strict';

const fs = require('fs');

const grey = require('./lib/greyscale.js');
const clown = require('./lib/clown.js');
const random = require('./lib/random.js');
const invert = require('./lib/invert.js');


class Bitmap {
 constructor(file){
   this.file = file;
   this.newfile = this.file.replace(/\.bmp/, `${operation}.bmp`);
 }
 read(){
   fs.readFile(this.file, (err, buffer) => {
     if(err) {
       throw err;
     }
     this.parse(buffer);
   });
 }
 parse(buffer){

   this.COLOR_TABLE_OFFSET = 54;
   this.PIXEL_ARRAY_OFFSET = 1145;

   this.buffer = buffer;
   this.type = buffer.toString('utf-8', 0, 2);

   this.colorTable = buffer.slice(this.COLOR_TABLE_OFFSET, this.PIXEL_ARRAY_OFFSET);
   this.pixelArray = buffer.slice(this.PIXEL_ARRAY_OFFSET);

   this.transform(operation, this);
   this.write(this.file, this.buffer, operation );
 }
 transform(operation, buffer){
   if(operation === 'grey'){return grey.transform(buffer);}
   if(operation === 'clown'){return clown.transform(buffer);}
   if(operation === 'invert'){return invert.transform(buffer);}
   if(operation === 'random'){return random.transform(buffer);}
   else{return null;}
 }
 write(file, buffer){
   fs.writeFile(this.newfile, buffer, (err, out) =>{
     if(err){
       throw err;
     }
     console.log('file created.');
   });
 }
}

const [file, operation] = process.argv.slice(2);
let bald = new Bitmap(file);

bald.read();