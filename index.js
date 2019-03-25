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
 /**
  * @param  {} {fs.readFile(this.file
  * @param  {} (err
  * @param  {} buffer
  * @param  {} =>{if(err
  * @param  {} {throwerr;}this.parse(buffer
  * @param  {} ;}
  */
 read(){
   fs.readFile(this.file, (err, buffer) => {
     if(err) {
       throw err;
     }
     this.parse(buffer);
   });
 }
 /**
  * @param  {} buffer
  * @param  {} {this.COLOR_TABLE_OFFSET=54;this.PIXEL_ARRAY_OFFSET=1145;this.buffer=buffer;this.type=buffer.toString('utf-8'
  * @param  {} 0
  * @param  {} 2
  * @param  {} ;this.colorTable=buffer.slice(this.COLOR_TABLE_OFFSET
  * @param  {} this.PIXEL_ARRAY_OFFSET
  * @param  {} ;this.pixelArray=buffer.slice(this.PIXEL_ARRAY_OFFSET
  * @param  {} ;this.transform(operation
  * @param  {} this
  * @param  {} ;this.write(this.file
  * @param  {} this.buffer
  * @param  {} operation
  */
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
 /**
  * @param  {} operation
  * @param  {} buffer
  * @param  {} {console.log('intransform'
  * @param  {} operation
  * @param  {} ;if(operation==='grey'
  * @param  {} {returngrey.transform(buffer
  * @param  {} ;}if(operation==='clown'
  * @param  {} {returnclown.transform(buffer
  * @param  {} ;}if(operation==='invert'
  * @param  {} {returninvert.transform(buffer
  * @param  {} ;}if(operation==='random'
  * @param  {} {returnrandom.transform(buffer
  */
 transform(operation, buffer){
   console.log('in transform', operation);
   if(operation === 'grey'){return grey.transform(buffer);}
   if(operation === 'clown'){return clown.transform(buffer);}
   if(operation === 'invert'){return invert.transform(buffer);}
   if(operation === 'random'){return random.transform(buffer);}
   else{return null;}
 }
 /**
  * @param  {} file
  * @param  {} buffer
  * @param  {} {fs.writeFile(this.newfile
  * @param  {} buffer
  * @param  {} (err
  * @param  {} out
  * @param  {} =>{if(err
  * @param  {} {throwerr;}console.log('filecreated.'
  * @param  {} ;}
  */
 write(file, buffer){
   fs.writeFile(this.newfile, buffer, (err, out) =>{
     if(err){
       throw err;
     }
     console.log('file created.');
   });
 }
}
/**
 * @param  {} 
 */
const [file, operation] = process.argv.slice(2);
let bald = new Bitmap(file);

bald.read();