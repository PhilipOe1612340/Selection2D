const padding = 5;
const maxWidth = 250;
const handelSize = 10;

class Drawable {
  zIndex = 0;
  width = 50;
  height = 50;
  isSelected = false;
  isTransparent = false;
  isPreselected = false;
  isHidden = false;

  constructor(z, anchor) {
    this.zIndex = z;
    this.anchor = anchor ?? { x: 50, y: 50 };
  }

  drawEl() {
    throw "abstract method";
  }

  draw() {
    this.drawEl();
  }
}

