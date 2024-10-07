class DifferentSimulationVariables {
  constructor() {
  }
  
  //Create a string of arrays depending on the input string, so it doesn't exceeds the line
  ArrayOfStrings(inputString, temptTextBoxWidth){
    const lines = [];
    const maxLineLength = map(temptTextBoxWidth, 0, 1000, 0, 190);
    let currentLine = '';
    let currentLength = 0;
    let currentWord = '';
    let wordLength = 0;

    for (const char of inputString) {
        // Determine the width of the character
        let charWidth;
        switch (char) {
            case 'l':
            case 'i':
            case '.':
            case ',':
            case "'":
            case ':':
            case ';':
                charWidth = 1;
                break;
            case 'W':
            case 'M':
            case 'B':
            case 'O':
            case 'D':
                charWidth = 3;
                break;
            case 'A':
            case 'H':
            case 'K':
            case 'R':
            case 'S':
            case 'T':
            case 'V':
            case 'Y':
            case 'C':
            case 'G':
            case 'P':
            case 'Q':
            case 'X':
            case 'Z':
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                charWidth = 2;
                break;
            default:
                charWidth = 2;
        }

        // If it's a space, decide whether to break the line or continue
        if (char === ' ') {
            // Check if the word fits in the current line
            if (currentLength + wordLength > maxLineLength) {
                // If the word doesn't fit, push the current line and start a new one
                if (currentLine) {
                    lines.push(currentLine.trim());
                }
                currentLine = currentWord + ' '; // Start the new line with the word
                currentLength = wordLength + 1; // Reset the current length
            } else {
                // If the word fits, add it to the current line
                currentLine += currentWord + ' ';
                currentLength += wordLength + 1; // Add word length plus space
            }

            // Reset currentWord and wordLength
            currentWord = '';
            wordLength = 0;
        } else {
            // Otherwise, keep building the current word
            currentWord += char;
            wordLength += charWidth;
        }
    }

    // Add the last word and line to the result
    if (currentWord) {
        // Check if the last word fits in the current line
        if (currentLength + wordLength > maxLineLength) {
            // If it doesn't fit, push the current line and start a new one
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            lines.push(currentWord); // Add the remaining word as a new line
        } else {
            currentLine += currentWord;
            lines.push(currentLine.trim()); // Push the final line
        }
    } else if (currentLine) {
        lines.push(currentLine.trim()); // Push the final line if any
    }

    return lines;
}
}

class HeightTimeSim extends DifferentSimulationVariables {
  constructor(textBoxWidth){
    super();
    this.goal = this.ArrayOfStrings('We willen kijken hoe de hoogte van de bal bepaald hoelang het duurt voordat de bal de grond raakt.', textBoxWidth);
    this.reqIndVar = 'de hoogte van de bal';
    this.reqDepVar = 'de tijd voordat de bal de grond raakt';
    this.exerciseNumber = '1';
  }
}

class HeightVelocitySim extends DifferentSimulationVariables {
  constructor(textBoxWidth){
    super();
    this.goal = this.ArrayOfStrings('We willen kijken hoe de hoogte van de bal bepaald hoe snel de bal gaat wanneer hij de grond raakt.', textBoxWidth);
    this.reqIndVar = 'de hoogte van de bal';
    this.reqDepVar = 'de snelheid van de bal wanneer hij de raakt';
    this.exerciseNumber = '2';
  }
}
