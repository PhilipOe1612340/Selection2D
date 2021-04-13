class EllipseEl extends Drawable {
  constructor(z, anchor, size) {
    super(z, anchor);
    if (size) {
      this.width = size;
      this.height = size;
    }
  }

  select(s) {
    this.isSelected = this.isSelected || s;
  }

  drawEl() {
    let col = color(255);

    if (this.isTransparent && !this.isSelected) {
      col = color(220, 255, 220)
      col.setAlpha(120);
    }

    if (this.isPreselected) {
      col.setRed(0);
    }

    if (this.isSelected) {
      col = color('green')
    }

    fill(col);
    ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
  }
}
