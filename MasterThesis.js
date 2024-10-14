let heightTimeSim;
let heightVelocitySim;
let drawBackground;
let hypothesisPhase, experimentPhase, analyzePhase;
let differentSimulationVariables;
let currentPhase = 'experiment';


function preload() {
  //backgroundImg = loadImage('background.jpg');
  experimentImg = loadImage('ExperimentImage.png');
  ballImgRed = loadImage('ballImageRed.png');
  ballImgBlue = loadImage('ballImageBlue.png');
  ballImgOrange = loadImage('ballImageOrange.png');
  progressBarVerwachting = loadImage('ProgressBarVerwachting.png'); 
  progressBarExperiment = loadImage('ProgressBarExperiment.png'); 
  progressBarControle = loadImage('ProgressBarControle.png'); 
  progressBarBewijzen = loadImage('ProgressBarBewijzen.png'); 
}


function setup() {
  createCanvas(1300, 1800);
  let textBoxWidth = width-500;
  drawBackgroundObjects = new DrawBackgroundObjects(textBoxWidth, differentSimulationVariables);
  heightTimeSim = new HeightTimeSim(textBoxWidth);
  heightVelocitySim = new HeightVelocitySim(textBoxWidth);
}

function draw() {
  drawBackgroundObjects.drawBackground();
  drawCurrentPhase();
}

function drawCurrentPhase(){
  switch (currentPhase) {
  case 'hypothesis':
    if (!hypothesisPhase) {
      hypothesisPhase = new HypothesisPhase(drawBackgroundObjects, heightTimeSim, nextPhase);
    }
    hypothesisPhase.drawHypothesisPhase();
    image(progressBarVerwachting, 20, 200);
    break;
  case 'experiment':
    if (!experimentPhase) {
      experimentPhase = new ExperimentPhase(drawBackgroundObjects, heightTimeSim, nextPhase);
    }
    experimentPhase.drawExperimentPhase();
    image(progressBarExperiment, 20, 200);
    break;
  case 'analyze':
    if (!analyzePhase) {
      analyzePhase = new AnalyzePhase(drawBackgroundObjects, heightTimeSim, nextPhase);
    }
    analyzePhase.drawAnalyzePhase();
    image(progressBarControle, 20, 200);
    break;
  default:
    console.log('CurrentPhase has a really weird value');
    break;
  }
}

function nextPhase() {
  switch (currentPhase) {
  case 'hypothesis':
    //TO DO: this needs to be the experiment
    currentPhase = 'experiment';
    break;
  case 'experiment':
    currentPhase = 'analyze';
    break;
  case 'analyze':
    currentPhase = 'proof';
    break;
  default:
    console.log('CurrentPhase has a really weird value');
    break;
  }
}
