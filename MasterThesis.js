function setup() {
  createCanvas(100, 100);
}


function draw() {
  rect(30,20,10,10);
  if(adaptive) {
    rect(50,50,5,5);
  }
  
  adaptive = true;
}
