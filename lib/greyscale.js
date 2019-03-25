'use strict';

const grey = module.exports = {};
grey.name ='grey';
/**
 * @param  {} buffer
 * @param  {} {if(!Buffer.isBuffer(buffer.buffer
 * @param  {} ||buffer.buffer.readInt32LE(2
 * @param  {} !==buffer.buffer.length
 * @param  {} {returnnull;}letcolorPallet=buffer.colorTable;for(leti=0;i<1145;i=i+4
 * @param  {} {letgreyscale=((colorPallet[i]+colorPallet[i+1]+colorPallet[i+2]
 * @param  {} /3
 */
grey.transform = function(buffer){
  if (!Buffer.isBuffer(buffer.buffer) || buffer.buffer.readInt32LE(2)!== buffer.buffer.length){
    return null;
  }
  let colorPallet = buffer.colorTable;
  for(let i = 0; i < 1145; i = i + 4){
    let greyscale = ((colorPallet[i] + colorPallet[i+1] + colorPallet[i+2]) /3);
    colorPallet[i] = greyscale;
    colorPallet[i+1] = greyscale;
    colorPallet[i+2] = greyscale;
  }
};