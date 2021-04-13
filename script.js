const drawable = [];
let selectMode = false;
let pos = { x: 0, y: 0 };
const selector = new BubbleSelector();

async function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(3);

  const ma = 200;
  for (let index = 0; index < 100; index++) {
    drawable.push(new EllipseEl(drawable.length, { x: ~~random(ma, width - ma), y: ~~random(ma, height - ma) }))
  }
}

function draw() {
  background(255);

  selector.moveCursor(pos);
  drawable.forEach(d => d.isTransparent = selector.isClose(d, pos));
  selector.select(drawable, selectMode);
  if (selectMode === 'click') {
    selectMode = false;
  }

  drawable.forEach((d) => d.draw());
  selector.drawCursor();
}

function mouseClicked(_event) {
  selectMode = 'click';
  pos = { x: mouseX, y: mouseY };

}

function mouseDragged(_event) {
  selectMode = 'drag';
  pos = { x: mouseX, y: mouseY };
}

function mouseMoved() {
  pos = { x: mouseX, y: mouseY };
}

function mouseReleased() {
  selectMode = false;
}


function mouseWheel(event) {
  selector.modify(event.deltaY);
}

