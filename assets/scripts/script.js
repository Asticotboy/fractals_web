const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const zoomInput = document.getElementById('zoom');
const resetButton = document.getElementById('reset');
const iterInput = document.getElementById('iter');
const fractaleInput = document.getElementById('fractale');
const colorLoopInput = document.getElementById('colorLoop');
const hueInput = document.getElementById('hue');




const width = canvas.width;
const height = canvas.height;

var maxIterations = 200;

var xMin = -2;
var xMax = 2;
var yMin = -1;
var yMax = 1;



var xCenter = (xMin + xMax) / 2;
var yCenter = (yMin + yMax) / 2;

var xStep = (xMax - xMin) / width;
var yStep = (yMax - yMin) / height;


fractaleType = 'julia';

var zoomFactor = 2;

const zoom = 1;

const colors = [
    [66, 30, 15],
    [25, 7, 26],
    [9, 1, 47],
    [4, 4, 73],
    [0, 7, 100],
    [12, 44, 138],
    [24, 82, 177],
    [57, 125, 209],
    [134, 181, 229],
    [211, 236, 248],
    [241, 233, 191],
    [248, 201, 95],
    [255, 170, 0],
    [204, 128, 0],
    [153, 87, 0],
    [106, 52, 3]
];

function getIterationsMandelbrot(x, y) {
    let Zr = 0;
    let Zi = 0;

    let Cr = x;
    let Ci = y;

    let iterations = 0;

    while (Zr * Zr + Zi * Zi < 4 && iterations < maxIterations) {
        let ZrNew = Zr * Zr - Zi * Zi + Cr;
        let ZiNew = 2 * Zr * Zi + Ci;


        Zr = ZrNew;
        Zi = ZiNew;

        iterations++;


    }

    return iterations;
}

function getIterationsBurningShip(x, y) {
    let Zr = 0;
    let Zi = 0;

    let Cr = x;
    let Ci = y;

    let iterations = 0;

    while (Zr * Zr + Zi * Zi < 4 && iterations < maxIterations) {
        let ZrNew = Zr * Zr - Zi * Zi + Cr;
        let ZiNew = 2 * Math.abs(Zr * Zi) + Ci;


        Zr = ZrNew;
        Zi = ZiNew;

        iterations++;
    }

    return iterations;

}

function getIterationsJulia(x, y) {
    let Zr = x;
    let Zi = y;

    let Cr = -0.8;
    let Ci = 0.156;

    let iterations = 0;

    while (Zr * Zr + Zi * Zi < 4 && iterations < maxIterations) {
        let ZrNew = Zr * Zr - Zi * Zi + Cr;
        let ZiNew = 2 * Zr * Zi + Ci;

        Zr = ZrNew;
        Zi = ZiNew;

        iterations++;
    }

    return iterations;
}



function draw() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            let iterations = 0;
            if (fractaleType === 'mandelbrot') {
                iterations = getIterationsMandelbrot(xCenter + (x - width / 2) * xStep, yCenter + (y - height / 2) * yStep);
            } else if ( fractaleType === 'julia') {
                iterations = getIterationsJulia(xCenter + (x - width / 2) * xStep, yCenter + (y - height / 2) * yStep);
            }
            else if (fractaleType === 'burningShip') {
                iterations = getIterationsBurningShip(xCenter + (x - width / 2) * xStep, yCenter + (y - height / 2) * yStep);
            }

            if (iterations < maxIterations) {
                let color = colors[iterations % colors.length];
                ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            } else {
                ctx.fillStyle = '#000';
            }

            ctx.fillRect(x, y, 1, 1);
        }
    }
}


draw();

// //si la touche A est appuyée
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'a') {

//         julia = false;
//         reset();
//     }
//     if (e.key === 'z') {

//         julia = true;
//         reset();
//     }

// });

function reset() {
    if (fractaleType === 'julia') {
        xMin = -2;
        xMax = 2;
    } else {
        xMin = -3;
        xMax = 1;
    }

    yMin = -1;
    yMax = 1;



    xCenter = (xMin + xMax) / 2;
    yCenter = (yMin + yMax) / 2;

    xStep = (xMax - xMin) / width;
    yStep = (yMax - yMin) / height;

    draw();
}

canvas.addEventListener('click', (e) => {
    let x = e.clientX;
    let y = e.clientY;

    xCenter = (xMin + xMax) / 2;
    yCenter = (yMin + yMax) / 2;

    xStep = (xMax - xMin) / width;
    yStep = (yMax - yMin) / height;

    let xCoord = xCenter + (x - width / 2) * xStep;
    let yCoord = yCenter + (y - height / 2) * yStep;

    xMin = xCoord - (xMax - xMin) / zoomFactor;
    xMax = xCoord + (xMax - xMin) / zoomFactor;
    yMin = yCoord - (yMax - yMin) / zoomFactor;
    yMax = yCoord + (yMax - yMin) / zoomFactor;

    xCenter = (xMin + xMax) / 2;
    yCenter = (yMin + yMax) / 2;

    xStep = (xMax - xMin) / width;
    yStep = (yMax - yMin) / height;

    draw();
});


zoomInput.addEventListener('change', (e) => {
    zoomFactor = e.target.value;
    console.log(zoomFactor);
});

resetButton.addEventListener('click', (e) => {

    reset();
});

iterInput.addEventListener('change', (e) => {
    maxIterations = e.target.value;
    reset();
});


fractaleInput.addEventListener('change', (e) => {
    fractaleType = e.target.value;

    reset();
}
);

colorLoopInput.addEventListener('change', (e) => {
    //si c'est coché 
    if (e.target.checked) {
        canvas.classList.add('colorLoop');
    } else {
        canvas.classList.remove('colorLoop');
    }
}
);

hueInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--color', `${e.target.value}deg`);

});




