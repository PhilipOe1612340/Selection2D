class EllipseEl extends Drawable {
  constructor(z, anchor) {
    super(z, anchor);
  }

  select(s) {
    this.isSelected = this.isSelected || s;
  }

  drawEl() {
    let col = color(255);

    if (this.isTransparent && !this.isSelected) {
      col = color(220, 255, 220)
      col.setAlpha(128);
    }

    if (this.isSelected) {
      col = color('green')
    }

    fill(col);
    ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
  }
}
