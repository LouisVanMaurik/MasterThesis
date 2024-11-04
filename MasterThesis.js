/*

 File Name: MasterThesis.js
 Description: This code is used for my master thesis about the influence of character traits on the effect of adaptive guidance in
              in a simulation-based environment. It teached kids which factors influence the pace and time a ball falls on the moon.
              When adaptive is set to true, it also gives real-time feedback based on the user inputs in the program.
              
              Although I have some programming experience, the code written is not fully optimized
              and uses some workarounds, as my master thesis is not aimed at writing quality code. 
 
 Author: Louis van Maurik
 Contact: l.vanmaurik@student.utwente.nl
 Date Created: 01 October 2024
 Last Modified: 
 
 Dependencies:
 - p5.js
 
*/

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
  let textBoxWidth = width-500; //

  drawBackgroundObjects = new DrawBackgroundObjects(textBoxWidth, differentSimulationVariables);
  heightTimeSim = new HeightTimeSim(textBoxWidth);
  heightVelocitySim = new HeightVelocitySim(textBoxWidth);
  massTimeSim = new MassTimeSim(textBoxWidth);
  adaptiveFeedback = new AdaptiveFeedback(drawBackgroundObjects);

  currentSim = heightTimeSim;
}

function draw() {
  //Draws the backbground colors, rectangles and the exercise number in the top right corner
  drawBackgroundObjects.drawBackground(currentSim.exerciseNumber);

  //Draw each phase (phases are all a different 'page' of the program)
  drawCurrentPhase();
}

//Draw the currentPhase (creates them when for the first time or unhides DOM objects when already created)
function drawCurrentPhase() {
  switch (currentPhase) {
  case 'explain':
    if (!explainPhase) {
      explainPhase = new ExplainPhase(drawBackgroundObjects, currentSim, nextPhase);
    } else {
      explainPhase.unhideAllDomObjects();
    }
    explainPhase.drawExplainPhase();
    break;
  case 'hypothesis':
    if (!hypothesisPhase) {
      hypothesisPhase = new HypothesisPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      hypothesisPhase.unhideAllDomObjects();
    }
    hypothesisPhase.drawHypothesisPhase();
    image(progressBarVerwachting, 20, 200);
    break;
  case 'experiment':
    if (!experimentPhase) {
      experimentPhase = new ExperimentPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      experimentPhase.unhideAllDomObjects();
    }
    experimentPhase.drawExperimentPhase();
    image(progressBarExperiment, 20, 200);
    break;
  case 'analyze':
    if (!analyzePhase) {
      analyzePhase = new AnalyzePhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      analyzePhase.unhideAllDomObjects();
    }
    analyzePhase.drawAnalyzePhase();
    image(progressBarControle, 20, 200);
    break;
  case 'proof':
    if (!proofPhase) {
      proofPhase = new ProofPhase(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhase, previousPhase);
    } else {
      proofPhase.unhideAllDomObjects();
    }
    proofPhase.drawProofPhase();
    image(progressBarBewijzen, 20, 200);
    break;
  default:
    console.log('CurrentPhase has a really weird value');
    break;
  }
}

//Sets currentPhase to the nextPhase
function nextPhase() {
  currentPhase = getNextPhase(currentPhase);
}

//Sets currentPhase to the previous phase
function previousPhase() {
  currentPhase = getPreviousPhase(currentPhase);
}

//Switch the phase to the next one and returns it
//When in the last phase, go the the next exercise or to the end screen
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
    if (currentSim === heightTimeSim) {
      currentSim = heightVelocitySim;
    } else if (currentSim === heightVelocitySim) {
      currentSim = massTimeSim;
    }
    explainPhase = undefined;
    hypothesisPhase = undefined;
    experimentPhase = undefined;
    analyzePhase = undefined;
    proofPhase = undefined;
    adaptiveFeedback.resetAllCounts();

    return 'explain';
  default:
    console.error('Unexpected phase:', phase);
    return phase;
  }
}

//Switch the phase to the one previous of it and returns it
//However, you can't go back before a explain, so you can't go the previous exercise
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
