/*

 This class is responsible for giving feedback to the user. It only knows about the drawBackgroundObjects class, where it makes use of the popup-method.
 It is can be called by each specific phase class.
 
 */

class AdaptiveFeedback {
  constructor(drawBackgroundObjects) {
    this.drawBackgroundObjects = drawBackgroundObjects;

    //Creates all counts
    this.resetAllCounts();
  }

  //resets all counts when a new experiment is started (or creates them when first called in the constructor)
  resetAllCounts() {
    this.checkIndCorrectCount = 0;
    this.checkDepCorrectCount = 0;
    this.checkIndGoalHypothesisCount = 0;
    this.checkDepGoalHypothesisCount = 0;
    this.checkVariedIndCount = 0;
    this.checkVariedAndControlledIndCount = 0;
    this.checkIndGoalAnalyzeCount = 0;
    this.checkDepGoalAnalyzeCount = 0;
    this.checkCheckBoxVariedAndControlledIndCount = 0;
  }

  //checks if all adaptive criteria are met by calling each check function in the HYPOTHESIS phase
  giveAdaptiveFeedbackHypothesisPhase(goal, reqIndVar, reqDepVar, givenIndVar, givenDepVar, indVariableOptions, depVariableOptions, dropdownIndependentVar, dropdownDependentVar) {
    return this.checkIndCorrect(givenIndVar, indVariableOptions, reqIndVar, dropdownIndependentVar) &&
      this.checkDepCorrect(givenDepVar, depVariableOptions, reqDepVar, dropdownDependentVar) &&
      this.indIsGoalHypothesis(goal, givenIndVar, reqIndVar, dropdownIndependentVar) &&
      this.depIsGoalHypothesis(goal, givenDepVar, reqDepVar, dropdownDependentVar);
  }

