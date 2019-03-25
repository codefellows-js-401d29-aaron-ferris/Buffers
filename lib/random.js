'use strict'
const random = module.exports= {};

random.name = 'random';
random.transform = (buffer) =>{
  console.log('started')
  let colorPallet = buffer.colorTable;
  for (let i = 0; i<colorPallet.length; i= i+4){
    colorPallet[i] = Math.floor(Math.random()*255);
    colorPallet[i+1] = Math.floor(Math.random()*255);
    colorPallet[i+2] = Math.floor(Math.random()*255);
    console.log (colorPallet[i],colorPallet[i+1],colorPallet[i+2])
  }
}