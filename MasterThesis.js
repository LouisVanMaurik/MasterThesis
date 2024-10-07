let heightTimeSim;
let textBoxWidth;

function preload(){
  backgroundImg = loadImage('background.jpg');
}



function setup() {
  createCanvas(1300, 850);
  textBoxWidth = width-500;
  heightTimeSim = new HeightTimeSim(textBoxWidth);
}


function draw() {
  drawBackground();
  drawHypothesisPhase();
}

function drawBackground(){
  //tekent de achtergrond
  image(backgroundImg, 300, 0);
  fill(0, 207, 193, 200);
  rect(0,0,width,height);
  
  //tekent de zij vlakken
  fill(36, 106, 115);
  rect(0, 0, width, 100);
  rect(0, 0, 300, height);
  
  //schrijft text
  fill(255);
  textSize(50);
  textStyle(BOLD);
  text('Onderzoeksfase: Verwachting', 350, 70);
}

function drawHypothesisPhase(){
  //Displays the exercise textbox
  let explanation = heightTimeSim.ArrayOfStrings('Als wetenschapper is het belangrijk om altijd eerst te zeggen wat we denken dat er gaat gebeuren. Laten we dat samen doen! Schrijf op wat je denkt dat er gaat gebeuren. Vergeet hierbij niet het doel van het onderzoek. Kijk daarom eerst goed naar wat we willen ontdekken. Maak daarna de zin af, zodat we onze verwachting duidelijk hebben verwoord. ', textBoxWidth);
  let titleExercise = 'Opdracht ' + heightTimeSim.exerciseNumber + '.1'
  drawTextBox(titleExercise, explanation, 400, 150, textBoxWidth);
  
  //Displays the goal textbox
  let goal = heightTimeSim.goal;
  drawTextBox('Wat we willen ontdekken:', goal, 400, 320, textBoxWidth);
}

function drawTextBox(title, stringArray, xpos, ypos, tempTextBoxWidth){
  let textsize = 20;
  
  fill(255);
  rect(xpos, ypos, tempTextBoxWidth, textsize*2 + stringArray.length*(textsize+5));
  
  //schrijft text
  fill(0);
  textSize(textsize);
  textStyle(BOLD);
  text(title, xpos+10, ypos+30);

  textStyle(NORMAL);
  for (let i = 0; i <stringArray.length; i++){
    text(stringArray[i], xpos+10, ypos+55 + i * (textsize+5));
  }
}
