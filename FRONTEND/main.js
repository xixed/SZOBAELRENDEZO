let currentRoom = null;
 let currentGridState = null;
 
 
 
async function download() {
    const response = await fetch("http://localhost:5249/roomapi");
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

    function placeFurniture(name, w, h) {
        let triedAgain = false

        function tryPlace() {
            for (let i = 0; i <= rowCount - h; i++) {
                for (let j = 0; j <= colCount - w; j++) {
                    
                    if (canPlace(i, j, w, h,currentGridState)) {

                        const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
                        
                        for (let di = 0; di < h; di++) {
                            for (let dj = 0; dj < w; dj++) {
                                gridState[i + di][j + dj] = name
                            }
                        }
                        
                        const furnitureDiv = document.createElement("div");
                        furnitureDiv.innerText = name;
                        furnitureDiv.style.position = "absolute";
                        furnitureDiv.style.left = `${j * 10}px`;
                        furnitureDiv.style.top = `${i * 10}px`;
                        furnitureDiv.style.width = `${w * 10}px`;
                        furnitureDiv.style.height = `${h * 10}px`;
                        furnitureDiv.style.backgroundColor = color;
                        furnitureDiv.style.display = "flex";
                        furnitureDiv.style.alignItems = "center";
                        furnitureDiv.style.justifyContent = "center";
                        furnitureDiv.style.fontSize = `${h * 2}px`;
                        furnitureDiv.style.fontWeight = "bold";
                        furnitureDiv.style.color = "#000";
                        
                        furnitureDiv.style.boxSizing = "border-box";
                        furnitureDiv.style.borderRadius = "2px";
                        furnitureDiv.style.textAlign = "center";
                        furnitureDiv.style.overflow = "hidden";

                        grid.style.position = "relative";
                        grid.appendChild(furnitureDiv);
                        
                        return true
                    }
                }
            }


            return false
        }

        if (tryPlace()) return true

    
        if (!triedAgain) {
            triedAgain = true
            if (tryPlace()) return true
        }

        console.warn(`Nincs hely a bútor elhelyezésére.`)
        
        return false;
    }

    room.furnitures.forEach(f => {
        const width = Math.ceil(f.width / 10);
        const height = Math.ceil(f.height / 10);
        placeFurniture(f.name, width, height);
    });
}

function room_create()
 {
     let room_width = document.querySelector("#room_width").value
     let room_height = document.querySelector("#room_height").value
 
     fetch("http://localhost:5249/roomapi/room",
         {
             method:"POST",
             headers:{"Content-Type": "application/json",},
             body: JSON.stringify({
                 Widht: room_width,
                 Height: room_height
             })
         })
         .then(resp => {
             console.log("Response: ", resp)
             if (resp.status === 200)
             {
                 download()
                 const divcont = document.getElementById("room-container");
                 divcont.innerHTML = "";
                 const furdiv = document.getElementById("furniture-container");
                 furdiv.style.display = "block"
                 const title = document.getElementById("room_title");
                 title.style.display = "block"
                 const new_room = document.getElementById("new-room");
                 new_room.style.display = "block"
             }
         })
         .catch(error => console.log(error)) 
}


function furniture_create()
{
    let furniture_name = document.querySelector("#furniture_name").value
    let furniture_width = document.querySelector("#furniture_width").value
    let furniture_height = document.querySelector("#furniture_height").value
    

    fetch(`http://localhost:5249/roomapi/furniture`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Name: furniture_name,
            Width: furniture_width,
            Height: furniture_height
        })
    })
    .then(resp => {
        if (resp.ok) {
            console.log("Bútor sikeresen hozzáadva.");
            download();
            
        } else {
            console.error("Hiba történt bútor hozzáadásakor.");
        }
    });
}