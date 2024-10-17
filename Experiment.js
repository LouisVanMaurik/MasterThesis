class ExperimentPhase {
  constructor(drawBackgroundObjects, currentSim, nextPhaseMethod) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.currentSim = currentSim;
    this.nextPhaseMethod = nextPhaseMethod;

    //state of the experiment
    this.isRunning = false;

    //These are the x en y pos of the experiment, so it could be moved if needed
    this.experimentXpos = 800;
    this.experimentYpos = 550;

    //These are the xpos and ypos of the falling ball, which are conncected to the experiment
    this.xpos = this.experimentXpos+225;
    this.ypos = this.experimentYpos+275;

    //Creates all experiment options buttons
    this.weightOneButton = this.createOptionButton('1KG', this.setBallWeight.bind(this, 1), this.experimentXpos-250, this.experimentYpos+10);
    this.weightFiveButton = this.createOptionButton('5KG', this.setBallWeight.bind(this, 5), this.experimentXpos-180, this.experimentYpos+10);
    this.weightTenButton = this.createOptionButton('10KG', this.setBallWeight.bind(this, 10), this.experimentXpos-110, this.experimentYpos+10);
    this.hightTenButton = this.createOptionButton('10M', this.setBallHeight.bind(this, 10), this.experimentXpos-250, this.experimentYpos + 100);
    this.hightTwentyButton = this.createOptionButton('20M', this.setBallHeight.bind(this, 20), this.experimentXpos-180, this.experimentYpos + 100);
    this.hightThirtyButton = this.createOptionButton('30M', this.setBallHeight.bind(this, 30), this.experimentXpos-110, this.experimentYpos + 100);
    this.redBallButton = this.createOptionButton('Rood', this.setBallcolor.bind(this, 'rood'), this.experimentXpos-250, this.experimentYpos + 190);
    this.blueBallButton = this.createOptionButton('Blauw', this.setBallcolor.bind(this, 'blauw'), this.experimentXpos-180, this.experimentYpos + 190);
    this.orangeBallButton = this.createOptionButton('Oranje', this.setBallcolor.bind(this, 'oranje'), this.experimentXpos-110, this.experimentYpos + 190);

    //Declares current selected values
    this.previousYposHeightSet = undefined;      //This one seems odd, but it is because the height in the experiment is not actually e.g. 30, but a specific location in the canvas
    this.currentSelectedColor = undefined;
    this.currentSelectedHeight = undefined;
    this.currentSelectedWeight = undefined;

    //Initialize previous variables with their functions
    this.setBallcolor('rood');
    this.setBallHeight(10);
    this.setBallWeight(1);


    this.didOneExperiment = false;
    this.ballOntheGround = false;
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
    this.drawResultBox();
    
    //if (this.isRunning || this.ballOntheGround){
    //  console.log('I should make the button grey');
    //  this.experimentButton.style('linear-gradient(to bottom, #A9A9A9, #696969)');
    //} else {
    //   console.log('I should make the button grey');
    //   console.log('isrunning = ' + this.isRunning);
    //   console.log('ballOnTheGround = ' + this.ballOntheGround);
    //   this.experimentButton.style('background', 'linear-gradient(to bottom, #FFB347, #FF8000)'); // Gradient effect for 3D look
    //}

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

    text(this.currentSelectedWeight + 'KG', this.xpos+30, this.ypos+38);
    textAlign(LEFT);
    if (this.isRunning) {
      if (this.ypos <= this.experimentYpos+375) {

        this.currentTime = Date.now();
        //the time in seconds
        let t = (this.currentTime-this.startTime)/1000;
        const startHeight = this.currentSelectedHeight == 10 ? 275 : this.currentSelectedHeight == 20 ? 175 : 75
          this.ypos = this.experimentYpos + startHeight + 1.625*pow(t, 2)*10/2;
      } else {
        this.isRunning = false;
        this.didOneExperiment = true;
        this.ballOntheGround = true;

        this.currentSim.results.push([this.currentSelectedWeight, this.currentSelectedHeight, this.currentSelectedColor, this.calculateTimeToDrop(), this.calculateVelocityAtDrop()]);
        this.showResultPopup();
      }
    }
    this.drawStopwatch();
  }

  showResultPopup() {
    let resultString = 'Massa: ' + this.currentSelectedWeight + ', Hoogte: ' + this.currentSelectedHeight +
      ', Kleur: ' + this.currentSelectedColor + ', Tijd: '+ this.calculateTimeToDrop() + ', Snelheid: ' + this.calculateVelocityAtDrop();
    this.drawBackgroundObjects.createPopUp('Resultaten:', resultString);
  }

  drawStopwatch() {
    image(stopwatch, 1090, 850);
    fill(0);
    textSize(30);
    textStyle(BOLD);
    let timeString;
    if (this.isRunning) {

      //This parts shows the timer going up when the simulation is run
      const timeDifference = this.startTime ? this.currentTime - this.startTime : 0; // Calculate the time difference
      const time = new Date(timeDifference); // Create a Date object from the time difference
      const seconds = String(time.getSeconds()).padStart(2, '0'); // Get the seconds and format them to always have two digits
      const milliseconds = String(time.getMilliseconds()).substring(0, 2).padStart(2, '0'); // Get the first two digits of the milliseconds and format them
      timeString = seconds + ':' + milliseconds // Combine the seconds and milliseconds into a display string
    } else if (this.ballOntheGround) {

      //When the ball on the ground, the timer shows the the calculated time to drop
      //This is hardcoded, as it should not be different, even if the framerate drops
      if (this.calculateTimeToDrop() === 3.5) {
        timeString = '03:50';
      } else if (this.calculateTimeToDrop() === 4.96) {
        timeString = '04:96';
      } else if (this.calculateTimeToDrop() === 6.07) {
        timeString = '06:07';
      }
    } else {

      //When the ball is not falling or on the ground, it will default to 0
      timeString = '00:00';
    }
    text(timeString, 1138, 980); // Display the time string on the screen at position (1138, 980)
  }

  doExperimentButton() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now();
    }
  }

  drawResultBox() {
    const textsize = 20;
    const xpos = 400;
    const ypos = 1250;
    const columnTitles = ['Test', 'Massa (KG)', 'Hoogte (M)', 'Kleur', 'Tijd (S)', 'Snelheid (M/S)']; // Add "Test" column

    // Calculate the length of the array (number of rows)
    const LENGTHOFARRAY = this.currentSim.results.length;

    // Calculate the height of the box dynamically based on array length
    const rowHeight = 30; // Height per row of data
    const boxHeight = 45 + rowHeight * (LENGTHOFARRAY + 1); // +1 for the title row

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


  calculateTimeToDrop() {
    return this.roundToTwoDecimals(Math.sqrt(this.currentSelectedHeight*2 / 1.625));
  }

  calculateVelocityAtDrop() {
    return this.roundToTwoDecimals(1.625 * this.calculateTimeToDrop());
  }

  roundToTwoDecimals(value) {
    return Math.floor(value * 100) / 100;
  }


  createExperimentButton(callback) {
    const experimentButton = createButton('TEST'); // Empty title as it holds an image
    experimentButton.position(430, 850);
    experimentButton.mousePressed(callback);

    const backgroundGradient = 'linear-gradient(to bottom, #FFB347, #FF8000)';
    experimentButton.style('background', backgroundGradient);
    this.styleButton(experimentButton, '310px', '50px', '#FFFFFF', '30px');
    this.drawBackgroundObjects.addButtonHoverEffect(experimentButton);

    return experimentButton;
  }

  // Creates a square button with an image that triggers a callback when clicked
  createOptionButton(text, callback, xpos, ypos) {
    const buttonSize = '60px'; // Size of the square button
    const OptionButton = createButton(text); // Empty title as it holds an image
    OptionButton.position(xpos, ypos);
    OptionButton.mousePressed(callback);

    this.styleButton(OptionButton, buttonSize, buttonSize, '#00000', '14px');
    this.drawBackgroundObjects.addButtonHoverEffect(OptionButton);

    return OptionButton;
  }

  // Helper method to apply styles to the button
  styleButton(button, ButtonWidth, buttonHeight, textColor, textSize) {
    button.style('width', ButtonWidth);
    button.style('height', buttonHeight);
    button.style('background-color', '#FFFFFF');
    button.style('border', '2px solid black');
    button.style('border-radius', '10px');
    button.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.3)');
    button.style('cursor', 'pointer');
    button.style('font-weight', 'bold'); // Makes the text bold
    button.style('color', textColor); //
    button.style('font-size', textSize);
  }

  doNextButton() {
    if (this.didOneExperiment) {
      //Removes all experiment option buttons
      this.weightOneButton.remove();
      this.weightFiveButton.remove();
      this.weightTenButton.remove();
      this.hightTenButton.remove();
      this.hightTwentyButton.remove();
      this.hightThirtyButton.remove();
      this.redBallButton.remove();
      this.blueBallButton.remove();
      this.orangeBallButton.remove();

      this.nextButton.remove();
      this.experimentButton.remove();

      // Proceed to the next phase
      this.nextPhaseMethod();
    }
  }

  setBallcolor(colorString) {
    if (this.isRunning === false) {
      this.currentSelectedColor = colorString;

      this.makeUnselectedButton(this.orangeBallButton);
      this.makeUnselectedButton(this.blueBallButton);
      this.makeUnselectedButton(this.redBallButton);

      //Makes the selected button orange (selected) AND change the image of the ball
      if (colorString === 'oranje') {
        this.currentBallColor = ballImgOrange;
        this.makeSelectedButton(this.orangeBallButton);
      } else if (colorString === 'rood') {
        this.currentBallColor = ballImgRed;
        this.makeSelectedButton(this.redBallButton);
      } else if (colorString === 'blauw') {
        this.currentBallColor = ballImgBlue;
        this.makeSelectedButton(this.blueBallButton);
      }

      //Change the height to the previous selected height
      this.ypos = this.previousYposHeightSet;
      this.ballOntheGround = false;
    }
  }

  setBallHeight(num) {
    if (this.isRunning === false) {
      this.currentSelectedHeight = num;

      //Makes all buttons weight buttons grey (unselected)
      this.makeUnselectedButton(this.hightTenButton);
      this.makeUnselectedButton(this.hightTwentyButton);
      this.makeUnselectedButton(this.hightThirtyButton);

      //Makes the selected button orange (selected) AND change the height (ypos) of the ball
      if (num === 10) {
        this.ypos = this.experimentYpos+275;
        this.makeSelectedButton(this.hightTenButton);
      } else if (num === 20) {
        this.ypos = this.experimentYpos+175;
        this.makeSelectedButton(this.hightTwentyButton);
      } else if (num === 30) {
        this.ypos = this.experimentYpos+75;
        this.makeSelectedButton(this.hightThirtyButton);
      }
      //Save the height so it can be set back to this state when changing anohter variable
      this.previousYposHeightSet = this.ypos;
      this.ballOntheGround = false;
    }
  }

  setBallWeight(num) {
    if (this.isRunning === false) {
      this.currentSelectedWeight = num;

      //Makes all buttons weight buttons grey (unselected)
      this.makeUnselectedButton(this.weightOneButton);
      this.makeUnselectedButton(this.weightFiveButton);
      this.makeUnselectedButton(this.weightTenButton);

      //Makes the selected button orange (selected)
      if (num === 1) {
        this.makeSelectedButton(this.weightOneButton);
      } else if (num === 5) {
        this.makeSelectedButton(this.weightFiveButton);
      } else if (num === 10) {
        this.makeSelectedButton(this.weightTenButton);
      }

      //Change the height to the previous selected height
      this.ypos = this.previousYposHeightSet;
      this.ballOntheGround = false;
    }
  }

  //changes the css style of the button that is selected
  makeSelectedButton(button) {
    button.style('color', '#FFFFFF'); // Make text white
    button.style('font-size', '16px'); // Adjust text size
    const backgroundGradient = 'linear-gradient(to bottom, #FFB347, #FF8000)';
    button.style('background', backgroundGradient); //Set the background to an orange gradient
  }

  //changes the css style back to normal of the buttons that are unselected
  makeUnselectedButton(button) {
    button.style('color', '#000000'); // Make text black
    button.style('font-size', '14px'); // Adjust text size
    button.style('background', '#FFFFFF'); // Reset background to solid white
  }
}
