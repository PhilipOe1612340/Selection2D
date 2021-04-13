

class Cursor extends Drawable {

    constructor() {
        super(Infinity, { x: 0, y: 0 })
    }
}

class BubbleCursor extends Cursor {
    constructor(range) {
        super();
        this.width = range;
        this.height = range;
    }

    drawEl() {
        let col = color(255);
        col.setAlpha(150);
        fill(col);
        stroke('green');
        strokeWeight(5);
        ellipse(this.anchor.x, this.anchor.y, this.width, this.height);

        col = color(0);
        col.setAlpha(20);
        noFill();
        stroke(col);
        strokeWeight(2);
        ellipse(this.anchor.x, this.anchor.y, this.width * 2, this.height * 2);
        stroke(0);
        strokeWeight(3);
    }

}

class RayCursor extends Cursor {
    constructor(range, pointerPos) {
        super();
        this.width = range;
        this.height = range;
        this.pointerPos = pointerPos;
    }

    drawEl() {
        let col = color(255);
        col.setAlpha(150);
        fill(col);
        stroke('green');
        strokeWeight(5);
        ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
        stroke(0);
        strokeWeight(3);
        this.drawZLegend();
    }


    drawZLegend() {
        const x = 100;
        const y = 200;

        rectMode(CORNERS);
        fill(220);
        rect(0, 0, x, y);

        fill(0);
        rect(0, y * (1 - this.pointerPos), x, y * (1 - this.pointerPos) + 10);
        rectMode(CENTER);
    }
}