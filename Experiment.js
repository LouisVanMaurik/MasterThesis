class ExperimentPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    this.experimentXpos = 800;
    this.experimentYpos = 550;
    this.xpos = this.experimentXpos+225;
    this.ypos = this.experimentYpos+275;
    //this.colorBall = [geen, red, blue];

    //Creates all experiment options buttons
    this.weightOneButton = this.createOptionButton('1KG', this.setBallWeightToOne.bind(this), this.experimentXpos-350+100, this.experimentYpos+10);
    this.weightFiveButton = this.createOptionButton('5KG', this.setBallWeightToFive.bind(this), this.experimentXpos-280+100, this.experimentYpos+10);
    this.weightTenButton = this.createOptionButton('10KG', this.setBallWeightToTen.bind(this), this.experimentXpos-210+100, this.experimentYpos+10);
    this.hightTenButton = this.createOptionButton('10M', this.setBallHeightToTen.bind(this), this.experimentXpos-350+100, this.experimentYpos + 100);
    this.hightTwentyButton = this.createOptionButton('20M', this.setBallHeightToTwenty.bind(this), this.experimentXpos-280+100, this.experimentYpos + 100);
    this.hightThirtyButton = this.createOptionButton('30M', this.setBallHeightToThirty.bind(this), this.experimentXpos-210+100, this.experimentYpos + 100);
    this.redBallButton = this.createOptionButton('Rood', this.setBallcolorRed.bind(this), this.experimentXpos-350+100, this.experimentYpos + 190);
    this.blueBallButton = this.createOptionButton('Blauw', this.setBallcolorBlue.bind(this), this.experimentXpos-280+100, this.experimentYpos + 190);
    this.orangeBallButton = this.createOptionButton('Oranje', this.setBallcolorOrange.bind(this), this.experimentXpos-210+100, this.experimentYpos + 190);

    this.previousHeightSet = 0;

    this.setBallcolorRed();
    this.setBallHeightToTen();
    this.setBallWeightToOne();


    this.didOneExperiment = false;
    this.experimentButton = this.createExperimentButton(this.doExperimentButton.bind(this));
    this.nextButton = this.createNextButton();
  }

  createNextButton() {
    return this.drawBackgroundObjects.createButton('Ga naar controle', this.doNextButton.bind(this), 895, 1100);
  }

  drawExperimentPhase() {
    this.drawTitle();
    this.drawExerciseBox();
    this.drawGoalBox();
    this.drawExpectedOutcomeBox();
    image(experimentImg, this.experimentXpos, this.experimentYpos);
    this.drawExperiment();
    this.drawButtonBoxes();
  }

  // Draws the title for the analyze phase
  drawTitle() {
    fill(255);
    textSize(50);
    textStyle(BOLD);
    text('Onderzoeksfase: Experiment', 350, 70);
  }

  // Draws the exercise box with an explanation
  drawExerciseBox() {
    const titleExercise = 'Opdracht ' + this.currentSim.exerciseNumber + '.3';
    const explanation = this.currentSim.experimentExp;
    this.drawBackgroundObjects.drawTextBox(titleExercise, explanation, 400, 150);
  }

  // Draws the goal box
  drawGoalBox() {
    const goal = this.currentSim.goal;
    this.drawBackgroundObjects.drawTextBox('Wat we willen ontdekken:', goal, 400, 300);
  }

  // Draws the expected outcome (hypothesis) box
  drawExpectedOutcomeBox() {
    const hypothesis = this.currentSim.getHypothesis();
    this.drawBackgroundObjects.drawTextBox('Wat we verwachten:', hypothesis, 400, 420);
  }

  drawButtonBoxes() {
    //Draw boxes around the buttons
    fill(36, 106, 115);
    rect(400, this.experimentYpos, 370, 80);
    rect(400, this.experimentYpos + 90, 370, 80);
    rect(400, this.experimentYpos + 180, 370, 80);

    fill(255);
    textSize(30);
    textStyle(BOLD);
    text('Massa:', 420, this.experimentYpos+50);
    text('Hoogte:', 420, this.experimentYpos+140);
    text('Kleur:', 420, this.experimentYpos+230);
  }

  drawExperiment() {
    image(this.currentBallColor, this.xpos, this.ypos);
    textAlign(CENTER);
    fill(255);
    console.log('The weight of the ball in draw is now: ' + this.weightBall);

    text(this.weightBall + 'KG', this.xpos+30, this.ypos+38);
    textAlign(LEFT);
    if (this.ypos <= this.experimentXpos+90) {
      this.ypos++
    }
  }

  setBallcolorRed() {
    this.currentBallColor = ballImgRed; // Makes the ball red by selecting the according button
    this.makeSelectedButton(this.redBallButton);
    this.makeUnselectedButton(this.blueBallButton);
    this.makeUnselectedButton(this.orangeBallButton);
  }

  setBallcolorBlue() {
    this.currentBallColor = ballImgBlue; // Makes the ball blue by selecting the according button
    this.makeSelectedButton(this.blueBallButton);
    this.makeUnselectedButton(this.orangeBallButton);
    this.makeUnselectedButton(this.redBallButton);
  }

  setBallcolorOrange() {
    this.currentBallColor = ballImgOrange; // Makes the ball orange by selecting the according button
    this.makeSelectedButton(this.orangeBallButton);
    this.makeUnselectedButton(this.blueBallButton);
    this.makeUnselectedButton(this.redBallButton);
  }

  setBallHeightToThirty() {
    this.ypos = this.experimentYpos+75;
    this.makeSelectedButton(this.hightThirtyButton);
    this.makeUnselectedButton(this.hightTenButton);
    this.makeUnselectedButton(this.hightTwentyButton);
    this.previousHeightSet = this.experimentYpos+75;
  }

  setBallHeightToTwenty() {
    this.ypos = this.experimentYpos+175;
    this.makeSelectedButton(this.hightTwentyButton);
    this.makeUnselectedButton(this.hightTenButton);
    this.makeUnselectedButton(this.hightThirtyButton);
    this.previousHeightSet = this.experimentYpos+175;
  }

  setBallHeightToTen() {
    this.ypos = this.experimentYpos+275;
    this.makeSelectedButton(this.hightTenButton);
    this.makeUnselectedButton(this.hightTwentyButton);
    this.makeUnselectedButton(this.hightThirtyButton);
    this.previousHeightSet = this.experimentYpos+275;
  }

  setBallWeightToTen() {
    this.weightBall = 10;
    this.makeSelectedButton(this.weightTenButton);
    this.makeUnselectedButton(this.weightOneButton);
    this.makeUnselectedButton(this.weightFiveButton);
  }

  setBallWeightToFive() {
    this.weightBall = 5;
    this.makeSelectedButton(this.weightFiveButton);
    this.makeUnselectedButton(this.weightOneButton);
    this.makeUnselectedButton(this.weightTenButton);
  }

  setBallWeightToOne() {
    this.weightBall = 1;
    this.makeSelectedButton(this.weightOneButton);
    this.makeUnselectedButton(this.weightFiveButton);
    this.makeUnselectedButton(this.weightTenButton);
  }

  makeSelectedButton(button) {
    button.style('color', '#FFFFFF'); // White text for better contrast
    button.style('font-size', '16px'); // Adjust text size
    const backgroundGradient = 'linear-gradient(to bottom, #FFB347, #FF8000)';
    button.style('background', backgroundGradient);
  }

  makeUnselectedButton(button) {
    button.style('color', '#000000'); // White text for better contrast
    button.style('font-size', '14px'); // Adjust text size
    button.style('background', '#FFFFFF'); // Reset background to solid white
  }


  createExperimentButton(callback) {
    const experimentButton = createButton('TEST'); // Empty title as it holds an image
    experimentButton.position(430, 850);
    experimentButton.mousePressed(callback);

    this.styleExperimentButton(experimentButton);
    this.addButtonHoverEffect(experimentButton);

    return experimentButton;
  }

  // Helper method to apply styles to the experiment button
  styleExperimentButton(button) {
    const backgroundGradient = 'linear-gradient(to bottom, #FFB347, #FF8000)';
    button.style('background', backgroundGradient);
    button.style('width', '310px');
    button.style('height', '50px');
    button.style('background-color', '#FFFFFF');
    button.style('border', '2px solid black');
    button.style('border-radius', '10px');
    button.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.3)');
    button.style('cursor', 'pointer');
    button.style('font-weight', 'bold'); // Makes the text bold
    button.style('color', '#FFFFFF'); // White text for better contrast
    button.style('font-size', '30px'); // Optional: adjust text size if necessary
  }

  // Creates a square button with an image that triggers a callback when clicked
  createOptionButton(text, callback, xpos, ypos) {
    const buttonSize = '60px'; // Size of the square button
    const OptionButton = createButton(text); // Empty title as it holds an image
    OptionButton.position(xpos, ypos);
    OptionButton.mousePressed(callback);

    this.styleOptionButton(OptionButton, buttonSize);
    this.addButtonHoverEffect(OptionButton);

    return OptionButton;
  }

  // Helper method to apply styles to the option buttons
  styleOptionButton(button, buttonSize) {
    button.style('width', buttonSize);
    button.style('height', buttonSize);
    button.style('background-color', '#FFFFFF');
    button.style('border', '2px solid black');
    button.style('border-radius', '10px');
    button.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.3)');
    button.style('cursor', 'pointer');
    button.style('font-weight', 'bold'); // Makes the text bold
    button.style('color', '#00000'); // Optional: white text for better contrast
    button.style('font-size', '14px'); // Optional: adjust text size if necessary
  }

  // Adds a hover effect to the image button for interactivity
  addButtonHoverEffect(button) {
    button.mouseOver(() => {
      button.style('box-shadow', '0px 6px 10px rgba(0, 0, 0, 0.4)'); // Darker shadow on hover
    }
    );

    button.mouseOut(() => {
      button.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.3)'); // Original shadow
    }
    );
  }

  doExperimentButton() {
    this.ypos = this.previousHeightSet;

    // Show the modal
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    const closeButton = document.querySelector(".close-button");
    const okButton = document.getElementById("modalOkButton");

    // Set the modal message
    modalMessage.innerText = "You clicked on the test button";

    // Display the modal
    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    closeButton.onclick = function() {
      modal.style.display = "none";
    };

    // Close the modal when the user clicks on the OK button
    okButton.onclick = function() {
      modal.style.display = "none";
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  doNextButton() {
    //Removes all experiment option buttons
    this.weightOneButton?.remove();
    this.weightFiveButton?.remove();
    this.weightTenButton?.remove();
    this.hightTenButton?.remove();
    this.hightTwentyButton?.remove();
    this.hightThirtyButton?.remove();
    this.redBallButton?.remove();
    this.blueBallButton?.remove();
    this.orangeBallButton?.remove();

    this.nextButton?.remove();

    // Proceed to the next phase
    this.nextPhaseMethod();
  }
}
