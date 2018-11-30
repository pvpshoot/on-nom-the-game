import Phaser from "phaser";
import "./styles/index.scss";
import { randomPositions } from "./utils";
import omnom from "./assets/omnom.png";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0, x: 0 }
        }
    },
    input: {
        gamepad: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
console.log(Phaser.Utils);

function preload() {
    this.load.image("om-nom", omnom);

    this.load.image(
        "candy",
        "https://vignette.wikia.nocookie.net/cuttherope/images/1/1c/Candy.png/revision/latest?cb=20111028025349"
    );
}

let gamepad;
let player;

function create() {
    this.input.gamepad.start();

    gamepad = this.input.gamepad.pad1;

    const candies = this.physics.add.group();

    // candies.children.iterate(child =>
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    // );

    randomPositions(20).forEach(el => {
        candies
            .create(el[0], el[1], "candy")
            .setScale(0.3)
            .setSize(10, 10);
    });

    player = this.physics.add.sprite(0, 0, "om-nom");
    player.setBounce(2);
    player.setCollideWorldBounds(true);
    candies.children.iterate(c => {
        c.setCollideWorldBounds(true);
        // debugger; //eslint-disable-line
    });

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("om-nom", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "turn",
        frames: [{ key: "om-nom", frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("om-nom", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // this.physics.add.collider(player, candies);

    this.physics.add.overlap(player, candies, collectStar, null, this);
}

function update() {
    if (!gamepad && this.input.gamepad.pad1) {
        gamepad = this.input.gamepad.pad1;
    }

    if (gamepad && player) {
        const L = gamepad.leftStick;
        const R = gamepad.rightStick;

        if (player.anims) {
            player.setVelocity(L.x * 1000, L.y * 1000);
        }
    }
}

function collectStar(player, candy) {
    candy.disableBody(true, true);
}
