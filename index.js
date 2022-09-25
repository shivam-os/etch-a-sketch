const sketchArea = document.querySelector(".sketch-area");
for(let i = 0; i < 100; i++) {
  const box = document.createElement("div");
  box.classList.add("grid-box");
  sketchArea.appendChild(box);
}