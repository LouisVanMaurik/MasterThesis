class HypothesisPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    // Define options for dropdown menus
    this.variableOptions = this.currentSim.variableOptions;

    this.dependentChanges = ['meer laat worden', 'minder laat worden', 'hetzelfde laat'];
    this.independentChanges = ['meer worden', 'minder worden', 'hetzelfde blijven'];

    // Create dropdowns
    this.createDropdowns();

    this.allSelected = false;
    this.nextButton = this.createNextButton();
  }

  createDropdowns() {
    // Create independent and dependent variable dropdowns
    this.dropdownIndependentVar = this.drawBackgroundObjects.createDropdown(this.variableOptions, 490, 505, 'givenIndVar', this.currentSim);
    this.dropdownIndependentChange = this.drawBackgroundObjects.createDropdown(this.dependentChanges, 770, 505, 'givenIndVarChange', this.currentSim);
    this.dropdownDependentVar = this.drawBackgroundObjects.createDropdown(this.variableOptions, 510, 545, 'givenDepVar', this.currentSim);
    this.dropdownDependentChange = this.drawBackgroundObjects.createDropdown(this.independentChanges, 790, 545, 'givenDepVarChange', this.currentSim);
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Ga naar experiment', this.removeDropdown.bind(this), 895, 650);
  }

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
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); // Gradient effect for 3D look
    }
  }

  removeDropdown() {
    this.currentSim.setHypothesis();

    if (this.allSelected) {
      // Remove dropdowns from DOM
      this.dropdownDependentVar?.remove();
      this.dropdownDependentChange?.remove();
      this.dropdownIndependentVar?.remove();
      this.dropdownIndependentChange?.remove();
      this.nextButton?.remove();

      // Proceed to the next phase
      this.nextPhaseMethod();
    }
  }
}
