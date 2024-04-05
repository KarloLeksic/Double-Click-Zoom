const zoomMultiplier = 2;
const container = document.getElementById('container');
const image = document.getElementById('image');
const containerPositionInfo = container.getBoundingClientRect();
const imagePositionInfo = image.getBoundingClientRect();

const translateSpaceX = (imagePositionInfo.width * zoomMultiplier - containerPositionInfo.width) / 2;
const translateSpaceY = (imagePositionInfo.height * zoomMultiplier - containerPositionInfo.height) / 2;

let isZoomed = false;
let isMouseDown = false;
let startX, startY, translateX, translateY;

container.addEventListener('dblclick', (e) => doubleClick(e));
container.addEventListener('mousedown', (e) => mouseDown(e));
document.addEventListener('mousemove', (e) => mouseMove(e));
document.addEventListener('mouseup', () => isMouseDown = false);

function translate() {
    image.style.transform = `scale(${zoomMultiplier}) translate(${translateX / zoomMultiplier}px, ${translateY / zoomMultiplier}px)`;
}

function scale(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Functions for events because events are different for mobile devices
function doubleClick(e) {
    if (isZoomed) {
        image.style.transform = "scale(1)";
        image.style.cursor = 'zoom-in';
    } else {
        translateX = scale(e.layerX, 0, imagePositionInfo.width, translateSpaceX, -translateSpaceX);
        translateY = scale(e.layerY, 0, imagePositionInfo.height, translateSpaceY, -translateSpaceY);

        translate();

        image.style.cursor = 'zoom-out';
    }

    isZoomed = !isZoomed;
}

function mouseDown(e) {
    e.preventDefault();
    isMouseDown = true;

    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
}

function mouseMove(e) {
    if (isZoomed && isMouseDown) {
        translateX = Math.min(Math.max(e.clientX - startX, -translateSpaceX), translateSpaceX);
        translateY = Math.min(Math.max(e.clientY - startY, -translateSpaceY), translateSpaceY);

        translate();
    }
}