export default class Item {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }
    setCoords(coords) {
        this.coords = coords;
    }

    get coordX() {
        return this.coords[0];
    }
    set coordX(n) {
        this.coords[0] = n;
    }
    get coordY() {
        return this.coords[1];
    }
    set coordY(n) {
        this.coords[1] = n;
    }

    get d2() {
        return [
            this.coords,
            [this.coordX + this.width, this.coordY],
            [this.coordX + this.width, this.coordY + this.height],
            [this.coordX, this.coordY + this.height]
        ];
    }
}
