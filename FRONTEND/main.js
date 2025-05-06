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
        furniture_delete()
        return false;
    }

    room.furnitures.forEach(f => {
        const width = Math.ceil(f.width / 10);
        const height = Math.ceil(f.height / 10);
        placeFurniture(f.name, width, height);
    });
    Furtniture_Clear()
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



function canPlace(x, y, w, h, gridState) {
 
    const rowCount = gridState.length
    const colCount = gridState[0].length

    if (x + h + 1 > rowCount || y + w + 1 > colCount) return false;

    for (let i = x - 1; i <= x + h; i++) {
        for (let j = y - 1; j <= y + w; j++) {
            if (i < 0 || j < 0 || i >= rowCount || j >= colCount) continue;
            if (gridState[i][j] !== null) return false;
        }
    }
    return true;
}

function canFurnitureFit(w, h) {
    if (!currentRoom || !currentGridState) return false;

    const rowCount = currentGridState.length;
    const colCount = currentGridState[0].length;

    for (let i = 0; i <= rowCount - h; i++) {
        for (let j = 0; j <= colCount - w; j++) {
            if (canPlace(i, j, w, h, currentGridState)) return true;
        }
    }

    return false;
}


function furniture_delete()
{
    let furniture_name = document.querySelector("#furniture_name").value
    let furniture_width = document.querySelector("#furniture_width").value
    let furniture_height = document.querySelector("#furniture_height").value

    fetch(`http://localhost:5249/roomapi`, {
        method: "Delete",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Name: furniture_name,
            Width: furniture_width,
            Height: furniture_height
        })
    })
    .then(resp => {
        if (resp.ok) {
            console.log("Bútor sikeresen törölve.");
        } else {
            console.error("Hiba történt bútor hozzáadásakor.");
        }
    });
}

function Furtniture_Clear()
{
    const furniture_width = document.getElementById("furniture_width")
    furniture_width.value=""
    const furniture_height = document.getElementById("furniture_height")
    furniture_height.value=""
    const furniture_name = document.getElementById("furniture_name")
    furniture_name.value=""
    const furniture_submit = document.getElementById("furniture_submit")
    furniture_submit.disabled = true

    validate()
}


document.addEventListener("DOMContentLoaded", function () {
 
    const room_width = document.getElementById("room_width")
    const room_height = document.getElementById("room_height")
    const submitA= document.getElementById("room_submit")
    
    const furniture_width = document.getElementById("furniture_width")
    const furniture_height = document.getElementById("furniture_height")
    const furniture_name = document.getElementById("furniture_name")
    const submitB= document.getElementById("furniture_submit")


    function hasMaxOneDecimal(value) {
        return /^(\d+|\d+\.\d{1})$/.test(value);
    }
    
    function validate(){
        const room_widthValid= parseFloat(room_width.value) >= 10 && hasMaxOneDecimal(room_width.value)
        const room_heightValid= parseFloat(room_height.value) >= 10 && hasMaxOneDecimal(room_height.value)
        submitA.disabled =! (room_widthValid && room_heightValid)
        const fur_widthValid= parseFloat(furniture_width.value) >= 10 && hasMaxOneDecimal(furniture_width.value) && parseFloat(furniture_width.value) <= parseFloat(room_width.value)
        const fur_heightValid= parseFloat(furniture_height.value) >= 10 && hasMaxOneDecimal(furniture_height.value) && parseFloat(furniture_height.value) <= parseFloat(room_height.value)
        const fur_nameValid= furniture_name.value.trim().length > 0
        let placementPossible = true;
        if (fur_widthValid && fur_heightValid && fur_nameValid) {
            placementPossible = canFurnitureFit(Math.ceil(parseFloat(furniture_width.value) / 10), Math.ceil(parseFloat(furniture_height.value) / 10));
        }

        submitB.disabled =! (fur_widthValid && fur_heightValid && fur_nameValid && placementPossible)
    }
    
    room_width.addEventListener("input",validate)
    room_height.addEventListener("input",validate)
    
    furniture_width.addEventListener("input",validate)
    furniture_height.addEventListener("input",validate)
    furniture_name.addEventListener("input", validate)
    
    validate()

});


function new_room()
 {
     fetch("http://localhost:5249/roomapi/reset",  {
         method: "Delete"
     })
     .then(resp => {
         if (resp.ok) {
             location.reload();
         } else {
             console.error("Nem sikerült resetelni az adatokat.");
         }
     });
 }