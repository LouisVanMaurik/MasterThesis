class DrawBackgroundObjects {
  constructor(tempTextBoxWidth) {
    this.textBoxWidth = tempTextBoxWidth;
  }

  // Draws the background
  drawBackground() {
    this.drawImage();
    this.drawOverlay();
    this.drawSidePanels();
  }

  // Helper method to draw the background image
  drawImage() {
    //image(backgroundImg, 300, 0);
  }

  // Draws a translucent overlay for the background
  drawOverlay() {
    fill(0, 207, 193);
    rect(0, 0, width, height);
  }

  // Draws the side panels on the canvas
  drawSidePanels() {
    fill(36, 106, 115);
    rect(0, 0, width, 100);
    rect(0, 0, 300, height);
  }

  // Draws a text box with a title and multiple lines of text
  drawTextBox(title, stringArray, xpos, ypos) {
    const textSizeValue = 20;
    const boxHeight = textSizeValue * 2 + stringArray.length * (textSizeValue + 5);

    this.drawTextBoxBackground(xpos, ypos, boxHeight);
    this.drawTitle(title, xpos, ypos, textSizeValue);
    this.drawTextLines(stringArray, xpos, ypos, textSizeValue);
  }

  // Helper method to draw the background of the text box
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
    });
  }

  // Creates a dropdown with options at a specific position and associates it with a callback
  createDropdown(options, xpos, ypos, dropdownString, currentSim) {
    const dropdown = createSelect();
    this.initializeDropdown(dropdown, options, dropdownString, xpos, ypos, currentSim);
    return dropdown;
  }

  // Helper method to initialize a dropdown with options and styles
  initializeDropdown(dropdown, options, dropdownString, xpos, ypos, currentSim) {
    const defaultOption = '-- Maak een keuze --';
    dropdown.option(defaultOption);
    dropdown.selected(defaultOption);
    dropdown.elt[0].disabled = true; // Disable the default option

    options.forEach(option => dropdown.option(option)); // Add the provided options

    dropdown.position(xpos, ypos); // Set dropdown position
    dropdown.changed(() => currentSim.setDropdownSelection(dropdownString, dropdown.value())); // On selection change

    this.styleDropdown(dropdown); // Apply custom styles
  }

  // Apply custom styles to the dropdown
  styleDropdown(dropdown) {
    dropdown.style('font-size', '16px');
    dropdown.style('width', '270px');
    dropdown.style('height', '30px');
  }

  // Creates a button that triggers a callback when clicked
  createButton(title, callback, xpos, ypos) {
    const nextButton = createButton(title);
    nextButton.position(xpos, ypos);
    nextButton.mousePressed(callback);

    this.styleButton(nextButton);
    this.addButtonHoverEffect(nextButton);

    return nextButton;
  }

  // Helper method to apply styles to the button
  styleButton(button) {
    const buttonColor = '#808080';
    const backgroundGradient = 'linear-gradient(to bottom, #A9A9A9, #696969)';

    button.style('font-size', '24px');
    button.style('font-weight', 'bold');
    button.style('width', '300px');
    button.style('height', '60px');
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
    });

    button.mouseOut(() => {
      button.style('box-shadow', '0px 6px 12px rgba(0, 0, 0, 0.3)'); // Original shadow
    });
  }
}
