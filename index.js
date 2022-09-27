//For grid cell color
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "colorBtn";
const DEFAULT_SIZE = 16;

//Initializing global variables
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

/*
3 modes: colorBtn, rainbowBtn, eraserBtn
Button active effect is made using .active class
*/

//Sketch area
const sketchArea = document.querySelector(".sketch-area");

//Start the grid with default size
createGrid(currentSize);

//--------------------Buttons & Inputs-------------------//

//For Color button
const colorButton = document.getElementById("colorBtn");
colorButton.addEventListener("click", () => setCurrentMode("colorBtn"));

//For color picker
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => (currentColor = e.target.value));

function getCustomColor() {
  let userColor = document.getElementById("colorPicker");
  return userColor.value;
}

//For Rainbow button
const rainbowButton = document.getElementById("rainbowBtn");
rainbowButton.addEventListener("click", () => {
  setCurrentMode("rainbowBtn");
});

function rainbowColor() {
  let randomRGB1 = Math.floor(Math.random() * 256);
  let randomRGB2 = Math.floor(Math.random() * 256);
  let randomRGB3 = Math.floor(Math.random() * 256);
  return `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;
}

//For eraser button
const eraserButton = document.getElementById("eraserBtn");
eraserButton.addEventListener("click", () => {
  setCurrentMode("eraserBtn");
});

//For clear button
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", () => {
  reloadGrid(currentSize);
});

//For size slider & display
const sizeSlider = document.getElementById("sizeSlider");
const sizeDisplay = document.getElementById("sizeDisplay");

sizeSlider.addEventListener("input", (e) => {
  currentSize = e.target.value;
  sizeDisplay.textContent = `${currentSize} X ${currentSize}`;
  reloadGrid(currentSize);
});

//Remove all the previous grid & create a new one
function reloadGrid(currentSize) {
  sketchArea.innerHTML = "";
  createGrid(currentSize);
}

/*
When a button is pressed, activate it (add active effect to it) &
set the current mode to it.
*/
function setCurrentMode(newMode) {
  activateMode(newMode);
  currentMode = newMode;
}

//When a new mode is passed
function activateMode(newMode) {
  //Remove the active class from the currentMode
  if (currentMode === "colorBtn") {
    colorButton.classList.remove("active");
  } else if (currentMode === "rainbowBtn") {
    rainbowButton.classList.remove("active");
  } else if (currentMode === "eraserBtn") {
    eraserButton.classList.remove("active");
  }

  //Add the active class to the newMode to get the effect
  if (newMode === "colorBtn") {
    colorButton.classList.add("active");
  } else if (newMode === "rainbowBtn") {
    rainbowButton.classList.add("active");
  } else if (newMode === "eraserBtn") {
    eraserButton.classList.add("active");
  }
}

//----------------Grid Area & Setting color-----------------//

//Create grid cells & place on the sketch area
function createGrid(size = DEFAULT_SIZE) {
  const gridColumns = `repeat(${currentSize}, 1fr)`;
  const gridRows = `repeat(${currentSize}, 1fr)`;
  sketchArea.style.gridTemplateColumns = gridColumns;
  sketchArea.style.gridTemplateRows = gridRows;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    //Attach event listener for mouse enter
    cell.addEventListener("mousedown", setColor);
    cell.addEventListener("mouseover", setColor);
    sketchArea.appendChild(cell);
  }
}

//Set color of the grid cell
function setColor(e) {
  if (currentMode === DEFAULT_MODE) {
    currentColor = getCustomColor();
  } else if (currentMode === "rainbowBtn") {
    currentColor = rainbowColor();
  } else if (currentMode === "eraserBtn") {
    currentColor = "transparent";
  }
  e.target.style.backgroundColor = currentColor;
}
