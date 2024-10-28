class AdaptiveFeedback {
  constructor(drawBackgroundObjects) {
    this.drawBackgroundObjects = drawBackgroundObjects;
    this.checkIndCorrectCount = 0;
    this.checkDepCorrectCount = 0;
    this.checkIndGoalHypothesisCount = 0;
    this.checkDepGoalHypothesisCount = 0;
    this.checkVariedIndCount = 0;
    this.checkVariedAndControlledIndCount = 0;
    this.checkIndGoalAnalyzeCount = 0;
    this.checkDepGoalAnalyzeCount = 0;
  }

  sayHello() {
    console.log('Hello');
  }

  //checks if all adaptive criteria are met by calling each checks function in the hypothesis phase
  giveAdaptiveFeedbackHypothesisPhase(reqIndVar, reqDepVar, givenIndVar, givenDepVar, indVariableOptions, depVariableOptions) {
    return this.checkIndCorrect(givenIndVar, indVariableOptions, reqIndVar) &&
      this.checkDepCorrect(givenDepVar, depVariableOptions, reqDepVar) &&
      this.indIsGoalHypothesis(givenIndVar, reqIndVar) &&
      this.depIsGoalHypothesis(givenDepVar, reqDepVar);
  }

  //Checks if a independent variable is placed on the independent variable spot, if not: give a error and return false
  checkIndCorrect(givenIndVar, indVariableOptions, reqIndVar) {
    if (!indVariableOptions.includes(givenIndVar)) {
      if (this.checkIndCorrectCount === 0) {
        this.checkIndCorrectCount++;
        let text = "Een experiment heeft altijd een optie nodig die je vooraf kan kiezen. Bij iets zoals de '" + givenIndVar + "', weet je pas achteraf wat de waarde was. Probeer daarom een optie in het eerste vakje te kiezen die je voordat het experiment doet al kan aanpassen.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else if (this.checkIndCorrectCount === 1) {
        this.checkIndCorrectCount++;
        let text = "Laat ik wat duidelijker zijn. Opties die je zou kunnen aanpassen zijn: " + indVariableOptions[0] + ", " + indVariableOptions[1] + ", " + indVariableOptions[2] + ". Kies 1 van deze opties, en zorg ervoor dat die overeenkomt met wat we willen onderzoeken."
          this.drawBackgroundObjects.createPopUp('Nog niet helemaal:', text);
      } else {
        let text = "Hmmm, laat ik je bij deze stap wat meer helpen. De juiste keuze voor het eerste vakje is: '" + reqIndVar + "'.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }

  //Checks if a independent variable is placed on the dependent variable spot, if not: give a error and return false
  checkDepCorrect(givenDepVar, depVariableOptions, reqDepVar) {
    if (!depVariableOptions.includes(givenDepVar)) {
      if (this.checkDepCorrectCount === 0) {
        this.checkDepCorrectCount++;
        let text = "Een experiment heeft altijd een optie nodig die je pas meet aan het einde. Bij iets zoals'" + givenDepVar + "' is een optie die je aanpast aan het begin. Probeer daarom een optie in het derde vakje te kiezen die je kan meten.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else if (this.checkDepCorrectCount === 1) {
        this.checkDepCorrectCount++;
        let text = "Laat ik wat duidelijker zijn. Opties die je zou kunnen meten zijn: " + depVariableOptions[0] + ", " + depVariableOptions[1] + ". Kies 1 van deze opties, en zorg ervoor dat die overeenkomt met wat we willen onderzoeken." ;
        this.drawBackgroundObjects.createPopUp('Nog niet helemaal:', text);
      } else {
        let text = "Hmmm, laat ik je bij deze stap wat meer helpen. De juiste keuze voor het derde vakje is: '" + reqDepVar + "'.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }

  //Checks if the given dependent variable is the one as described in the goal in the hypothesis phase, if not: give a error and return false
  indIsGoalHypothesis(givenIndVar, reqIndVar) {
    if (givenIndVar != reqIndVar) {
      if (this.checkIndGoalHypothesisCount === 0) {
        this.checkIndGoalHypothesisCount++;
        let text = "De keuze in het eerste vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        let text = "In het eerste vakje staat '" + givenIndVar + "'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: " + reqIndVar + ".";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }


  //Checks if the given independent variable is the one as described in the goal in the hypothesis phase, if not: give a error and return false
  depIsGoalHypothesis(givenDepVar, reqDepVar) {
    if (givenDepVar != reqDepVar) {
      if (this.checkDepGoalHypothesisCount === 0) {
        this.checkDepGoalHypothesisCount++;
        let text = "De keuze in het derde vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        let text = "In het derde vakje staat '" + givenDepVar + "'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: " + reqDepVar + ".";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }

  //checks if all adaptive criteria are met by calling each checks function in the experiment phase
  giveAdaptiveFeedbackExperimentPhase(results, reqIndVar, amountOfDepVars) {
    // results is a lists of list with the following data in this particulair order: Weight, Height, Color, TimeToDrop, Velocity
    let indIndex = this.getIndVarIndex(reqIndVar);
    return  this.checkMoreThenOne(results) &&
      this.checkVariedInd(results, indIndex, reqIndVar)
      && this.checkVariedIndAndControlled(results, indIndex, amountOfDepVars, reqIndVar);
  }

  //return the index for the list depending on what the independent variable is
  getIndVarIndex(reqIndVar) {
    switch (reqIndVar) {
    case 'hoogte van de bal':
      return 1;
    case 'massa van de bal':
      return 2;
    case 'kleur van de bal':
      return 3;
    default:
      console.log('The getIndVarIndex is broken, it got a unkown reqIndVar and does not know which index to return');
      return undefined;
    }
  }

  checkMoreThenOne(results) {
    if (results.length < 2) {
      let text = "Als je een experiment doet, wil je dingen steeds een beetje anders maken. Daarom wil je meerdere experimenten doen. Stel je voor dat je steeds dezelfde bal laat vallen. Dan ontdek je niet wat er gebeurt als je bijvoorbeeld een zwaardere bal hebt! Door iets te veranderen, zoals het gewicht of de hoogte, kun je zien hoe dat het experiment beïnvloedt.";
      this.drawBackgroundObjects.createPopUp('Niet genoeg experimenten!', text);
      return false;
    } else {
      return true;
    }
  }

  //Check if the independent variable has been changed
  checkVariedInd(results, index, reqIndVar) {
    console.log('I just got into the checkvariedind function');
    if (results.length === 0) {
      return false;  // No data to compare
    }

    // Take the value from the first list at the specified index to compare with others
    let firstValue = results[0][index];

    // Compare the value at the specified index in all subsequent lists
    for (let i = 1; i < results.length; i++) {
      if (results[i][index] !== firstValue) {
        return true; // Found a difference, return false
      }
    }
    if (this.checkVariedIndCount === 0) {
      console.log('I am giving the first warning regarding changing independent variable');

      this.checkVariedIndCount++;
      let text = "Kijk nog is goed naar wat we willen ontdekken en wat we verwachten. Wat moeten we aanpassen in het experiment om daar achter te komen?";
      this.drawBackgroundObjects.createPopUp('Wat wilden we ontdekken?', text);
    } else {
      console.log('I am giving the second warning regarding changing independent variable');

      let text = "We willen kijken wat voor effect de '" + reqIndVar + "' heeft. Pas daarom de '" + reqIndVar + "' in het experiment!";
      this.drawBackgroundObjects.createPopUp('Wat wilden we ontdekken?', text);
    }
    // If no differences were found, return false
    return false;
  }

  //Checks if the independent variable has changed AND it is controlled, so the other ones weren't changed
  checkVariedIndAndControlled(results, index, amountOfDepVars, reqIndVar) {
    //make a list of independent indexes where the value should be the same, so without the independent index
    let notIndexes = [];
    for (let i = 0; i < amountOfDepVars; i++) {
      if (i !== index) {
        notIndexes.push(i);
      }
    }
    console.log(notIndexes);

    // Loop through each result and compare with each other
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (results[i][index] !== results[j][index]) {
          let otherIndexesAreTheSame = true;
          for (let k = 0; k < notIndexes.length; k++) {
            if (results[i][notIndexes[k]] !== results[j][notIndexes[k]]) {
              otherIndexesAreTheSame = false;
            }
          }
          if (otherIndexesAreTheSame) {
            return true;
          }
        }
      }
    }
    if (this.checkVariedAndControlledIndCount === 0) {
      this.checkVariedAndControlledIndCount++;
      let text = "Je bent op de goede weg. Je hebt namelijk wel de '" + reqIndVar + "' aangepast. Alleen heb je ook ondertussen iets anders aangepast. Probeer ervoor te zorgen dat je maar 1 ding tegelijk aanpast!";
      this.drawBackgroundObjects.createPopUp('Pas maar 1 ding tegelijk aan:', text);
    } else {
      let text = "Nog niet helemaal. Laat ik het in wat kleinere stapjes uitleggen. Klik eerst op test. Pas daarna alleen de '" + reqIndVar + "' aan. Klik dan weer op test. Nu heb je twee experimenten die exact hetzelfde zijn, naast de '" + reqIndVar + "'.";
      this.drawBackgroundObjects.createPopUp('Pas maar 1 ding tegelijk aan:', text);
    }
      return false;
  }


  giveAdaptiveFeedbackAnalyzePhase(givenIndVarChangeCheck, givenDepVarChangeCheck, reqDepVar, reqIndVar) {
    return this.indIsGoalAnalyze(givenIndVarChangeCheck, reqIndVar) &&
      this.depIsGoalAnalyze(givenDepVarChangeCheck, reqDepVar);
  }

  //Checks if the given dependent variable is the one as described in the goal in the analyze phase, if not: give a error and return false
  indIsGoalAnalyze(givenIndVar, reqIndVar) {
    if (givenIndVar != reqIndVar) {
      if (this.checkIndGoalAnalyzeCount === 0) {
        this.checkIndGoalAnalyzeCount++;
        let text = "De keuze in het eerste vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        let text = "In het eerste vakje staat '" + givenIndVar + "'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: " + reqIndVar + ".";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }


  //Checks if the given independent variable is the one as described in the goal in the hypothesis phase, if not: give a error and return false
  depIsGoalAnalyze(givenDepVar, reqDepVar) {
    if (givenDepVar != reqDepVar) {
      if (this.checkDepGoalAnalyzeCount === 0) {
        this.checkDepGoalAnalyzeCount++;
        let text = "De keuze in het derde vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        let text = "In het derde vakje staat '" + givenDepVar + "'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: " + reqDepVar + ".";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      return false;
    } else {
      return true;
    }
  }

  //Checks if the description of what happend is true
  checkIsEqualToWhatHappend() {
  }
  
  //Checks if the stated hypothesis was correct or not
  checkIsHypothesisCorrect(){
  }
}
