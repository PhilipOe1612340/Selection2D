
class Selector {
    constructor(range) {
        this.range = range;
        this.pos = { x: 0, y: 0 }
    }


    select(elements) {
        throw "abstract method";
    }

    isClose() {
        return false;
    }

    moveCursor(pos) {
        this.cursor.anchor = pos;
        this.pos = pos;
    }

    drawCursor() {
        this.cursor.draw();
    }

    modify(byN) {
    }
}


class BubbleSelector extends Selector {

    constructor() {
        super(100);
        this.cursor = new BubbleCursor(this.range);
    }

    select(collection, mode) {
        if (!mode) { return }
        collection.forEach(d => d.select(d.isSelected || this.shouldSelect(d)));
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

    modify(byN) {
        this.range = Math.max(this.range - byN / 10, 55);
        this.cursor.width = this.range;
        this.cursor.height = this.range;
    }
}

class RaySelector extends Selector {
    constructor() {
        super(50);
        this.pointerPos = 0.5;
        this.cursor = new RayCursor(50, this.pointerPos);
    }

    select(collection, mode) {
        collection.forEach(d => d.isPreselected = false);
        const inRange = collection.filter(d => this.shouldSelect(d));
        if (inRange.length === 0) {
            return;
        }

        if (inRange.length === 1) {
            if (mode) {
                inRange[0].select(true);
            } else {
                inRange[0].isPreselected = true;
            }
        }

        const heights = inRange.map(r => r.zIndex);

        const min = Math.min(...heights);
        const max = Math.max(...heights);

        const dist = ({ zIndex }) => Math.abs((zIndex - min) / (max - min) - this.pointerPos);
        const closest = inRange.reduce((min, curr) => dist(curr) < dist(min) ? curr : min, inRange[0]);

        if (mode) {
            closest.select(true);
        } else {
            closest.isPreselected = true;
        }
    }

    shouldSelect(d) {
        return this.inside(d.anchor.x, this.pos.x, this.range) && this.inside(d.anchor.y, this.pos.y, this.range)
    }

    inside(x, y, range) {
        return Math.abs(x - y) < range;
    }

    modify(byN) {
        this.pointerPos = Math.min(Math.max(this.pointerPos - byN / 3000, 0), 1);
        this.cursor.pointerPos = this.pointerPos;
    }
}
class HidingSelector extends Selector {

    constructor() {
        super(50);
        this.cursor = new HidingCursor(this.range);
        this.unSelectMode = false;
    }

    select(collection, mode) {

        collection.forEach(d => {
            d.isHidden = false;
            if (mode) {
                if (this.unSelectMode && d.isSelected) {
                    d.select(!this.shouldSelect(d));
                }
                if (!this.unSelectMode && !d.isSelected) {
                    d.select(this.shouldSelect(d));
                }
            }

            d.isHidden = d.isSelected !== this.unSelectMode;
        });
    }

    shouldSelect(d) {
        return this.inside(d.anchor.x, this.pos.x, this.range) && this.inside(d.anchor.y, this.pos.y, this.range)
    }

    inside(x, y, range) {
        return Math.abs(x - y) < range;
    }

    modify(byN) {
        this.unSelectMode = Math.sign(byN) === -1;
        this.cursor.mode = this.unSelectMode ? 'unselect' : 'select';
    }
}