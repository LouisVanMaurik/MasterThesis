class DrawBackgroundObjects {
  constructor(tempTextBoxWidth) {
    this.textBoxWidth = tempTextBoxWidth;
  }

  // Draws the background
  drawBackground(exerciseNumber) {
    this.drawBackgroundColor();
    this.drawSidePanels();
    this.drawExerciseNumber(exerciseNumber);
    this.writeVersion();
  }

  // Draws a solid color for the background
  drawBackgroundColor() {
    fill(0, 207, 193);
    rect(0, 0, width, height);
  }

  // Draws the side panels on the canvas
  drawSidePanels() {
    fill(36, 106, 115);
    rect(0, 0, width, 100);
    rect(0, 0, 300, height);
  }

  //Display the current exercise number (e.g. 1/3), depending on the currentSim
  drawExerciseNumber(exerciseNumber) {
    fill(255);
    textSize(50);
    textStyle(BOLD);
    text(exerciseNumber + '/3', width-100, 70);
  }
  
  //This is purely for during testing, so I know which version a student has
  writeVersion(){
    fill(0);
    textSize(10);
    textStyle(BOLD);
    text('adaptive = ' + adaptive, 10, height - 10);
  }

  // Draws a text box with a title and multiple lines of text
  drawTextBox(title, stringArray, xpos, ypos) {
    const textSizeValue = 20;
    const boxHeight = textSizeValue * 2 + stringArray.length * (textSizeValue + 5);

    this.drawTextBoxBackground(xpos, ypos, boxHeight);
    this.drawTitle(title, xpos, ypos, textSizeValue);
    this.drawTextLines(stringArray, xpos, ypos, textSizeValue);
  }

  // Draw the background of the text box
  drawTextBoxBackground(xpos, ypos, height) {
    fill(255);
    rect(xpos, ypos, this.textBoxWidth, height);
  }

  // Draws the title in the text box
  drawTitle(title, xpos, ypos, textSizeValue) {
    fill(0);
    textSize(textSizeValue);
    textStyle(BOLD);
    text(title, xpos + 10, ypos + 30);
  }

  // Draws each line of text in the text box
  drawTextLines(stringArray, xpos, ypos, textSizeValue) {
    textStyle(NORMAL);

    stringArray.forEach((line, index) => {
      text(line, xpos + 10, ypos + 55 + index * (textSizeValue + 5));
    }
    );
  }

  // Creates a dropdown with options at a specific position and associates it with a callback
  createDropdown(options, xpos, ypos, dropdownString, currentSim) {
    const dropdown = createSelect();
    this.initializeDropdown(dropdown, options, dropdownString, xpos, ypos, currentSim);
    return dropdown;
  }

  // Helper method to initialize a dropdown with options and styles
  initializeDropdown(dropdown, options, dropdownString, xpos, ypos, currentSim) {
    // Set dropdown position
    dropdown.position(xpos, ypos);

    //Adds a default option but makes sure it is disabled
    const defaultOption = '-- Maak een keuze --';
    dropdown.option(defaultOption);
    dropdown.selected(defaultOption);
    dropdown.elt[0].disabled = true;

    options.forEach(option => dropdown.option(option)); // Add the provided options

    dropdown.changed(() => {
      currentSim.setDropdownSelection(dropdownString, dropdown.value()); // Callback
      dropdown.style('border', '1px solid black'); // Change border color to black
    }
    );
    this.styleDropdown(dropdown); // Apply custom styles
  }

  // Apply custom styles to the dropdown
  styleDropdown(dropdown) {
    dropdown.style('font-size', '16px');
    dropdown.style('width', '270px');
    dropdown.style('height', '30px');
  }

  // Creates a button that triggers a callback when clicked
  createButton(title, callback, xpos, ypos, buttonWidth, buttonHeight) {
    const button = createButton(title);
    button.position(xpos, ypos);
    button.mousePressed(callback);

    this.styleButton(button, buttonWidth, buttonHeight);
    this.addButtonHoverEffect(button);

    return button;
  }

  // Helper method to apply styles to the button
  styleButton(button, buttonWidth, buttonHeight) {
    const buttonColor = '#808080';
    const backgroundGradient = 'linear-gradient(to bottom, #A9A9A9, #696969)';

    button.style('font-size', '24px');
    button.style('font-weight', 'bold');
    button.style('width', buttonWidth);
    button.style('height', buttonHeight);
    button.style('background', backgroundGradient);
    button.style('color', '#FFFFFF');
    button.style('border', '2px solid black');
    button.style('border-radius', '15px');
    button.style('box-shadow', '0px 6px 12px rgba(0, 0, 0, 0.3)');
    button.style('cursor', 'pointer');
  }

  // Adds a hover effect to the button for interactivity
  addButtonHoverEffect(button) {
    button.mouseOver(() => {
      button.style('box-shadow', '0px 8px 14px rgba(0, 0, 0, 0.4)'); // Darker shadow on hover
    }
    );

    button.mouseOut(() => {
      button.style('box-shadow', '0px 6px 12px rgba(0, 0, 0, 0.3)'); // Original shadow
    }
    );
  }

  createPopUp(title, text) {
    // Show the modal
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modalTitle"); // Ensure this variable is declared
    const modalMessage = document.getElementById("modalMessage");
    const closeButton = document.querySelector(".close-button");
    const okButton = document.getElementById("modalOkButton");

    // Set the modal message
    modalTitle.innerText = title;
    modalMessage.innerHTML = text; // Change to innerHTML to allow HTML formatting

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
}
