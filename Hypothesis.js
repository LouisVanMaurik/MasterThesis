class HypothesisPhase {
  constructor(drawBackgroundObjects) {
    this.drawBackgroundObjects = drawBackgroundObjects;

    this.dependentOptions = ['de hoogte van de bal', 'het gewicht van de bal'];
    this.dependentChanges = ['meer laat worden', 'minder laat worden', 'hetzelfde laat'];
    this.independentOptions = ['de tijd', 'de snelheid'];
    this.independentChanges = ['meer worden', 'minder worden', 'hetzelfde blijven'];


    // Assign dropdowns by calling createDropdown and storing the result
    this.dropdownDependentVar = this.createDropdown(this.dependentOptions, 480, 505);
    this.dropdownDependentChange = this.createDropdown(this.dependentChanges, 680, 505);
    this.dropdownIndependentVar = this.createDropdown(this.independentOptions, 490, 545);
    this.dropdownIndependentChange = this.createDropdown(this.independentChanges, 975, 545);


    this.removeButton = undefined; 
  }

  drawHypothesisPhase(currentSim) {
    //Displays the exercise textbox
    let explanation = currentSim.hypothesisExp; 
    let titleExercise = 'Opdracht ' + currentSim.exerciseNumber + '.1';
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);

    //Displays the goal textbox
    let goal = currentSim.goal;
    this.drawBackgroundObjects.drawTextBox('Wat we willen ontdekken:', goal, 400, 340);

    //Draw hypothesis box
    this.drawHypothesisBox(400, 460);
  }

  drawHypothesisBox(xpos, ypos) {
    let textsize = 20;

    //Draw background white rectangle
    fill(255);
    rect(xpos, ypos, this.drawBackgroundObjects.textBoxWidth, 140);

    //write the title
    fill(0);
    textSize(textsize);
    textStyle(BOLD);
    text('Wat we verwachten:', xpos + 10, ypos + 30);

    //Write the hypotheses
    textStyle(NORMAL);
    text('Als ik', xpos + 10, ypos + 65);
    text('dan zal          .................            wanneer de bal de grond raakt', xpos + 10, ypos + 105);

    // Create a button to remove the dropdown
    if (!this.removeButton) {
      this.removeButton = createButton('Remove Dropdown');
      this.removeButton.position(10, 40);

      // Use arrow function to retain correct 'this' context
      this.removeButton.mousePressed(this.removeDropdown.bind(this));
    }
  }

  createDropdown(options, xpos, ypos) {
    // Create and return a new dropdown
    let dropdown = createSelect();
    let defaultOption = '-- Maak een keuze --';
    
    dropdown.option(defaultOption); // Add the default option
    dropdown.selected(defaultOption); // Select the default option
  
    // Add other options
    options.forEach(option => dropdown.option(option));
  
    // Disable the default option
    dropdown.elt[0].disabled = true; // Disable the first option by accessing DOM element directly
  
    // Set the position
    dropdown.position(xpos, ypos);
    
   // Set custom styles for the dropdown
    dropdown.style('font-size', '16px'); // Set font size of the text
    dropdown.style('width', '190px'); // Set width of the dropdown
    dropdown.style('height', '30px'); // Set height of the dropdown
  
    return dropdown; // Return the created dropdown
  }

  removeDropdown() {
    // Remove the dropdown elements from the DOM
    if (this.dropdownDependentVar) this.dropdownDependentVar.remove();
    if (this.dropdownIndependentVar) this.dropdownIndependentVar.remove();
  }
}
