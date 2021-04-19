class EllipseEl extends Drawable {
  constructor(z, anchor, size) {
    super(z, anchor);
    if (size) {
      this.width = size;
      this.height = size;
    }
  }

  select(s) {
    this.isSelected = s;
  }

  drawEl() {
    const b = this.zIndex + 0.2
    let col = color(255 * b);

    if (this.isTransparent && !this.isSelected) {
      col = color(220 * b, 255 * b, 220 * b)
      col.setAlpha(120);
    }

    if (this.isPreselected) {
      col = color('pink');
      col.setAlpha(230);
    }

    if (this.isSelected) {
      col = color('green')
    }

    if (this.isHidden) {
      col.setAlpha(10);
      noStroke();
    }

    fill(col);
    ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
    stroke(0)
  }
}
