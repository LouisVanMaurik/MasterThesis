class AnalyzePhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    //Options slection menus
    this.variableOptions = this.currentSim.variableOptions;
    this.dependentChanges = ['meer liet worden', 'minder liet worden', 'hetzelfde liet'];
    this.independentChanges = ['meer worden', 'minder worden', 'hetzelfde blijven'];
    this.hypothesisCheck = ['waar', 'niet waar'];

    // Define options for dropdown menus
    this.createDropdowns();
    this.allSelected = false;
    this.nextButton = this.createNextButton();
  }

  // Create all drow
  createDropdowns() {
    // Create independent and dependent variable dropdowns
    this.dropdownIndependentVarCheck = this.drawBackgroundObjects.createDropdown(this.variableOptions, 510, 595, 'givenIndVarCheck', this.currentSim);
    this.dropdownIndependentChangeCheck = this.drawBackgroundObjects.createDropdown(this.dependentChanges, 790, 595, 'givenIndVarChangeCheck', this.currentSim);
    this.dropdownDependentVarCheck = this.drawBackgroundObjects.createDropdown(this.variableOptions, 485, 635, 'givenDepVarCheck', this.currentSim);
    this.dropdownDependentChangeCheck = this.drawBackgroundObjects.createDropdown(this.independentChanges, 765, 635, 'givenDepVarChangeCheck', this.currentSim);
    this.dropdownHypothesisCheck = this.drawBackgroundObjects.createDropdown(this.hypothesisCheck, 665, 685, 'hypothesisCheck', this.currentSim);
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Ga naar bewijzen', this.removeDropdown.bind(this), 895, 770);
  }

  // Main method to draw the analyze phase
  drawAnalyzePhase() {
    this.drawTitle();
    this.drawExerciseBox();
    this.drawGoalBox();
    this.drawExpectedOutcomeBox();
    this.drawAnalyzeBox(400, 550);

    this.updateAllSelected();
    this.updateNextButtonStyle();
  }

  // Draws the title for the analyze phase
  drawTitle() {
    fill(255);
    textSize(40);
    textStyle(BOLD);
    text('Onderzoeksfase: Verwachting controleren', 350, 70);
  }

  // Draws the exercise box with an explanation
  drawExerciseBox() {
    const titleExercise = 'Opdracht ' + this.currentSim.exerciseNumber + '.3';
    const explanation = this.currentSim.analyzeExp;
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
  }

  // Draws the goal box
  drawGoalBox() {
    const goal = this.currentSim.goal;
    this.drawBackgroundObjects.drawTextBox('Wat we wilden ontdekken:', goal, 400, 300);
  }

  // Draws the expected outcome (hypothesis) box
  drawExpectedOutcomeBox() {
    const hypothesis = this.currentSim.getHypothesis();
    this.drawBackgroundObjects.drawTextBox('Wat we hadden verwacht:', hypothesis, 400, 420);
  }

  drawAnalyzeBox(xpos, ypos) {
    const textsize = 20;

    // Draw hypothesis background box
    fill(255);
    rect(xpos, ypos, this.drawBackgroundObjects.textBoxWidth, 180);

    // Draw hypothesis title
    fill(0);
    textSize(textsize);
    textStyle(BOLD);
    text('Wat er gebeurde:', xpos + 10, ypos + 30);

    // Draw hypothesis structure text
    textStyle(NORMAL);
    text('Toen ik de', xpos + 10, ypos + 65);
    text(',', xpos + 670, ypos + 65);
    text('ging de ', xpos + 10, ypos + 105);
    text('.', xpos + 645, ypos + 105);
    text('Dus me verwachting bleek', xpos + 10, ypos + 155);
    text('te zijn.', xpos + 550, ypos + 155);
  }

  updateAllSelected() {
    // Check if all dropdowns have a selection to enable/disable the next button
    if (this.currentSim.getGivenIndVarCheck() !== undefined &&
      this.currentSim.getGivenDepVarCheck() !== undefined &&
      this.currentSim.getGivenIndVarChangeCheck() !== undefined &&
      this.currentSim.getGivenDepVarChangeCheck() !== undefined &&
      this.currentSim.getHypothesisCheck() !== undefined) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
  }

  updateNextButtonStyle() {
    if (this.allSelected) {
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)');
    }
  }

  removeDropdown() {
    if (this.allSelected) {
      this.dropdownIndependentVarCheck?.remove();
      this.dropdownIndependentChangeCheck?.remove();
      this.dropdownDependentVarCheck?.remove();
      this.dropdownDependentChangeCheck.remove();
      this.dropdownHypothesisCheck?.remove();
      this.nextButton?.remove();

      this.nextPhaseMethod();
    }
  }
}
