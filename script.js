const zoomMultiplier = 2;
const container = document.getElementById('container');
const image = document.getElementById('image');

let translateSpaceX = 0;
let translateSpaceY = 0;

let isZoomed = false;
let mouseDown = false;
let startX, startY, translateX, translateY;

image.addEventListener('dblclick', (e) => {
    const containerPosition = container.getBoundingClientRect();
    const imagePosition = image.getBoundingClientRect();

    translateSpaceX = (imagePosition.width * zoomMultiplier - containerPosition.width) / 2;
    translateSpaceY = (imagePosition.height * zoomMultiplier - containerPosition.height) / 2;

    if (isZoomed) {
        image.style.transform = "scale(1)";
        image.style.cursor = 'zoom-in';
    } else {
        translateX = scale(e.layerX, 0, containerPosition.width, translateSpaceX, -translateSpaceX);
        translateY = scale(e.layerY, 0, containerPosition.height, translateSpaceY, -translateSpaceY);

        translate();

        image.style.cursor = 'zoom-out';
    }

    isZoomed = !isZoomed;
});

container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mouseDown = true;

    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
});

document.addEventListener('mousemove', (e) => {
    if (isZoomed && mouseDown) {
        translateX = Math.min(Math.max(e.clientX - startX, -translateSpaceX), translateSpaceX);
        translateY = Math.min(Math.max(e.clientY - startY, -translateSpaceY), translateSpaceY);

        translate();
    }
});

document.addEventListener('mouseup', () => {
    mouseDown = false;
});

function translate() {
    image.style.transform = `scale(${zoomMultiplier}) translate(${translateX / zoomMultiplier}px, ${translateY / zoomMultiplier}px)`;
}

function scale(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}