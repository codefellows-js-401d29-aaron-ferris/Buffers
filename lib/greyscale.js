'use strict';

const grey = module.exports = {};
grey.name ='grey';
grey.transform = function(buffer){
 console.log('Transforming bitmap into greyscale', buffer);
 let colorPallet = buffer.colorTable;
 for(let i = 0; i < 1145; i = i + 4){
   let greyscale = ((colorPallet[i] + colorPallet[i+1] + colorPallet[i+2]) /3);
   colorPallet[i] = greyscale;
   colorPallet[i+1] = greyscale;
   colorPallet[i+2] = greyscale;
 }
};