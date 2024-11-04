class AnalyzePhase {
  constructor(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhaseMethod, previousPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.adaptiveFeedback = adaptiveFeedback;
    this.nextPhaseMethod = nextPhaseMethod;
    this.previousPhaseMethod = previousPhaseMethod;

    //Options slection menus
    this.variableOptions = this.currentSim.variableOptions;
    this.dependentChanges = ['meer liet worden', 'minder liet worden', 'hetzelfde liet'];
    this.independentChanges = ['meer worden', 'minder worden', 'hetzelfde blijven'];
    this.hypothesisCheck = ['waar', 'niet waar'];

    // Define options for dropdown menus
    this.createDropdowns();
    this.allSelected = false;
    this.nextButton = this.createNextButton();
    this.previousButton = this.createPreviousButton();
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
    return this.drawBackgroundObjects.createButton('Ga naar bewijzen', this.doNextButton.bind(this), 895, 770, '300px', '60px');
  }

  createPreviousButton() {
    return this.drawBackgroundObjects.createButton('Ga terug', this.doPreviousButton.bind(this), 695, 770, '150px', '60px');
  }

  // Main method to draw the analyze phase
  drawAnalyzePhase() {
    this.drawTitle();
    this.drawExerciseBox();
    this.drawGoalBox();
    this.drawExpectedOutcomeBox();
    this.drawAnalyzeBox(400, 550);
    this.drawResultBox();

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
    this.drawBackgroundObjects.drawTextBox('Wat je had verwacht:', hypothesis, 400, 420);
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
    text('Dus mijn verwachting was', xpos + 10, ypos + 155);
    text('.', xpos + 550, ypos + 155);
  }

  drawResultBox() {
    const textsize = 20;
    const xpos = 400;
    const ypos = 950;
    const columnTitles = ['Test', 'Massa (KG)', 'Hoogte (M)', 'Kleur', 'Tijd (S)', 'Snelheid (M/S)']; // Add "Test" column

    // Calculate the length of the array (number of rows)
    const LENGTHOFARRAY = this.currentSim.results.length;

    // Calculate the height of the box dynamically based on array length
    const rowHeight = 30; // Height per row of data
    const boxHeight = 45 + rowHeight * (LENGTHOFARRAY + 1); // +1 for the title row

    // Draw background box for results
    fill(36, 106, 115);
    rect(xpos, ypos, this.drawBackgroundObjects.textBoxWidth, boxHeight, 30);

    // Draw result box title
    fill(255);
    textSize(textsize);
    textStyle(BOLD);
    textAlign(CENTER);
    text('Resultaten:', xpos + this.drawBackgroundObjects.textBoxWidth / 2, ypos + 30);

    // Set up for drawing column titles
    textSize(20);
    textStyle(BOLD);

    // Define the column widths for each of the 6 columns (including "Test")
    const colWidth = this.drawBackgroundObjects.textBoxWidth / 6;

    // Draw the column titles, including "Test" as the first one
    for (let i = 0; i < columnTitles.length; i++) {
      text(columnTitles[i], xpos + colWidth * i + 50, ypos + 60); // Adjusted position for title
    }

    // Set text to normal style for the results
    textStyle(NORMAL);

    // Draw each element in its respective column
    for (let i = 0; i < LENGTHOFARRAY; i++) {
      const resultRow = this.currentSim.results[i];

      // Draw the test number in the first column (starting at #1)
      text('#' + (i+1), xpos + 50, ypos + 90 + (i * rowHeight)); // First column for test number

      // Draw the rest of the results in their respective columns
      for (let j = 0; j < resultRow.length; j++) {
        text(resultRow[j], xpos + colWidth * (j + 1) + 50, ypos + 90 + (i * rowHeight)); // Adjust for the additional column
      }
    }

    textAlign(LEFT);
  }

  // Check if all dropdowns have a selection to enable/disable the next button and change its color
  updateAllSelected() {
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

  // Updates the color of the nextButton when all dropdownmenus are selected
  updateNextButtonStyle() {
    if (this.allSelected) {
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)');
    }
  }

  //calls the callback function of the main class to go to phase button when allSelected is true, and no feedback needs to be given
  doNextButton() {
    this.currentSim.setEvidence();

    const results = this.currentSim.results;
    const givenIndVar = this.currentSim.getGivenIndVar();
    const givenDepVar = this.currentSim.getGivenDepVar();
    const givenIndVarChange = this.currentSim.getGivenIndVarChange();
    const givenDepVarChange = this.currentSim.getGivenDepVarChange();
    const givenIndVarCheck = this.currentSim.getGivenIndVarCheck();
    const givenDepVarCheck = this.currentSim.getGivenDepVarCheck();
    const givenIndVarChangeCheck = this.currentSim.getGivenIndVarChangeCheck();
    const givenDepVarChangeCheck = this.currentSim.getGivenDepVarChangeCheck();
    const reqDepVar = this.currentSim.getReqDepVar();
    const reqIndVar = this.currentSim.getReqIndVar();
    const hypothesisCheck = this.currentSim.getHypothesisCheck();

    if (this.allSelected) {
      if (this.adaptiveFeedback.giveAdaptiveFeedbackAnalyzePhase(results, givenIndVar, givenDepVar, givenIndVarChange, givenDepVarChange, 
      givenIndVarCheck, givenDepVarCheck, givenIndVarChangeCheck, givenDepVarChangeCheck, reqDepVar, reqIndVar, hypothesisCheck,
      this.dropdownIndependentVarCheck, this.dropdownIndependentChangeCheck, this.dropdownDependentVarCheck, 
      this.dropdownDependentChangeCheck, this.dropdownHypothesisCheck)) {
        
        this.hideAllDomObjects();
        this.nextPhaseMethod();
      }
    }
  }

  doPreviousButton() {
    this.hideAllDomObjects();
    this.previousPhaseMethod();
  }

  hideAllDomObjects() {
    this.dropdownIndependentVarCheck.hide();
    this.dropdownIndependentChangeCheck.hide();
    this.dropdownDependentVarCheck.hide();
    this.dropdownDependentChangeCheck.hide();
    this.dropdownHypothesisCheck.hide();
    this.nextButton.hide();
    this.previousButton.hide();
  }

  unhideAllDomObjects() {
    this.dropdownIndependentVarCheck.show();
    this.dropdownIndependentChangeCheck.show();
    this.dropdownDependentVarCheck.show();
    this.dropdownDependentChangeCheck.show();
    this.dropdownHypothesisCheck.show();
    this.nextButton.show();
    this.previousButton.show();
  }
}
