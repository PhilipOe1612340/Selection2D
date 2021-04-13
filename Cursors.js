

class BubbleCursor extends Drawable {
    constructor(range) {
        super(Infinity, { x: 0, y: 0 });
        this.width = range;
        this.height = range;
    }

    drawEl() {
        let col = color(255);
        col.setAlpha(150);
        fill(col);
        ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
        
        col = color(255);
        col.setAlpha(100);
        fill(col);
        noStroke();
        ellipse(this.anchor.x, this.anchor.y, this.width * 2, this.height * 2);
        stroke(0);
    }
}