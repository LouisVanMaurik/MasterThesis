class DifferentSimulationVariables {
  constructor(temptTextBoxWidth) {
    this.textBoxWidth = temptTextBoxWidth;
    this.hypothesisExp = this.ArrayOfStrings('Als wetenschapper is het belangrijk om altijd eerst te zeggen wat we denken dat er gaat gebeuren. Laten we dat samen doen! Schrijf op wat je denkt dat er gaat gebeuren. Vergeet hierbij niet het doel van het onderzoek. Kijk daarom eerst goed naar wat we willen ontdekken. Maak daarna de zin af, zodat we onze verwachting duidelijk hebben verwoord. ');
    this.experimentExp = this.ArrayOfStrings('Het is nu tijd om het experiment uit te voeren. Wat spannend! De bedoeling is dat we nu onze verwachting gaan testen. Klopt onze verwachting wel? Of gebeurt er totaal iets anders?  Gebruik het experiment om er achter te komen of je verwachting klopt!');
    this.analyzeExp = this.ArrayOfStrings('We gaan nu kijken of wat er gebeurde hetzelfde is als wat we dachten dat er ging gebeuren. Wat gebeurde er aan het eind? Was onze verwachting uteindelijk waar of niet waar? Klik op de juiste antwoorden in de vakjes onderin.');
    this.proofExp = this.ArrayOfStrings('Als je wilt laten zien dat iets echt gebeurt is, moet je de goede resultaten kiezen die dat laten zien. Gelukking hebben we alles opgeschreven. Nu moet je alleen de juiste kiezen die onze bescrijving van er gebeurde bewijzen. Resultaten die niet helpen, hoef je niet te kiezen!');


    this.indVariableOptions = ['hoogte van de bal', 'massa van de bal', 'kleur van de bal']
      this.depVariableOptions = ['tijd voordat de bal de grond raakt', 'snelheid als de bal de grond raakt'];

    this.variableOptions = this.indVariableOptions.concat(this.depVariableOptions);

    //the given hyptohesis variables by the user
    this.givenIndVar = undefined;
    this.givenDepVar = undefined;
    this.givenIndVarChange = undefined;
    this.givenDepVarChange = undefined;

    //the given analyze variables by the user
    this.givenIndVarCheck = undefined;
    this.givenDepVarCheck = undefined;
    this.givenIndVarChangeCheck = undefined;
    this.givenDepVarChangeCheck = undefined;
    this.hypothesisCheck = undefined;

    this.givenHypothesis = ['No hypothesis has been set yet', 'this text is a placeholder'];
    this.givenEvidence = ['No evidence has been selected', 'This text is a placeholder'];

    //A lists of list with the following data: Weight, Height, Color, TimeToDrop, Velocity
    this.results = [];
  }

  setHypothesis() {
    this.givenHypothesis = this.ArrayOfStrings("Als ik de " + this.givenIndVar + " " + this.givenIndVarChange + ", dan zal de " + this.givenDepVar + " " + this.givenDepVarChange + ".");
  }

  setEvidence() {
    this.givenEvidence = this.ArrayOfStrings("Toen ik de " + this.givenIndVarCheck + " " + this.givenIndVarChangeCheck + ", ging de " + this.givenDepVarCheck + " " + this.givenDepVarChangeCheck + ".");
  }

  getHypothesis() {
    return this.givenHypothesis;
  }

  getEvidence() {
    return this.givenEvidence;
  }

  getGivenIndVar() {
    return this.givenIndVar;
  }

  getGivenDepVar() {
    return this.givenDepVar;
  }

  getGivenDepVarChange() {
    return this.givenDepVarChange;
  }

  getGivenIndVarChange() {
    return this.givenIndVarChange;
  }

  getGivenIndVarCheck() {
    return this.givenIndVarCheck;
  }

  getGivenDepVarCheck() {
    return this.givenDepVarCheck;
  }

  getGivenDepVarChangeCheck() {
    return this.givenDepVarChangeCheck;
  }

  getGivenIndVarChangeCheck() {
    return this.givenIndVarChangeCheck;
  }

  getHypothesisCheck() {
    return this.hypothesisCheck;
  }

  getIndVariableOptions() {
    return this.indVariableOptions;
  }

  getDepVariableOptions() {
    return this.depVariableOptions;
  }

  getVariableOptions() {
    return this.variableOptions;
  }


  //Gets called by the hypothesis method
  //Changes the value of the given variables when a dropdownmenu is changed
  setDropdownSelection(dropdownString, selectedValue) {
    switch (dropdownString) {
    case 'givenIndVar':
      this.givenIndVar = selectedValue;
      break;

    case 'givenIndVarChange':
      this.givenIndVarChange = selectedValue;
      break;

    case 'givenDepVar':
      this.givenDepVar = selectedValue;
      break;

    case 'givenDepVarChange':
      this.givenDepVarChange = selectedValue;
      break;

    case 'givenIndVarCheck':
      this.givenIndVarCheck = selectedValue;
      break;

    case 'givenIndVarChangeCheck':
      this.givenIndVarChangeCheck = selectedValue;
      break;

    case 'givenDepVarCheck':
      this.givenDepVarCheck = selectedValue;
      break;

    case 'givenDepVarChangeCheck':
      this.givenDepVarChangeCheck = selectedValue;
      break;

    case 'hypothesisCheck':
      this.hypothesisCheck = selectedValue;
      break;

    default:
      console.log('Unknown dropdown type, something is going very wrong');
      break;
    }
  }

  //Create a string of arrays depending on the input string, so it doesn't exceeds the line
  ArrayOfStrings(inputString) {
    const lines = [];
    const maxLineLength = map(this.textBoxWidth, 0, 1000, 0, 183);
    let currentLine = '';
    let currentLength = 0;
    let currentWord = '';
    let wordLength = 0;

    for (const charr of inputString) {
      // Determine the width of the character
      let charWidth;
      switch (charr) {
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
      if (charr === ' ') {
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
        currentWord += charr;
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
  constructor(textBoxWidth) {
    super(textBoxWidth);
    this.goal = this.ArrayOfStrings('We willen kijken hoe de hoogte van de bal bepaald hoelang het duurt voordat de bal de grond raakt op de maan.');
    this.reqIndVar = 'hoogte van de bal';
    this.reqDepVar = 'tijd voordat de bal de grond raakt';
    this.exerciseNumber = '1';
    this.simExp = this.setSimExp();
  }
  
  setSimExp() {
    let simExp = super.ArrayOfStrings('Hoi! Ik ben Evan, en ik werk al heel lang met wetenschap en natuur. Vandaag wil ik jullie laten zien hoe het is om een wetenschapper te zijn. Spannend, hè? We gaan samen een experiment doen! We willen uitzoeken of de bal langer of korter onderweg is naar de grond als we hem van verschillende hoogtes laten vallen.');
    simExp.push(' ');
    simExp =  simExp.concat(super.ArrayOfStrings('Eerst gaan we bedenken wat we denken dat er gebeurt. Daarna gaan we het echt uitproberen. Onderin kun je al zien hoe ons proefje eruit gaat zien. Na het experiment bekijken we samen wat we hebben gezien. Laten we beginnen!'));
    return simExp;
  }

  getReqIndVar() {
    return this.reqIndVar;
  }

  getReqDepVar() {
    return this.reqDepVar;
  }

  getSimExp() {
    return this.simExp;
  }
}

class HeightVelocitySim extends DifferentSimulationVariables {
  constructor(textBoxWidth) {
    super(textBoxWidth);
    this.goal = this.ArrayOfStrings('We willen kijken hoe de hoogte van de bal bepaald hoe snel de bal gaat wanneer hij de grond raakt op de maan.');
    this.reqIndVar = 'hoogte van de bal';
    this.reqDepVar = 'snelheid als de bal de grond raakt';
    this.exerciseNumber = '2';
    this.simExp = this.setSimExp();
  }

  setSimExp() {
    let simExp = super.ArrayOfStrings(' Wat ben je lekker bezig. Je lijkt wel een echte wetenschapper op deze manier. Ga zo door! ');
    simExp.push(' ');
    simExp =  simExp.concat(super.ArrayOfStrings('Voor het volgende experiment willen we niet alleen kijken hoe lang het duurt voordat de bal de grond raakt, maar juist hoe snel de bal gaat als hij de grond raakt. We willen ook weten of de bal sneller gaat als we hem van een hogere plek laten vallen. Dus, laten we het experiment nog een keer doen!'));
    simExp.push(' ');
    return simExp;
  }

  getSimExp() {
    return this.simExp;
  }

  getReqIndVar() {
    return this.reqIndVar;
  }

  getReqDepVar() {
    return this.reqDepVar;
  }
}