  //Checks if a independent variable is placed on the independent variable spot, if not: give an error and return false
  checkIndCorrect(givenIndVar, indVariableOptions, reqIndVar, dropdown) {
    if (!indVariableOptions.includes(givenIndVar)) {
      if (this.checkIndCorrectCount === 0) {
        this.checkIndCorrectCount++;
        const text = "Een experiment heeft altijd een optie nodig die je vooraf kan kiezen. Bij iets zoals de <b>'" + givenIndVar + "'</b> weet je pas achteraf wat de waarde was. <br><br>Probeer daarom een optie in het eerste vakje te kiezen die je voordat het experiment doet al kan aanpassen.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else if (this.checkIndCorrectCount === 1) {
        this.checkIndCorrectCount++;
        const text = "Laat ik wat duidelijker zijn. Opties die je zou kunnen aanpassen zijn: <b>" + indVariableOptions[0] + ", " + indVariableOptions[1] + ", " + indVariableOptions[2] + "</b>. <br><br>Kies 1 van deze opties, en zorg ervoor dat die overeenkomt met wat we willen onderzoeken."
          this.drawBackgroundObjects.createPopUp('Nog niet helemaal:', text);
      } else {
        const text = "Hmmm, laat ik je bij deze stap wat meer helpen. De juiste keuze voor het eerste vakje is: '<b>" + reqIndVar + "</b>'.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }

  //Checks if a independent variable is placed on the dependent variable spot, if not: give an error and return false
  checkDepCorrect(givenDepVar, depVariableOptions, reqDepVar, dropdown) {
    if (!depVariableOptions.includes(givenDepVar)) {
      if (this.checkDepCorrectCount === 0) {
        this.checkDepCorrectCount++;
        const text = "Een experiment heeft altijd een optie nodig die je pas meet aan het einde. Bij iets zoals '<b>" + givenDepVar + "</b>' is een optie die je aanpast aan het begin. <br><br>Probeer daarom een optie in het derde vakje te kiezen die je kan meten.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else if (this.checkDepCorrectCount === 1) {
        this.checkDepCorrectCount++;
        const text = "Laat ik wat duidelijker zijn. Opties die je zou kunnen meten zijn: <b>" + depVariableOptions[0] + ", " + depVariableOptions[1] + "</b>. <br><br>Kies 1 van deze opties, en zorg ervoor dat die overeenkomt met wat we willen onderzoeken." ;
        this.drawBackgroundObjects.createPopUp('Nog niet helemaal:', text);
      } else {
        const text = "Hmmm, laat ik je bij deze stap wat meer helpen. De juiste keuze voor het derde vakje is: '<b>" + reqDepVar + "</b>'.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }

  //Checks if the given dependent variable is the one as described in the goal in the hypothesis phase, if not: give an error and return false
  indIsGoalHypothesis(goal, givenIndVar, reqIndVar, dropdown) {
    if (givenIndVar != reqIndVar) {
      if (this.checkIndGoalHypothesisCount === 0) {
        this.checkIndGoalHypothesisCount++;
        const text = "De keuze in het eerste vakje komt niet overeen met wat we willen ontdekken. Dus let op: <br><br>" + goal;
        this.drawBackgroundObjects.createPopUp('Wat willen we ontdekken?', text);
      } else {
        const text = "In het eerste vakje staat '<b>" + givenIndVar + "</b>'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: <b>" + reqIndVar + "</b>.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }


  //Checks if the given independent variable is the one as described in the goal in the hypothesis phase, if not: give an error and return false
  depIsGoalHypothesis(goal, givenDepVar, reqDepVar, dropdown) {
    if (givenDepVar != reqDepVar) {
      if (this.checkDepGoalHypothesisCount === 0) {
        this.checkDepGoalHypothesisCount++;
        const text = "De keuze in het derde vakje komt niet overeen met wat we willen ontdekken. Dus let op: <br><br>" + goal;
        this.drawBackgroundObjects.createPopUp('Wat willen we ontdekken?', text);
      } else {
        const text = "In het derde vakje staat '<b>" + givenDepVar + "</b>'. Dit is helaas niet wat willen onderzoeken. De juiste keuze is: <b>" + reqDepVar + "</b>.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }

  //checks if all experiment criteria are met by calling each checks function in the EXPERIMENT phase
  giveAdaptiveFeedbackExperimentPhase(results, reqIndVar, amountOfDepVars) {
    // results is a lists of list with the following data in this particulair order: Weight, Height, Color, TimeToDrop, Velocity
    let indIndex = this.getIndVarIndex(reqIndVar);
    return  this.checkMoreThenOne(results) &&
      this.checkVariedInd(results, indIndex, reqIndVar) &&
      this.checkVariedIndAndControlled(results, indIndex, amountOfDepVars, reqIndVar);
  }

  //Checks if the user has done more then one experiment, if not: give an error and return false
  checkMoreThenOne(results) {
    if (results.length < 2) {
      const text = "Bij een experiment wil je steeds iets veranderen. Zo ontdek je meer! Als je steeds dezelfde bal laat vallen, leer je weinig nieuws. Maar door bijvoorbeeld een zwaardere bal te gebruiken of de hoogte te veranderen, kun je zien wat er dan gebeurt.";
      this.drawBackgroundObjects.createPopUp('Niet genoeg experimenten!', text);
      return false;
    } else {
      return true;
    }
  }

  //Check if the independent variable has been changed between experiments by looking at the results, if not: give an error and return false
  checkVariedInd(results, index, reqIndVar) {
    if (results.length === 0) {
      return false;  // No data to compare
    }

    // Take the value from the first list at the specified index to compare with others
    // Note: It only has to be the first, because when it is changed once, it already is different from the first result
    let firstValue = results[0][index];

    // Compare the value at the specified index in all subsequent lists
    for (let i = 1; i < results.length; i++) {
      if (results[i][index] !== firstValue) {
        return true; // Found a difference, return false
      }
    }

    if (this.checkVariedIndCount === 0) {
      this.checkVariedIndCount++;
      const text = "Kijk nog is goed naar wat we willen ontdekken en wat we verwachten. Wat moeten we aanpassen in het experiment om daar achter te komen?";
      this.drawBackgroundObjects.createPopUp('Wat wilden we ontdekken?', text);
    } else {
      const text = "We willen kijken wat voor effect de '<b>" + reqIndVar + "</b>' heeft. Pas daarom de '<b>" + reqIndVar + "</b>' aan in het experiment!";
      this.drawBackgroundObjects.createPopUp('Wat wilden we ontdekken?', text);
    }

    // If no differences were found, return false
    return false;
  }

  //Checks if the independent variable has changed AND it is controlled, so the other ones weren't changed. If not: give an error and return false
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

        //Check only when the required independent variables are not the same
        if (results[i][index] !== results[j][index]) {

          let otherIndexesAreTheSame = true;

          //checks is all otherIndexesAre are the same for these particulair results
          //Note: otherIndexes looks only at the other dependent variables
          for (let k = 0; k < notIndexes.length; k++) {
            if (results[i][notIndexes[k]] !== results[j][notIndexes[k]]) {
              otherIndexesAreTheSame = false;
            }
          }
          if (otherIndexesAreTheSame) {
            // If there are no differences between the other independent variables, and the required independent variables are not the same,
            // return true
            return true;
          }
        }
      }
    }

    if (this.checkVariedAndControlledIndCount === 0) {
      this.checkVariedAndControlledIndCount++;
      const text = "Je bent op de goede weg. Je hebt namelijk wel de '<b>" + reqIndVar + "</b>' aangepast. Alleen heb je ook ondertussen iets anders aangepast. Probeer ervoor te zorgen dat je maar 1 ding tegelijk aanpast!";
      this.drawBackgroundObjects.createPopUp('Pas maar 1 ding tegelijk aan:', text);
    } else {
      const text = "Nog niet helemaal. Laat ik het in wat kleinere stapjes uitleggen. Klik eerst op <i>test</i>. Pas daarna alleen de '<b>" + reqIndVar + "</b>' aan. Klik dan weer op <i>test</i>. Nu heb je twee experimenten die exact hetzelfde zijn, naast de '<b>" + reqIndVar + "</b>'.";
      this.drawBackgroundObjects.createPopUp('Pas maar 1 ding tegelijk aan:', text);
    }
    return false;
  }

  //TO DOOOOOOOOOOOOOOOOOOOOOO: set the analyze feedback main function here

  //Checks if the given dependent variable is the one as described in the goal in the analyze phase, if not: give an error and return false
  indIsGoalAnalyze(givenIndVar, reqIndVar, dropdown) {
    if (givenIndVar != reqIndVar) {
      if (this.checkIndGoalAnalyzeCount === 0) {
        this.checkIndGoalAnalyzeCount++;
        const text = "De keuze in het eerste vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        const text = "In het eerste vakje staat '<b>" + givenIndVar + "</b>'. Dit is helaas niet wat wilden onderzoeken. De juiste keuze is: <b>" + reqIndVar + "</b>.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }


  //Checks if the given independent variable is the one as described in the goal in the hypothesis phase, if not: give an error and return false
  depIsGoalAnalyze(givenDepVar, reqDepVar, dropdown) {
    if (givenDepVar != reqDepVar) {
      if (this.checkDepGoalAnalyzeCount === 0) {
        this.checkDepGoalAnalyzeCount++;
        const text = "De keuze in het derde vakje komt niet overeen met wat we willen ontdekken.";
        this.drawBackgroundObjects.createPopUp('Let op:', text);
      } else {
        const text = "In het derde vakje staat '<b>" + givenDepVar + "</b>'. Dit is helaas niet wat wilden onderzoeken. De juiste keuze is: <b>" + reqDepVar + "</b>.";
        this.drawBackgroundObjects.createPopUp('Het juiste antwoord:', text);
      }
      dropdown.style('font-size', '16px');
      dropdown.style('border', '4px solid red');
      return false;
    } else {
      return true;
    }
  }

  //checks if all adaptive criteria are met by calling each checks function in the ANALYZE phase
  //Note: DD stands for dropdown-menu
  giveAdaptiveFeedbackAnalyzePhase(results, givenIndVar, givenDepVar, givenIndVarChange, givenDepVarChange,
    givenIndVarCheck, givenDepVarCheck, givenIndVarChangeCheck, givenDepVarChangeCheck, reqDepVar, reqIndVar, hypothesisCheck,
    DD_IndVarCheck, DD_IndChangeCheck, DD_DepVarCheck, DD_DepChangeCheck, DD_HypothesisCheck) {

    //console.log('givenIndVar = ' + givenIndVar);
    //console.log('givenDepVar = ' + givenDepVar);
    //console.log('givenIndVarChange = ' + givenIndVarChange);
    //console.log('givenDepVarChange = ' + givenDepVarChange);
    //console.log('givenIndVarCheck = ' + givenIndVarCheck);
    //console.log('givenDepVarCheck = ' + givenDepVarCheck);
    //console.log('givenIndVarChangeCheck = ' + givenIndVarChangeCheck);
    //console.log('givenDepVarChangeCheck = ' + givenDepVarChangeCheck);
    //console.log('reqDepVar = ' + reqDepVar);
    //console.log('reqIndVar = ' + reqIndVar);
    //console.log('hypothesisCheck = ' + hypothesisCheck);
    //console.log('------------------------------------');

    return this.indIsGoalAnalyze(givenIndVarCheck, reqIndVar, DD_IndVarCheck) &&
      this.depIsGoalAnalyze(givenDepVarCheck, reqDepVar, DD_DepVarCheck) &&
      this.checkIsEqualToWhatHappend(givenIndVarCheck, givenDepVarCheck, givenIndVarChangeCheck, givenDepVarChangeCheck) &&
      this.checkIsHypothesisCorrect();
  }

  //Checks if the description of what happend is true, if not: give an error and return false
  checkIsEqualToWhatHappend(givenIndVarCheck, givenDepVarCheck, givenIndVarChangeCheck, givenDepVarChangeCheck) {
    const relationshipDropdownInput = this.getRelationshipDropdownInput(givenIndVarChangeCheck, givenDepVarChangeCheck);
    const realRelationship = this.getRelationshipFromInd(givenIndVarCheck);
    
    if (relationshipDropdownInput === realRelationship){
      return true;
    } else {
      //TO DO: Ga morgen deze error message opsplitsen in drie verschillende, daarnaast moet je ook de hypothese functie nog schrijven
      const text = "GIVEN_IND_VAR en GIVEN_DEP_VAR zijn beide correct! Die hoef je dus niet meer aan te passen. Alleen klopt wat je zegt niet helemaal! Kijk nog is goed wat er gebeurde, als GIVEN_IND_VAR minder/meer werd, wat gebeurde er dan met GIVEN_DEP_VAR?";
      this.drawBackgroundObjects.createPopUp('Wat gebeurde er precies?', text);
    }
    
    return false;
  }

  //Checks if the stated hypothesis was correct or not, if not: give an error and return false
  checkIsHypothesisCorrect() {
    const indIndex = this.getDepVarIndex();
    const depIndex = this.getDepVarIndex();
    return true;
  }

  // Helper function to determine the relationship between variables
  // Note: this function is fully 'hardcoded'. It would be more elegant to actualy check it in the results
  getRelationshipFromInd(givenIndVar) {
    if (givenIndVar === 'massa van de bal' || givenIndVar === 'kleur van de bal'){
      //either 'massa van de bal' and 'kleur van de bal' don't have any effect on time to drop and the velocity
      return 'independent';
    } else if (givenIndVar === 'hoogte van de bal'){
      //the height of the ball has a direct relationship with either time to drop and the velocity
      return 'direct';
    }
  }

  // Helper function to determine the relationship between variables from dropdown menu inputs
  getRelationshipDropdownInput(indVarChange, depVarChange) {
    // Check for 'direct' relationship
    if (
      (
      (indVarChange === 'meer laat worden' || indVarChange === 'meer liet worden') &&
      depVarChange === 'meer worden'
      ) ||
      (
      (indVarChange === 'minder laat worden' || indVarChange === 'minder liet worden') &&
      depVarChange === 'minder worden'
      )
      ) {
      return 'direct';
    }

    // Check for 'inverse' relationship
    if (
      ((indVarChange === 'meer laat worden' || indVarChange === 'meer liet worden') &&
      depVarChange === 'minder worden')
      ||
      ((indVarChange === 'minder laat worden' || indVarChange === 'minder liet worden') &&
      depVarChange === 'meer worden')
      )
    {
      return 'inverse';
    }

    // Check for 'independent' relationship
    if (
      indVarChange === 'hetzelfde laat' ||
      indVarChange === 'hetzelfde liet' ||
      depVarChange === 'hetzelfde blijven'
      ) {
      return 'independent';
    }

    // If no valid relationship is found, give an error message
    console.log('Something is going very wrong: no relationship was found in the getRelationshipMethod')
  }

  //checks if all criteria are met by calling each checks function in the PROOF phase
  giveAdaptiveFeedbackProofPhase(results, reqIndVar, indVariableOptions, checkboxesList) {
    console.log('I just got in the adaptiveFeedbackProofPhase function. CheckboxesList = ' + checkboxesList);
    let indIndex = this.getIndVarIndex(reqIndVar);
    let checkedCheckboxesIndexList = this.indexListCheckedBoxes(checkboxesList);
    return  this.moreThenOneOptionChecked(checkedCheckboxesIndexList) &&
      this.independentCheckBosIsChanged (results, indIndex, indVariableOptions, checkedCheckboxesIndexList) &&
      this.independentCheckBosIsChangedAndControlled(results, indIndex, indVariableOptions, reqIndVar, checkedCheckboxesIndexList);
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

  //checks if there are atleast 2 boxes selected, if not: give an error and return false
  moreThenOneOptionChecked(checkedCheckboxesIndexList) {
    if (checkedCheckboxesIndexList.length > 1) {
      return true;
    } else {
      const text = "Momenteel heb je maar 1 resultaat geselecteerd. Om te bewijzen dat er iets wel of niet veranderd is in het experiment, heb je er <b>minstens twee</b> nodig.";
      this.drawBackgroundObjects.createPopUp('Niet genoeg bewijs!', text);
      return false;
    }
  }

  //checks if the required independent variable is not the same between selected checkboxes, if not: give an error and return false
  independentCheckBosIsChanged(results, indIndex, indVariableOptions, checkedCheckboxesIndexList) {
    for (let i = 0; i < checkedCheckboxesIndexList.length; i++) {
      for (let j = i+1; j < checkedCheckboxesIndexList.length; j++) {
        //checks if the independent variable are the same. If so, return false and give an error message
        if (results[checkedCheckboxesIndexList[i]][indIndex] === results[checkedCheckboxesIndexList[j]][indIndex]) {
          const text = "Momenteel heb je resultaten geselecteerd waartussen soms de '<b>" + indVariableOptions[indIndex] + "</b>' hetzelfde is. Zorg ervoor dat de '<b>" + indVariableOptions[indIndex] + "</b>' verschilt tussen de aangevinkte resultaten!";
          this.drawBackgroundObjects.createPopUp('De ' + indVariableOptions[indIndex] + ' is hetzelfde!', text);
          return false;
        }
      }
    }
    return true;
  }

  //checks if the other independent variables are not changed between the selected checkboxes, , if not: give an error and return false
  independentCheckBosIsChangedAndControlled(results, indIndex, indVariableOptions, reqIndVar, checkedCheckboxesIndexList) {
    let amountOfDepVars = indVariableOptions.length;
    let checkedResults = [];

    for (let i = 0; i < checkedCheckboxesIndexList.length; i++) {
      checkedResults.push(results[checkedCheckboxesIndexList[i]]);
    }

    let notIndexes = [];
    for (let i = 0; i < amountOfDepVars; i++) {
      if (i !== indIndex) {
        notIndexes.push(i);
      }
    }

    // Loop through each result and compare with each other
    for (let i = 0; i < checkedResults.length; i++) {
      for (let j = i + 1; j < checkedResults.length; j++) {
        if (checkedResults[i][indIndex] !== checkedResults[j][indIndex]) {
          let otherIndexesAreTheSame = true;
          for (let k = 0; k < notIndexes.length; k++) {
            if (checkedResults[i][notIndexes[k]] !== checkedResults[j][notIndexes[k]]) {
              otherIndexesAreTheSame = false;
            }
          }
          if (otherIndexesAreTheSame) {
            return true;
          }
        }
      }
    }

    if (this.checkCheckBoxVariedAndControlledIndCount === 0) {
      this.checkCheckBoxVariedAndControlledIndCount++;
      const text = "Je bent op de goede weg. Je hebt namelijk wel opties gekozen waar de '<b>" + reqIndVar + "</b>' veranderd. Alleen heb je ook ondertussen opties aangevinkt waar iets anders is veranderd. <br><br> Kies opties waar de '<b>" + reqIndVar + "</b>' veranderd en de rest hetzelfde blijft.";
      this.drawBackgroundObjects.createPopUp('Niet 1 ding veranderd', text);
    } else {
      const text = "Nog niet helemaal. Het klopt dat de '<b>" + reqIndVar + "</b>' veranderd bij de opties die je hebt aangevinkt. <br><br> Alleen moet de '<b>" + indVariableOptions[notIndexes[0]] + "</b>' en de '<b>" + indVariableOptions[notIndexes[1]] + "</b>' hetzelfde blijven. Die mogen niet veranderen. <br><br> Kies opties waar de '<b>" + reqIndVar + "</b>' veranderd en de rest hetzelfde blijft.";
      this.drawBackgroundObjects.createPopUp('Pas maar 1 ding tegelijk aan:', text);
    }
    return false;
  }

  //Helper method that returns the index depending on what the independent variable is
  //Note: the index is the one needed for get the right column in the results list
  getIndVarIndex(reqIndVar) {
    switch (reqIndVar) {
    case 'massa van de bal':
      return 0;
    case 'hoogte van de bal':
      return 1;
    case 'kleur van de bal':
      return 2;
    default:
      console.log('The getIndVarIndex is broken, it got a unkown reqIndVar string and does not know which index to return');
      return undefined;
    }
  }

  //Helper method that returns the index depending on what the dependent variable is
  //Note: the index is the one needed for get the right column in the results list
  getDepVarIndex(reqDepVar) {
    switch (reqDepVar) {
    case 'massa van de bal':
      return 3;
    case 'hoogte van de bal':
      return 4;
    default:
      console.log('The getDepVarIndex is broken, it got a unkown reqDepVar string and does not know which index to return');
      return undefined;
    }
  }
}
