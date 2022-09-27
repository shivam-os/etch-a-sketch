//For grid cell color
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "blackBtn";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

/*
4 modes: blackBtn, colorBtn, rainbowBtn, eraserBtn
Button active effect using .active class
*/

//Set up the rows & columns based on user input
const sketchArea = document.querySelector(".sketch-area");
const userToggle = 16;
const gridColumns = `repeat(${userToggle}, 1fr)`;
const gridRows = `repeat(${userToggle}, 1fr)`;
sketchArea.style.gridTemplateColumns = gridColumns;
sketchArea.style.gridTemplateRows = gridRows;

main();

function main() {
  createGrid();
}

//Set the current mode & activate it
function setCurrentMode(newMode) {
  activateMode(newMode);
  currentMode = newMode;
}

//When a new mode is passed
function activateMode(newMode) {

  //Remove the active class from the currentMode
  if (currentMode === "blackBtn") {
    blackButton.classList.remove("active");
  } else if (currentMode === "colorBtn") {
    colorButton.classList.remove("active");
  } else if (currentMode === "rainbowBtn") {
    rainbowButton.classList.remove("active");
  } else if (currentMode === "eraserBtn") {
    eraserButton.classList.remove("active");
  }

  //Add the active class to the newMode to get the effect
  if (newMode === "blackBtn") {
    blackButton.classList.add("active");
  } else if (newMode === "colorBtn") {
    colorButton.classList.add("active");
  } else if (newMode === "rainbowBtn") {
    rainbowButton.classList.add("active");
  } else if (newMode === "eraserBtn") {
    eraserButton.classList.add("active");
  }
}

//For Black button
const blackButton = document.getElementById("blackBtn");
blackButton.addEventListener("click", () => setCurrentMode("blackBtn"));

//For Color button
const colorButton = document.getElementById("colorBtn");
colorButton.addEventListener("click", () => setCurrentMode("colorBtn"));


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
  cellColor = "transparent";
});

//For clear button
const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", () => {
  reloadGrid();
});

//Remove all the previous grid & create a new one
function reloadGrid() {
  sketchArea.innerHTML = "";
  createGrid();
}

//Create grid cells & place on the sketch area
function createGrid(size = userToggle) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");

    //Attach event listener for mouse enter
    cell.addEventListener("mouseenter", setColor);
    sketchArea.appendChild(cell);
  }
}

//Set color of the grid cell
function setColor(e) {
  if (currentMode === DEFAULT_MODE) {
    currentColor = DEFAULT_COLOR;
  } else if (currentMode === "colorBtn") {
    currentColor = "blue";
  } else if (currentMode === "rainbowBtn") {
    currentColor = rainbowColor();
  } else if (currentMode === "eraserBtn") {
    currentColor = "transparent";
  }
  e.target.style.backgroundColor = currentColor;
}
