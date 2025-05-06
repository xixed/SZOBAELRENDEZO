let currentRoom = null;
 let currentGridState = null;
 
 
 
async function download() {
    const response = await fetch("http://localhost:5195/roomapi");
    const room = await response.json();

    currentRoom = room;
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = ""

    const widthInCm = parseFloat(room.widht)
    const heightInCm = parseFloat(room.height)

    const colCount = Math.floor(widthInCm / 10)
    const rowCount = Math.floor(heightInCm / 10)

    const gridState = Array.from({ length: rowCount }, () => Array(colCount).fill(null));
    currentGridState = gridState;
    const grid = document.createElement("div");
    grid.style.display = "grid"
    grid.style.gridTemplateColumns = `repeat(${colCount}, 10px)`

    grid.style.marginBottom = "10px"
    const cellRefs = [];

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            const cell = document.createElement("div");
            cell.style.width = "10px"
            cell.style.height = "10px"
            cell.style.border = "1px solid #ccc"
            cell.style.backgroundColor = "#fff"
            grid.appendChild(cell);
            if (!cellRefs[i]) cellRefs[i] = [];
            cellRefs[i][j] = cell
        }
    }

    gridContainer.appendChild(grid);
}