const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentGridSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentGridSize(newSize) {
    currentGridSize = newSize;
}

const colorPicker = document.querySelector('#color-picker');
const colorModeButton = document.querySelector('#color-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');
const eraserModeButton = document.querySelector('#eraser-mode');
const clearButton = document.querySelector('#clear');
const gridSizeValue = document.querySelector('#grid-size-value')
const gridSizeSlider = document.querySelector('#grid-size-slider')
const canvas = document.querySelector('.canvas');

colorPicker.addEventListener('input', (e) => setCurrentColor(e.target.value));
colorModeButton.addEventListener('click', () => setCurrentMode('color'));
rainbowModeButton.addEventListener('click', () => setCurrentMode('rainbow'));
eraserModeButton.addEventListener('click', () => setCurrentMode('eraser'));
clearButton.addEventListener('click', () => reloadCanvas());
gridSizeSlider.addEventListener('change', (e) => changeGridSizeValue(e.target.value));

const canvasSize = canvas.clientWidth;

let grids = document.createElement('div');
grids.classList.add("grids");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeGridSizeValue(value) {
    setCurrentGridSize(value);
    updateGridSizeValue(value);
    reloadCanvas();
}

function updateGridSizeValue(value) {
    gridSizeValue.textContent = `${value} x ${value}`;
}

function reloadCanvas() {
    clearCanvas();
    initializeCanvas(currentGridSize);
}

function clearCanvas() {
    grids.innerHTML = ``;
//    Array.prototype.forEach.call(grids.children, grid => grid.style.backgroundColor = "#fefefe");
}

function initializeCanvas(gridSize) {
        for(let i=0; i<gridSize; i++) {
            for(let j=0; j<gridSize; j++) {
                const grid = document.createElement('div');
                grid.classList.add("grid");                        
                grid.style.width = `${canvasSize / gridSize}px`;
                grid.style.height = `${canvasSize / gridSize}px`;
                grid.addEventListener('mouseover', changeColor);
                grid.addEventListener('mousedown', changeColor);
                grids.appendChild(grid);
            }
        }
        canvas.appendChild(grids);
} 

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowModeButton.classList.remove('active')
    } else if (currentMode === 'color') {
      colorModeButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserModeButton.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowModeButton.classList.add('active')
    } else if (newMode === 'color') {
      colorModeButton.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserModeButton.classList.add('active')
    }
  }

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}

window.onload = () => {
  initializeCanvas(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}

