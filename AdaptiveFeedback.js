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

  //checks if all experiment criteria are met by calling each checks function in the experiment phase
  giveAdaptiveFeedbackExperimentPhase(results, reqIndVar, amountOfDepVars) {
    // results is a lists of list with the following data in this particulair order: Weight, Height, Color, TimeToDrop, Velocity
    let indIndex = this.getIndVarIndex(reqIndVar);
    return  this.checkMoreThenOne(results) &&
      this.checkVariedInd(results, indIndex, reqIndVar) &&
      this.checkVariedIndAndControlled(results, indIndex, amountOfDepVars, reqIndVar);
  }

  //return the index for the list depending on what the independent variable is
  getIndVarIndex(reqIndVar) {
    switch (reqIndVar) {
    case 'massa van de bal':
      return 0;
    case 'hoogte van de bal':
      return 1;
    case 'kleur van de bal':
      return 2;
    default:
      console.log('The getIndVarIndex is broken, it got a unkown reqIndVar and does not know which index to return');
      return undefined;
    }
  }

  checkMoreThenOne(results) {
    if (results.length < 2) {
      let text = "Bij een experiment wil je steeds iets veranderen. Zo ontdek je meer! Als je steeds dezelfde bal laat vallen, leer je weinig nieuws. Maar door bijvoorbeeld een zwaardere bal te gebruiken of de hoogte te veranderen, kun je zien wat er dan gebeurt.";
      this.drawBackgroundObjects.createPopUp('Niet genoeg experimenten!', text);
      return false;
    } else {
      return true;
    }
  }

  //Check if the independent variable has been changed
  checkVariedInd(results, index, reqIndVar) {
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
      this.checkVariedIndCount++;
      let text = "Kijk nog is goed naar wat we willen ontdekken en wat we verwachten. Wat moeten we aanpassen in het experiment om daar achter te komen?";
      this.drawBackgroundObjects.createPopUp('Wat wilden we ontdekken?', text);
    } else {
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

  //checks if all adaptive criteria are met by calling each checks function in the experiment phase
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
  checkIsHypothesisCorrect() {
  }


  //checks if all proof criteria are met by calling each checks function in the experiment phase
  giveAdaptiveFeedbackProofPhase(results, reqIndVar, indVariableOptions, checkboxesList) {
    console.log('I just got in the adaptiveFeedbackProofPhase function. CheckboxesList = ' + checkboxesList);
    let indIndex = this.getIndVarIndex(reqIndVar);
    let checkedCheckboxesIndexList = this.indexListCheckedBoxes(checkboxesList);
    return  this.moreThenOneOptionChecked(checkedCheckboxesIndexList) &&
            this.independentCheckBosIsChanged (results, indIndex, indVariableOptions, checkedCheckboxesIndexList) &&
            this.independentCheckBosIsChangedAndControlled(results, indIndex, indVariableOptions.length, reqIndVar, checkedCheckboxesIndexList);
  }

  indexListCheckedBoxes(checkboxesList) {
    let checkedCheckboxesIndexList = [];
    console.log('I just got in the indexListCheckedBoxes function. CheckboxesList = ' + checkboxesList);

    for (let i = 0; i < checkboxesList.length; i++) {
      // Check if the checkbox is checked and add the index to a this list
      if (checkboxesList[i].checked()) {
        checkedCheckboxesIndexList.push(i);
      }
    }
    return checkedCheckboxesIndexList;
  }

  //checks if there are atleast 2 boxes selected, otherwise return false
  moreThenOneOptionChecked(checkedCheckboxesIndexList) {
    if (checkedCheckboxesIndexList.length > 1) {
      return true;
    } else {
      let text = "Momenteel heb je maar 1 resultaat geselecteerd. Om te bewijzen dat er iets veranderd is in het experiment, heb je er minstens twee nodig.";
      this.drawBackgroundObjects.createPopUp('Niet genoeg bewijs!', text);
      return false;
    }
  }

  independentCheckBosIsChanged(results, indIndex, indVariableOptions, checkedCheckboxesIndexList) {
    for (let i = 0; i < checkedCheckboxesIndexList.length; i++) {
      for (let j = i+1; j < checkedCheckboxesIndexList.length; j++) {
        //checks if the independent variable are the same. If so, return false and give an error message
        if (results[checkedCheckboxesIndexList[i]][indIndex] === results[checkedCheckboxesIndexList[j]][indIndex]) {
          let text = "Momenteel heb je resultaten geselecteerd waartussen soms de " + indVariableOptions[indIndex] + 'hetzelfde is. Zorg ervoor dat de ' + indVariableOptions[indIndex] + 'verschilt tussen de aangevinkte resultaten!';
          this.drawBackgroundObjects.createPopUp('De ' + indVariableOptions[indIndex] + ' is hetzelfde!', text);
          return false;
        }
      }
    }
    return true;
  }
  
  independentCheckBosIsChangedAndControlled(results, indIndex, amountOfDepVars, reqIndVar, checkedCheckboxesIndexList){
    let checkedResults = [];
    for (let i = 0; i > checkedCheckboxesIndexList; i++){
    checkedResults.push(results[checkedCheckboxesIndexList[i]]);
    }
    
    //if (this.checkVariedIndAndControlled(checkedResults, indIndex, amountOfDepVars, reqIndVar)){
    //  console.log('The proof is controlled');
    //  return true;
    //} else {
    //  console.log('The proof is not controlled');
    //  return false;
    //}
    return true;
  }
}
