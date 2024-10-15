class ExperimentPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    //state of the experiment
    this.isRunning = false;
    this.fallingSpeed = 0;

    //These are the x en y pos of the experiment, so it could be moved if needed
    this.experimentXpos = 800;
    this.experimentYpos = 550;
    //These are the xpos and ypos of the falling ball, which are conncected to the experiment
    this.xpos = this.experimentXpos+225;
    this.ypos = this.experimentYpos+275;

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

    //Declares current selected values
    this.previousYposHeightSet = undefined;      //This one seems odd, but it is because the height in the experiment is not actually e.g. 30, but a specific location in the canvas
    this.currentSelcetedColor = undefined;
    this.currentSelectedHeight = undefined;
    this.currentSelectedWeight = undefined;

    //Initialize previous variables with their functions
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

    if (this.didOneExperiment) {
      this.nextButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); // Gradient effect for 3D look
    }
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
    console.log('The weight of the ball in draw is now: ' + this.currentSelectedWeight);

    text(this.currentSelectedWeight + 'KG', this.xpos+30, this.ypos+38);
    textAlign(LEFT);
    if (this.isRunning) {
      if (this.ypos <= this.experimentXpos+90) {
        this.ypos = this.ypos+this.fallingSpeed;
        this.fallingSpeed += 0.005;
      } else {
        this.isRunning = false;
        this.fallingSpeed = 0;

        this.currentSim.results.push([this.currentSelectedWeight, this.currentSelectedHeight, this.currentSelectedColor, this.calculateTimeToDrop(), this.calculateVelocityAtDrop()]);
        let resultString = 'Massa: ' + this.currentSim.results[0][0] + ', Hoogte: ' + this.currentSim.results[0][1] +
          ', Kleur: ' + this.currentSim.results[0][2] + ', Tijd: '+ this.currentSim.results[0][3] + ', Snelheid: ' + this.currentSim.results[0][4];
        this.drawBackgroundObjects.createPopUp('Resultaten:', resultString);
      }
    }
    this.drawStopwatch();
  }

  drawStopwatch() {
    image(stopwatch, 1090, 850);
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text('00:00', 1138, 980);
  }

  doExperimentButton() {
    this.didOneExperiment = true;
    this.isRunning = true;
  }

  calculateTimeToDrop() {
    return this.roundToTwoDecimals(Math.sqrt((2 * this.currentSelectedHeight) / 1.625));
  }

  calculateVelocityAtDrop() {
    return this.roundToTwoDecimals(1.625 * this.calculateTimeToDrop());
  }

  roundToTwoDecimals(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
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
    button.style('color', '#00000'); //
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


  //All the next methods are called when the specific option button is clicked:


  setBallcolorRed() {
    if (this.isRunning === false) {
      this.currentBallColor = ballImgRed; // Makes the ball red by selecting the according button
      this.currentSelectedColor = 'rood';

      this.makeSelectedButton(this.redBallButton);
      this.makeUnselectedButton(this.blueBallButton);
      this.makeUnselectedButton(this.orangeBallButton);
    }
  }

  setBallcolorBlue() {
    if (this.isRunning === false) {
      this.currentBallColor = ballImgBlue; // Makes the ball blue by selecting the according button
      this.currentSelectedColor = 'blauw';

      this.makeSelectedButton(this.blueBallButton);
      this.makeUnselectedButton(this.orangeBallButton);
      this.makeUnselectedButton(this.redBallButton);
    }
  }

  setBallcolorOrange() {
    if (this.isRunning === false) {
      this.currentBallColor = ballImgOrange; // Makes the ball orange by selecting the according button
      this.currentSelectedColor = 'oranje';

      this.makeSelectedButton(this.orangeBallButton);
      this.makeUnselectedButton(this.blueBallButton);
      this.makeUnselectedButton(this.redBallButton);
    }
  }

  setBallHeightToThirty() {
    if (this.isRunning === false) {
      this.ypos = this.experimentYpos+75;
      this.currentSelectedHeight = 30;

      this.makeSelectedButton(this.hightThirtyButton);
      this.makeUnselectedButton(this.hightTenButton);
      this.makeUnselectedButton(this.hightTwentyButton);
      this.previousYposHeightSet = this.experimentYpos+75;
    }
  }

  setBallHeightToTwenty() {
    if (this.isRunning === false) {
      this.ypos = this.experimentYpos+175;
      this.currentSelectedHeight = 20;

      this.makeSelectedButton(this.hightTwentyButton);
      this.makeUnselectedButton(this.hightTenButton);
      this.makeUnselectedButton(this.hightThirtyButton);
      this.previousYposHeightSet = this.experimentYpos+175;
    }
  }

  setBallHeightToTen() {
    if (this.isRunning === false) {
      this.ypos = this.experimentYpos+275;
      this.currentSelectedHeight = 10;

      this.makeSelectedButton(this.hightTenButton);
      this.makeUnselectedButton(this.hightTwentyButton);
      this.makeUnselectedButton(this.hightThirtyButton);
      this.previousYposHeightSet = this.experimentYpos+275;
    }
  }

  setBallWeightToTen() {
    if (this.isRunning === false) {
      this.currentSelectedWeight = 10;

      this.makeSelectedButton(this.weightTenButton);
      this.makeUnselectedButton(this.weightOneButton);
      this.makeUnselectedButton(this.weightFiveButton);
    }
  }

  setBallWeightToFive() {
    if (this.isRunning === false) {

      this.currentSelectedWeight = 5;

      this.makeSelectedButton(this.weightFiveButton);
      this.makeUnselectedButton(this.weightOneButton);
      this.makeUnselectedButton(this.weightTenButton);
    }
  }

  setBallWeightToOne() {
    if (this.isRunning === false) {
      this.currentSelectedWeight = 1;

      this.makeSelectedButton(this.weightOneButton);
      this.makeUnselectedButton(this.weightFiveButton);
      this.makeUnselectedButton(this.weightTenButton);
    }
  }

  //changes the css style of the button that is selected
  makeSelectedButton(button) {
    button.style('color', '#FFFFFF'); // White text
    button.style('font-size', '16px'); // Adjust text size
    const backgroundGradient = 'linear-gradient(to bottom, #FFB347, #FF8000)';
    button.style('background', backgroundGradient); //Set the background to an orange gradient
  }

  //changes the css style back to normal of the buttons that are unselected
  makeUnselectedButton(button) {
    button.style('color', '#000000'); // Black text
    button.style('font-size', '14px'); // Adjust text size
    button.style('background', '#FFFFFF'); // Reset background to solid white
  }
}
