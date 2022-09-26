//For grid cell color
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "black";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

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
function setCurrentMode(mode) {
  currentMode = mode;
  activateMode(mode);
}

//When a mode is activated, call their respective functions
function activateMode() {
  if (currentMode === "black") {
    cellColor = "#000000";
  } else if (currentMode === "color") {
    console.log("color");
  } else if (currentMode === "rainbow") {
    rainbowColor();
  } else if (currentMode === "eraser") {
    console.log("eraser");
  } else if (currentMode === "clear") {
    console.log("clear");
  }
}

//For Rainbow button
const rainbowButton = document.getElementById("rainbow-mode");
rainbowButton.addEventListener("click", () => {
  setCurrentMode("rainbow");
});

function rainbowColor() {
  let randomRGB1 = Math.floor(Math.random() * 256);
  let randomRGB2 = Math.floor(Math.random() * 256);
  let randomRGB3 = Math.floor(Math.random() * 256);
  return `rgb(${randomRGB1}, ${randomRGB2}, ${randomRGB3})`;
}

//For eraser button
const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => {
  setCurrentMode("eraser");
  cellColor = "transparent";
});

//For clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  setCurrentMode("clear");
  sketchArea.innerHTML = "";
});

//Create grid cells & place on the sketch area
function createGrid() {
  for (let i = 0; i < userToggle * userToggle; i++) {
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
  } else if (currentMode === "color") {
    currentColor = "blue";
  } else if (currentMode === "rainbow") {
    currentColor = rainbowColor();
  } else if (currentMode === "eraser") {
    currentColor = "transparent";
  }
  e.target.style.backgroundColor = currentColor;
}
