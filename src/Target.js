import Item from "./Item";

export default class Target extends Item {
    constructor(ctx, coords) {
        super(ctx, 20, 20);
        this.coords = coords;
    }

    draw() {
        this.ctx.fillRect(this.coordX, this.coordY, this.width, this.height);
    }
}
