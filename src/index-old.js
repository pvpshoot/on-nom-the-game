import "./styles/index.scss";
import Player from "./Player";
import Target from "./Target";

document.addEventListener("DOMContentLoaded", () => {
    /*
     * Gamepad API Test
     * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
     *
     * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
     *
     * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
     */
    var haveEvents = "GamepadEvent" in window;
    var haveWebkitEvents = "WebKitGamepadEvent" in window;
    var controllers = {};
    var rAF =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.requestAnimationFrame;

    function connecthandler(e) {
        addgamepad(e.gamepad);
    }

    var canvas = document.getElementById("game");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    const OmNom = new Player(ctx);
    const Candy = new Target(ctx, [400, 400]);

    function addgamepad(gamepad) {
        controllers[gamepad.index] = gamepad;
        var d = document.createElement("div");
        d.setAttribute("id", "controller" + gamepad.index);
        var t = document.createElement("h1");
        t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
        d.appendChild(t);
        var b = document.createElement("div");
        b.className = "buttons";
        rAF(updateStatus);
    }

    function disconnecthandler(e) {
        removegamepad(e.gamepad);
    }

    function removegamepad(gamepad) {
        var d = document.getElementById("controller" + gamepad.index);
        document.body.removeChild(d);
        delete controllers[gamepad.index];
    }

    let startPosition = [500, 500];
    const heroSize = 20;
    const speed = 5;

    function updateStatus() {
        scangamepads();
        for (let j in controllers) {
            var controller = controllers[j];
            let move = [0, 0];
            for (var i = 0; i < controller.axes.length; i++) {
                move[i] = controller.axes[i] * speed;
                //   var a = axes[i];
                //   a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
                //   a.setAttribute("value", controller.axes[i]);
            }
            draw(move[0], move[1]);
        }

        rAF(updateStatus);
    }
    function draw(x = 0, y = 0) {
        // var ctx = canvas.getContext("2d");
        //   ctx.clearRect(startPosition[0], startPosition[1], heroSize, heroSize);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // let newX = startPosition[0] + x;
        // if (newX <= 0) {
        //     newX = 0;
        // } else if (newX + heroSize >= canvas.width) {
        //     newX = canvas.width - heroSize;
        // }
        // const newY = startPosition[1] + y;
        // startPosition = [newX, newY];
        OmNom.move(x, y);
        OmNom.draw();
        Candy.draw();
        OmNom.checkForCrossTarget(Candy, console.log);
    }

    function scangamepads() {
        var gamepads = navigator.getGamepads
            ? navigator.getGamepads()
            : navigator.webkitGetGamepads
            ? navigator.webkitGetGamepads()
            : [];
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                if (!(gamepads[i].index in controllers)) {
                    addgamepad(gamepads[i]);
                } else {
                    controllers[gamepads[i].index] = gamepads[i];
                }
            }
        }
    }

    if (haveEvents) {
        window.addEventListener("gamepadconnected", connecthandler);
        window.addEventListener("gamepaddisconnected", disconnecthandler);
    } else if (haveWebkitEvents) {
        window.addEventListener("webkitgamepadconnected", connecthandler);
        window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
    } else {
        setInterval(scangamepads, 500);
    }
});
