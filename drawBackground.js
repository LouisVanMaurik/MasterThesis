class DrawBackgroundObjects {
  constructor(tempTextBoxWidth) {
    this.textBoxWidth = tempTextBoxWidth;
  }
  
  drawBackground(){
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
  
  drawTextBox(title, stringArray, xpos, ypos){
    let textsize = 20;
    
    //Draw background white rectangle
    fill(255);
    rect(xpos, ypos, this.textBoxWidth, textsize*2 + stringArray.length*(textsize+5));
    
    //write the the title
    fill(0);
    textSize(textsize);
    textStyle(BOLD);
    text(title, xpos+10, ypos+30);
  
    //write the string, if it is more lines, write each line at a different height
    textStyle(NORMAL);
    for (let i = 0; i <stringArray.length; i++){
      text(stringArray[i], xpos+10, ypos+55 + i * (textsize+5));
    }
  }
}
