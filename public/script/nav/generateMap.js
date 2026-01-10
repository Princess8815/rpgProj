import { map } from "./coordsMap.js";
import { gameState, savePlayerData } from "../saveData/saveOrLoadData.js";
import { updateCoords } from "../movement/move.js";
import { changeScreen } from "./navMenu.js";

export function mapGenerater() {
    const town = document.getElementById("townList")
    const cave = document.getElementById("caveList")
    const dungeon = document.getElementById("dungeonList")
    const poi = document.getElementById("poiList")
    const saved = document.getElementById("savedLocations")

    Object.keys(map).forEach((key) => {
        Object.entries(map[key]).forEach(([mapKey, value]) => {
            if (!value.showOnMap) return;
            const loc = document.createElement("button")
            loc.textContent = `${value.name} x: ${value.coords.x} y: ${value.coords.y} z: ${value.coords.z}`
            loc.addEventListener("click", () => {
                showCityDetails(value)
                
            });
            loc.classList.add("mapButton")
            switch (key) {
                case "town": town.appendChild(loc); break
                case "cave": cave.appendChild(loc); break;
                case "dungeon": dungeon.appendChild(loc); break;
                case "poi": poi.appendChild(loc); break;
                case "saved": saved.appendChild(loc); break;

            }
        })
    })
}

export function teleport(coords) {
    gameState.player.action = null
    gameState.player.location = { ...coords };
    updateCoords();
    changeScreen("home");

    savePlayerData(gameState.player)
}

export function showCityDetails(city, fullDetails = false) {
    document.getElementById("content").style.display = "none";
    document.getElementById("map").style.display = "none";
    document.getElementById("cityDetails").style.display = "block";
    const header = document.getElementById("city-header")
    const info = document.getElementById("city-info")
    const full = document.getElementById("full-actions")
    const basic = document.getElementById("basic-actions")
    const back = document.getElementById("back")

    header.textContent = "";
    info.textContent = "";
    basic.innerHTML = "";
    full.innerHTML = "";


    header.textContent = city.name

    let structure = "";

    if (city.structures){
        structure = city.structures.join(" ");
    }

    if (fullDetails) {
        if (city.structures) {
            city.structures.forEach(key => {
                const btn = document.createElement("button")
                btn.textContent = key

                btn.addEventListener("click", () => {
                    document.getElementById("cityDetails").style.display = "block";
                    changeScreen("home");
                    //logic later
            })
            full.appendChild(btn)
        })
        }

    }
    else {
    const details = 
    `
    coords: x: ${city.coords.x} y: ${city.coords.y} z: ${city.coords.z}
    structure: ${structure}
    `
    info.textContent = details

    const basicBtn = document.createElement("button")
    basicBtn.textContent = "Teleport"
    basicBtn.addEventListener("click", () => {
        if (true) { //logic to replace if later
            teleport(city.coords)
        }
    })
    basic.appendChild(basicBtn)
    }

    const backButton = document.createElement("button")

    backButton.textContent = "back"
    backButton.addEventListener("click", () => {
        changeScreen("home")
    })

    back.appendChild(backButton)
    

}