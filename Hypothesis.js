class HypothesisPhase {
  constructor(drawBackgroundObjects) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.dropdown = createSelect(); 
    this.dropdown.option("orange"); 
    this.dropdown.option("green"); 
    this.dropdown.option("skyblue"); 
    this.dropdown.position(100, 100);
    this.removeButton = undefined; 
  }
  
  drawHypothesisPhase(currentSim){
    //Displays the exercise textbox
    let explanation = currentSim.hypothesisExp; 
    let titleExercise = 'Opdracht ' + currentSim.exerciseNumber + '.1'
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
    
    //Displays the goal textbox
    let goal = currentSim.goal;
    this.drawBackgroundObjects.drawTextBox('Wat we willen ontdekken:', goal, 400, 340);
    
    //Draw hypothesis box
    this.drawBackgroundObjects.drawHypothesisBox(400, 460);
    
    
    // Create a button to remove the dropdown
    if (!this.removeButton) {
      this.removeButton = createButton('Remove Dropdown');
      this.removeButton.position(10, 40);
      
      // Use arrow function to retain correct 'this' context
      this.removeButton.mousePressed(() => this.removeDropdown());
    }
  }
  
  removeDropdown() {
  // Remove the dropdown element from the DOM
  this.dropdown.remove();
}
}
