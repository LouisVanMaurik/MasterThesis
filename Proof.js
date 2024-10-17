class ProofPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    this.ProofBoxXpos = 400;
    this.ProofBoxYpos = 450;

    // Create an array to store the checkboxes so we can reference them later if needed
    this.checkboxes = [];
    this.createCheckBoxes();
  }

  createCheckBoxes() {
    // Calculate the height of the box dynamically based on array length
    const rowHeight = 30; // Height per row of data
    const boxHeight = 40 + rowHeight * (this.currentSim.results.length + 1); // +1 for the title row

    // Define the xpos and ypos of the checkboxes
    const xpos = this.ProofBoxXpos + 30; // Move 5 pixels to the left
    const ypos = this.ProofBoxYpos + 65; // Move 20 pixels down

    // Draw each checkbox and place it inside the canvas
    for (let i = 0; i < this.currentSim.results.length; i++) {
      let checkbox = createCheckbox('', false);  // Use p5.js method to create a checkbox
      checkbox.position(xpos, ypos + (i * rowHeight));  // Position checkbox inside the canvas

      // Make the checkbox twice as big using CSS transform
      checkbox.style('transform', 'scale(2)');
      checkbox.style('transform-origin', 'left top');  // Ensure it scales from the top-left corner

      this.checkboxes.push(checkbox); // Store reference to the checkbox
    }
  }

  // Main method to draw the analyze phase
  drawProofPhase() {
    this.drawTitle();
    this.drawExerciseBox();
    this.drawOutcomeBox();
    this.drawProofBox();
    
    //TEST CODE TO SEE WHICH CHECKBOXES ARE SELECTED
    //let theString = '';
    //for (let i = 0; i < this.checkboxes.length; i++) {
    //  let isChecked = this.checkboxes[i].checked();  // Check if the checkbox is checked
    //  theString = theString + '   ' + i + ': ' + isChecked;
    //}
    //console.log(theString);
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

      text('#' + (i+1), xpos + 50, ypos + 90 + (i * rowHeight)); // First column for test number

      // Draw the rest of the results in their respective columns
      for (let j = 0; j < resultRow.length; j++) {
        text(resultRow[j], xpos + colWidth * (j + 1) + 50, ypos + 90 + (i * rowHeight)); // Adjust for the additional column
      }
    }

    textAlign(LEFT);
  }
  
  // // Method to check the status of each checkbox
  //checkCheckboxesStatus() {
  //  for (let i = 0; i < this.checkboxes.length; i++) {
  //    let isChecked = this.checkboxes[i].checked();  // Check if the checkbox is checked
  //    console.log(`Checkbox ${i+1} is ${isChecked ? 'checked' : 'unchecked'}`);
  //  }
  //}
}
