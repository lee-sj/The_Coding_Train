var s;
var scl = 10;

function setup(){
    createCanvas(200,200);
    s = new Snake();
    frameRate(10);
}

function draw() {
    background(51);
    
    s.update();
    s.show();   
    
}

function keyPressed() {
    if (keyCode === UP_ARROW){
        s.dir(0,-1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0,1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1,0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1,0);
    }
}
