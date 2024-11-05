class HypothesisPhase {
  constructor(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhaseMethod, previousPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.adaptiveFeedback = adaptiveFeedback;
    this.nextPhaseMethod = nextPhaseMethod;
    this.previousPhaseMethod = previousPhaseMethod;

    // Define options for dropdown menus
    this.variableOptions = this.currentSim.getVariableOptions();

    this.dependentChanges = ['meer laat worden', 'minder laat worden', 'hetzelfde laat'];
    this.independentChanges = ['meer worden', 'minder worden', 'hetzelfde blijven'];

    // Create dropdowns
    this.createDropdowns();

    this.allSelected = false;
    this.nextButton = this.createNextButton();
    this.previousButton = this.createPreviousButton();
  }

  createDropdowns() {
    // Create independent and dependent variable dropdowns
    this.dropdownIndependentVar = this.drawBackgroundObjects.createDropdown(this.variableOptions, 490, 505, 'givenIndVar', this.currentSim);
    this.dropdownIndependentChange = this.drawBackgroundObjects.createDropdown(this.dependentChanges, 770, 505, 'givenIndVarChange', this.currentSim);
    this.dropdownDependentVar = this.drawBackgroundObjects.createDropdown(this.variableOptions, 510, 545, 'givenDepVar', this.currentSim);
    this.dropdownDependentChange = this.drawBackgroundObjects.createDropdown(this.independentChanges, 790, 545, 'givenDepVarChange', this.currentSim);
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Ga naar experiment', this.doNextButton.bind(this), 895, 650, '300px', '60px');
  }

  createPreviousButton() {
    return this.drawBackgroundObjects.createButton('Ga terug', this.doPreviousButton.bind(this), 695, 650, '150px', '60px');
  }

  // Main method to draw the hypothesis phase
  drawHypothesisPhase() {
    this.drawTitle();
    this.drawExplanation();
    this.drawGoal();
    this.drawHypothesisBox(400, 460);

    this.updateAllSelected();
    this.updateNextButtonStyle();
  }

  drawTitle() {
    fill(255);
    textSize(50);
    textStyle(BOLD);
    text('Onderzoeksfase: Verwachting', 350, 70);
  }

  // Draws the exercise box with an explanation
  drawExplanation() {
    const explanation = this.currentSim.hypothesisExp;
    const titleExercise = 'Opdracht ' + this.currentSim.exerciseNumber + '.1';
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
  }

  drawGoal() {
    const goal = this.currentSim.goal;
    this.drawBackgroundObjects.drawTextBox('Wat we willen ontdekken:', goal, 400, 340);
  }

  drawHypothesisBox(xpos, ypos) {
    const textsize = 20;

    // Draw hypothesis background box
    fill(255);
    rect(xpos, ypos, this.drawBackgroundObjects.textBoxWidth, 140);

    // Draw hypothesis title
    fill(0);
    textSize(textsize);
    textStyle(BOLD);
    text('Wat we verwachten:', xpos + 10, ypos + 30);

    // Draw hypothesis structure text
    textStyle(NORMAL);
    text('Als ik de', xpos + 10, ypos + 65);
    text(',', xpos + 650, ypos + 65);
    text('dan zal de ', xpos + 10, ypos + 105);
    text('.', xpos + 670, ypos + 105);
  }

  updateAllSelected() {
    // Check if all dropdowns have a selection to enable/disable the next button
    this.allSelected = this.currentSim.getGivenIndVar() &&
      this.currentSim.getGivenDepVar() &&
      this.currentSim.getGivenIndVarChange() &&
      this.currentSim.getGivenDepVarChange();
  }

  updateNextButtonStyle() {
    // Update next button style when all selections are made
    if (this.allSelected) {
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); // Gradient orange effect
    }
  }

  //calls the callback function of the main class to go to next phase when allSelected is true, and no feedback needs to be given
  doNextButton() {

    this.currentSim.setHypothesis();

    if (this.allSelected) {
      const goal = this.currentSim.goal;
      const reqIndVar = this.currentSim.getReqIndVar();
      const reqDepVar = this.currentSim.getReqDepVar();
      const givenIndVar = this.currentSim.getGivenIndVar();
      const givenDepVar = this.currentSim.getGivenDepVar();
      const indVariableOptions = this.currentSim.getIndVariableOptions();
      const depVariableOptions = this.currentSim.getDepVariableOptions();
      const dropdownIndependentVar = this.dropdownIndependentVar;
      const dropdownDependentVar = this.dropdownDependentVar;

      if (!adaptive || this.adaptiveFeedback.giveAdaptiveFeedbackHypothesisPhase(goal, reqIndVar, reqDepVar, givenIndVar, givenDepVar, indVariableOptions, depVariableOptions, dropdownIndependentVar, dropdownDependentVar)) {
        // Remove dropdowns from DOM
        this.hideAllDomObjects();

        // Proceed to the next phase
        this.nextPhaseMethod();
      }
    }
  }

  doPreviousButton() {
    this.hideAllDomObjects();
    this.previousPhaseMethod();
  }

  hideAllDomObjects() {
    this.dropdownDependentVar.hide();
    this.dropdownDependentChange.hide();
    this.dropdownIndependentVar.hide();
    this.dropdownIndependentChange.hide();
    this.nextButton.hide();
    this.previousButton.hide();
  }

  unhideAllDomObjects() {
    this.dropdownDependentVar.show();
    this.dropdownDependentChange.show();
    this.dropdownIndependentVar.show();
    this.dropdownIndependentChange.show();
    this.nextButton.show();
    this.previousButton.show();
  }
}
