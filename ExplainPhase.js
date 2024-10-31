class ExplainPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    this.nextButton = this.createNextButton();
    this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); // Gradient effect for 3D look
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Aan de slag', this.doNextButton.bind(this), 895, 450, '300px', '60px');
  }

  drawExplainPhase() {
    this.drawTitle();
    this.drawExplanation();
    image(scientistWithNameImg, 160, 220);    
    explanationVideo.position(400, 475);
    fill(36, 106, 115);
    rect(400-20, 475-20, 440, 280, 30);
  }

  drawTitle() {
    fill(255);
    textSize(50);
    textStyle(BOLD);
    text('Onderzoek ' + this.currentSim.exerciseNumber, 350, 70);
  }

  drawExplanation() {
    const explanation = this.currentSim.getSimExp();
    const titleExercise = 'Opdracht ' + this.currentSim.exerciseNumber;
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
  }

  doNextButton() {
    this.nextButton?.hide();
    explanationVideo.hide();
    this.nextPhaseMethod();
  }
  
  unhide(){
    this.nextButton.show();
    explanationVideo.show();
  }
}
