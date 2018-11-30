import Item from "./Item";

export default class Player extends Item {
    constructor(ctx) {
        super(ctx, 20, 20);
        this.speed = 4;
        this.coords = [window.innerWidth / 2, window.innerHeight / 2];
    }

    move(x, y) {
        const speedX = x * this.speed;
        const speedY = y * this.speed;

        if (this.coordX + speedX < 0) {
            this.coordX = 0;
        } else if (this.coordX + speedX + this.width > window.innerWidth) {
            this.coordX = window.innerWidth - this.width;
        } else {
            this.coordX = this.coordX + speedX;
        }

        if (this.coordY + speedY < 0) {
            this.coordY = 0;
        } else if (this.coordY + speedY + this.width > window.innerHeight) {
            this.coordY = window.innerHeight - this.height;
        } else {
            this.coordY = this.coordY + speedY;
        }
    }

    checkForCrossTarget(target, callBack) {
        const t2d = target.d2;
        const p2d = this.d2;

        console.log("============");
        console.log(t2d[0][0], p2d[2][0], t2d[0][0] <= p2d[2][0]);
        console.log(t2d[0][1], p2d[2][1], t2d[0][1] <= p2d[2][1]);

        return (
            (t2d[0][0] <= p2d[2][0] && t2d[0][1] <= p2d[2][1]) ||
            (t2d[1][0] >= p2d[3][0] && t2d[1][1] >= p2d[3][1]) ||
            (t2d[2][0] >= p2d[0][0] && t2d[2][1] <= p2d[2][1]) ||
            (t2d[3][0] <= p2d[1][0] && t2d[3][1] >= p2d[2][1])
        );
    }

    draw() {
        this.ctx.fillRect(this.coordX, this.coordY, this.width, this.height);
    }
}
