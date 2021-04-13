const drawable = [];
let selectMode = false;
let pos = { x: 0, y: 0 };

const selectors = [new BubbleSelector(), new RaySelector(), new HidingSelector()];
let selectorNr = 0;
let selector = selectors[selectorNr];


async function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  stroke(0);

  const ma = 200;
  for (let index = 0; index < 100; index++) {
    drawable.push(new EllipseEl(drawable.length / 100, { x: ~~random(ma, width - ma), y: ~~random(ma, height - ma) }, ~~random(40, 80)))
  }
  textSize(32);
}

function draw() {
  background(255);

  drawText();

  selector.moveCursor(pos);
  drawable.forEach(d => d.isTransparent = selector.isClose(d, pos));
  selector.select(drawable, selectMode);
  if (selectMode === 'click') {
    selectMode = false;
  }

  drawable.forEach((d) => d.draw());
  selector.drawCursor();
}

function drawText() {
  fill(0);
  strokeWeight(1);

  text('press "space" to switch selection types', 200, 50);
  text(selector.name, width - 250, height - 30);

  fill(255);
  strokeWeight(3);
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

function keyTyped() {
  if (key === ' ') {
    selectorNr = (selectorNr + 1) % selectors.length;
    selector = selectors[selectorNr];
    drawable.forEach(d => d.isHidden = d.isPreselected = d.isSelected = false);
  }

  return false;
}