let heightTimeSim;
let heightVelocitySim;
let drawBackground;
let explainPhase, hypothesisPhase, experimentPhase, analyzePhase, proofPhase;
let differentSimulationVariables;
let currentPhase = 'explain';


function preload() {
  //backgroundImg = loadImage('background.jpg');
  experimentImg = loadImage('ExperimentImage.png');
  ballImgRed = loadImage('ballImageRed.png');
  ballImgBlue = loadImage('ballImageBlue.png');
  ballImgOrange = loadImage('ballImageOrange.png');
  stopwatch = loadImage('stopwatch.png');
  scientistWithNameImg = loadImage('clipartProfessorWithName.png');
  progressBarVerwachting = loadImage('ProgressBarVerwachting.png');
  progressBarExperiment = loadImage('ProgressBarExperiment.png');
  progressBarControle = loadImage('ProgressBarControle.png');
  progressBarBewijzen = loadImage('ProgressBarBewijzen.png');
  explanationVideo = createImg("explanationVideo.gif");
}


function setup() {
  createCanvas(1300, 1800);
  let textBoxWidth = width-500;
  drawBackgroundObjects = new DrawBackgroundObjects(textBoxWidth, differentSimulationVariables);
  heightTimeSim = new HeightTimeSim(textBoxWidth);
  heightVelocitySim = new HeightVelocitySim(textBoxWidth);
  massTimeSim = new MassTimeSim(textBoxWidth);
  adaptiveFeedback = new AdaptiveFeedback(drawBackgroundObjects);

  currentSim = heightTimeSim;
}

function draw() {
  drawBackgroundObjects.drawBackground();
  drawExerciseNumber();
  drawCurrentPhase();
}

function drawCurrentPhase() {
  switch (currentPhase) {
  case 'explain':
    if (!explainPhase) {
      explainPhase = new ExplainPhase(drawBackgroundObjects, currentSim, nextPhase);
    } else {
      explainPhase.unhide();
    }
    explainPhase.drawExplainPhase();
    break;
  case 'hypothesis':
    if (!hypothesisPhase) {
      hypothesisPhase = new HypothesisPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      hypothesisPhase.unhide();
    }
    hypothesisPhase.drawHypothesisPhase();
    image(progressBarVerwachting, 20, 200);
    break;
  case 'experiment':
    if (!experimentPhase) {
      experimentPhase = new ExperimentPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      experimentPhase.unhide();
    }
    experimentPhase.drawExperimentPhase();
    image(progressBarExperiment, 20, 200);
    break;
  case 'analyze':
    if (!analyzePhase) {
      analyzePhase = new AnalyzePhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      analyzePhase.unhide();
    }
    analyzePhase.drawAnalyzePhase();
    image(progressBarControle, 20, 200);
    break;
  case 'proof':
    if (!proofPhase) {
      proofPhase = new ProofPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      proofPhase.unhide();
    }
    proofPhase.drawProofPhase();
    image(progressBarBewijzen, 20, 200);
    break;
  default:
    console.log('CurrentPhase has a really weird value');
    break;
  }
}

function nextPhase() {
  currentPhase = getNextPhase(currentPhase);
}

function previousPhase() {
  currentPhase = getPreviousPhase(currentPhase);
}

function getNextPhase(phase) {
  switch (phase) {
  case 'explain':
    return 'hypothesis';
  case 'hypothesis':
    return 'experiment';
  case 'experiment':
    return 'analyze';
  case 'analyze':
    return 'proof';
  case 'proof':
    if (currentSim === heightTimeSim){
    currentSim = heightVelocitySim;
    } else if (currentSim === heightVelocitySim){
      currentSim = massTimeSim;
    }
    explainPhase = undefined;
    hypothesisPhase = undefined;
    experimentPhase = undefined;
    analyzePhase = undefined;
    proofPhase = undefined;
    return 'explain';
  default:
    console.error('Unexpected phase:', phase);
    return phase;
  }
}

function getPreviousPhase(phase) {
  switch (phase) {
  case 'hypothesis':
    return 'explain';
  case 'experiment':
    return 'hypothesis';
  case 'analyze':
    return 'experiment';
  case 'proof':
    return 'analyze';
  default:
    console.error('Unexpected phase:', phase);
    return phase;
  }
}

function drawExerciseNumber() {
  fill(255);
  textSize(50);
  textStyle(BOLD);
  text(currentSim.exerciseNumber + '/3', width-100, 70);
}
