class ProofPhase {
  constructor(drawBackgroundObjects, currentSim, adaptiveFeedback, nextPhaseMethod, previousPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.adaptiveFeedback = adaptiveFeedback;
    this.nextPhaseMethod = nextPhaseMethod;
    this.previousPhaseMethod = previousPhaseMethod;

    this.ProofBoxXpos = 400;
    this.ProofBoxYpos = 450;

    // Create an array to store the checkboxes so we can reference them later if needed
    this.checkboxes = [];
    this.createCheckBoxes();

    this.nextButton = this.createNextButton();
    this.nextButtonXpos = 895;
    this.nextButtonYpos = 590;
    this.previousButton = this.createPreviousButton();
    this.previousButtonXpos = 695;
    this.previousButtonYpos = 590;
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Volgende', this.doNextButton.bind(this), this.nextButtonXpos, this.nextButtonYpos, '300px', '60px');
  }

  createPreviousButton() {
    return this.drawBackgroundObjects.createButton('Ga terug', this.doPreviousButton.bind(this), this.previousButtonXpos, this.previousButtonYpos, '150px', '60px');
  }

  createCheckBoxes() {
    // Calculate the height of the box dynamically based on array length
    const rowHeight = 30; // Height per row of data
    const boxHeight = 40 + rowHeight * (this.currentSim.results.length + 1); // +1 for the title row

    // Define the xpos and ypos of the checkboxes
    const xpos = this.ProofBoxXpos + 30; // Move 5 pixels to the left
    const ypos = this.ProofBoxYpos + 65; // Move 20 pixels down

    // Draw each checkbox and place it inside the canvas
    // NOTE: It lopes from the length of checkboxes. If there are already some checkboxes made, it should not make new one on top of it
    //       This makes sure you can add results, even though the proof class was already created
    for (let i = this.checkboxes.length; i < this.currentSim.results.length; i++) {
      let checkbox = createCheckbox('', false);  // Use p5.js method to create a checkbox
      checkbox.position(xpos, ypos + (i * rowHeight));  // Position checkbox inside the canvas

      // Make the checkbox twice as big using CSS transform
      checkbox.style('transform', 'scale(2)');
      checkbox.style('transform-origin', 'left top');  // Ensure it scales from the top-left corner

      this.checkboxes.push(checkbox); // Store reference to the checkbox
    }
  }

  // Main method to draw the proof phase
  drawProofPhase() {
    this.drawTitle();
    this.drawExerciseBox();
    this.drawOutcomeBox();
    this.drawProofBox();
    this.updateButtons();
  }

  // Draws the title for the analyze phase
  drawTitle() {
    fill(255);
    textSize(40);
    textStyle(BOLD);
    text('Onderzoeksfase: Verwachting bewijzen', 350, 70);
  }

  // Draws the exercise box with an explanation
  drawExerciseBox() {
    const titleExercise = 'Opdracht ' + this.currentSim.exerciseNumber + '.4';
    const explanation = this.currentSim.proofExp;
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
  }

  drawOutcomeBox() {
    const hypothesis = this.currentSim.getEvidence();
    this.drawBackgroundObjects.drawTextBox('Wat er gebeurde:', hypothesis, 400, 310);
  }

  drawProofBox() {
    const textsize = 20;
    const xpos = this.ProofBoxXpos; //
    const ypos = this.ProofBoxYpos; //Height of the box
    const columnTitles = ['Test', 'Massa (KG)', 'Hoogte (M)', 'Kleur', 'Tijd (S)', 'Snelheid (M/S)']; // Add "Test" column

    // Calculate the height of the box dynamically based on array length
    const rowHeight = 30; // Height per row of data
    const boxHeight = 45 + rowHeight * (this.currentSim.results.length + 1); // +1 for the title row

    // Draw background box for results
    fill(36, 106, 115);
    rect(xpos, ypos, this.drawBackgroundObjects.textBoxWidth, boxHeight, 30);

    // Draw hypothesis title
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
    for (let i = 0; i < this.currentSim.results.length; i++) {
      const resultRow = this.currentSim.results[i];
      for (let j = 0; j < resultRow.length; j++) {
        text(resultRow[j], xpos + colWidth * (j + 1) + 50, ypos + 90 + (i * rowHeight)); // Adjust for the additional column
      }
    }

    textAlign(LEFT);
  }

  doPreviousButton() {
    this.hideAllDomObjects();
    this.previousPhaseMethod();
  }

  //calls the callback function of the main class to go to next phase button when checkOneIsChecked is true, and no feedback needs to be given
  doNextButton() {
    if (this.checkOneIsChecked() && this.adaptiveFeedback.giveAdaptiveFeedbackProofPhase(
      this.currentSim.results, this.currentSim.getReqIndVar(), this.currentSim.getIndVariableOptions(), this.checkboxes)) {
      this.hideAllDomObjects();
      this.nextPhaseMethod();
    }
  }

  hideAllDomObjects() {
    //delete all checkboxes
    for (let i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].hide();
    }

    //delete the buttons
    this.nextButton.hide();
    this.previousButton.hide();
  }

  unhideAllDomObjects() {
    for (let i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].show();
    }

    this.createCheckBoxes();


    //delete the buttons
    this.nextButton.show();
    this.previousButton.show();
  }

  //The postions and coloring of the button is done over and over, as it can be that there are more results added by going back or that all boxes get unselected
  updateButtons() {
    //Update the color of the nextbutton
    if (this.checkOneIsChecked()) {
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); //Make orange
    } else {
      this.nextButton.style('background', 'linear-gradient(to bottom, #A9A9A9, #696969)'); //Make gray
    }

    //Update the position of the previousButton and the nextButton based on the length of the results
    this.nextButton.position(this.nextButtonXpos, this.nextButtonYpos  + (30*this.currentSim.results.length));
    this.previousButton.position(this.previousButtonXpos, this.previousButtonYpos  + (30*this.currentSim.results.length));
  }

  // Method to check if atleast one of the checkboxes is checked, if not return false
  checkOneIsChecked() {
    for (let i = 0; i < this.checkboxes.length; i++) {
      let isChecked = this.checkboxes[i].checked();  // Check if the checkbox is checked
      if (isChecked) {
        return true;
      }
    }
    return false;
  }
}
