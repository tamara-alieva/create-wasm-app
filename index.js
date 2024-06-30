import * as sim from "lib-simulation-wasm";

const simulation = new sim.Simulation();
const viewport = document.getElementById('viewport');
const viewportWidth = viewport.width;
const viewportHeight = viewport.height;

const ctxt = viewport.getContext('2d');

// отрисовка треугольника
CanvasRenderingContext2D.prototype.drawTriangle =
    function (x, y, size, rotation) {
        this.beginPath();

        this.moveTo(
            x - Math.sin(rotation) * size * 1.5,
            y + Math.cos(rotation) * size * 1.5,
        );

        this.lineTo(
            x - Math.sin(rotation + 2.0 / 3.0 * Math.PI) * size,
            y + Math.cos(rotation + 2.0 / 3.0 * Math.PI) * size,
        );

        this.lineTo(
            x - Math.sin(rotation + 4.0 / 3.0 * Math.PI) * size,
            y + Math.cos(rotation + 4.0 / 3.0 * Math.PI) * size,
        );

        this.lineTo(
            x - Math.sin(rotation) * size * 1.5,
            y + Math.cos(rotation) * size * 1.5,
        );

        //this.stroke();

        this.fillStyle = 'rgb(247, 108, 108)';
        this.fill();
    };

// отрисовка круга
CanvasRenderingContext2D.prototype.drawCircle = 
function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, 2.0 * Math.PI);
    this.fillStyle = 'rgb(36, 48, 94)';
    this.fill();
}

// функция для отрисовки птиц и пищи
function redraw() {
    ctxt.clearRect(0, 0, viewportWidth, viewportHeight);
    simulation.step();

    const world = simulation.world();

    for (const food of world.foods) {
        ctxt.drawCircle(
            food.x * viewportWidth,
            food.y * viewportHeight,
            (0.01 / 2.0) * viewportWidth,
        );
    }

    for (const animal of world.animals) {
        ctxt.drawTriangle(
            animal.x * viewportWidth,
            animal.y * viewportHeight,
            0.015 * viewportWidth,
            animal.rotation,
        );
    }
    requestAnimationFrame(redraw); // зацикливание симуляции
}

redraw();