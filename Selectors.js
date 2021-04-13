
class Selector {
    shouldSelect(drawable, pos) {
        throw "abstract method";
    }

    isClose(drawable, pos) {
        throw "abstract method";
    }

    moveCursor(pos) {
        throw "abstract method";
    }

    drawCursor() {
        throw "abstract method";
    }
}


class BubbleSelector extends Selector {

    constructor(range) {
        super();
        this.range = range;

        this.cursor = new BubbleCursor(range);
        this.cursor.isTransparent = true;
        this.pos = { x: 0, y: 0 }
    }


    shouldSelect(d) {
        return this.inside(d.anchor.x, this.pos.x, (this.range - d.width) / 2) && this.inside(d.anchor.y, this.pos.y, (this.range - d.height) / 2)
    }

    isClose(d) {
        return this.inside(d.anchor.x, this.pos.x, this.range) && this.inside(d.anchor.y, this.pos.y, this.range)
    }

    inside(x, y, range) {
        return Math.abs(x - y) < range;
    }

    moveCursor(pos) {
        this.cursor.anchor = pos;
        this.pos = pos;
    }

    drawCursor() {
        this.cursor.draw();
    }
}