

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

        fill(220);
        this.setGradient(0, 0, x, y + 10, color(255), color(255 * 0.2))


        fill('pink');
        noStroke();
        rectMode(CORNERS);
        rect(0, y * (1 - this.pointerPos), x, y * (1 - this.pointerPos) + 10);
        stroke(0);
    }


    setGradient(x, y, w, h, c1, c2) {
        noFill();

        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    }
}


class HidingCursor extends Cursor {
    constructor(range) {
        super();
        this.width = range;
        this.height = range;
        this.mode = 'select';
    }

    drawEl() {
        let col = color(255);
        col.setAlpha(150);
        fill(col);
        stroke('green');
        strokeWeight(5);
        ellipse(this.anchor.x, this.anchor.y, this.width, this.height);
        strokeWeight(3);
        
        
        noStroke();
        fill(0)
        text(this.mode + ' bubbles', 10, height - 100);
        stroke(0);
    }

}