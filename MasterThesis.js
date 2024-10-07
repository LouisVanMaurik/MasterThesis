let heightTimeSim;
let heightVelocitySim;
let drawBackground;
let hypothesisPhase;


function preload(){
  backgroundImg = loadImage('background.jpg');
}


function setup() {
  createCanvas(1300, 850);
  let textBoxWidth = width-500;
  drawBackgroundObjects = new DrawBackgroundObjects(textBoxWidth);
  hypothesisPhase = new HypothesisPhase(drawBackgroundObjects);
  heightTimeSim = new HeightTimeSim(textBoxWidth);
  heightVelocitySim = new HeightVelocitySim(textBoxWidth);
}


function draw() {
  drawBackgroundObjects.drawBackground();
  hypothesisPhase.drawHypothesisPhase(heightTimeSim);
} 
