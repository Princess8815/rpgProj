import { auth, db } from "../firebase.js";

import { savePlayerData, gameState } from "../saveData/saveOrLoadData.js";
import { updateMyLivePosition, watchNearbyPlayers } from "../saveData/realtime.js";
import { getChunkKey } from "../utilities/chunk.js";
import { syncPlayer, handleNearbyPlayers } from "../login/auth.js";
import { findLocationAt, map } from "../nav/coordsMap.js";
import { autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { showCityDetails } from "../nav/generateMap.js";
import { addResetCheckSkill } from "../skills/updateMenu.js";
import { logger } from "../main.js";
import { addItem } from "../skills/inventory.js";
import { getOrSetEnergy } from "../skills/exploration/energy.js";

console.log("move ran");

export function updateCoords(){
     console.log("updateCoords ran");
    const coords = document.getElementById("coords")

    if (!gameState.player.location){
        gameState.player.location = {
            x: 0,
            y: 100,
            z: 0
    }
  }

  let loc = findLocationAt(gameState.player.location.x, gameState.player.location.y, gameState.player.location.z)
  if (!loc) {
    loc = {name: "empty"}
  }

  coords.textContent = `x: ${gameState.player.location.x} y: ${gameState.player.location.y} z: ${gameState.player.location.z} loc: ${loc.name}`
}

export function updateAreaAndCheckSurroundings(coords) {
    const current = findLocationAt(coords.x, coords.y, coords.z)
    const north = findLocationAt(coords.x + 1, coords.y, coords.z)
    const south = findLocationAt(coords.x - 1, coords.y, coords.z)
    const west = findLocationAt(coords.x, coords.y, coords.z + 1)
    const east = findLocationAt(coords.x, coords.y, coords.z - 1)

    const area = document.getElementById("areaView")
    area.innerHTML = ""

    const areaName = document.createElement("h3")
    const areaType = document.createElement("h4")
    const areaActionButton = document.createElement("button")
    if (current) {
        areaName.textContent = current.name
        area.appendChild(areaName)
        areaType.textContent = current.type
        area.appendChild(areaType)
        switch (current.type) {
            case "town":
                areaActionButton.textContent = "enter town"
                areaActionButton.addEventListener("click", () => {
                    showCityDetails(current, true)
                })
                area.appendChild(areaActionButton)
                break
            case "resource":
                areaActionButton.textContent = "gather from " + current.name
                areaActionButton.addEventListener("click", () => {
                    const currentLevel = gameState.player.stats[current.skill].level
                    if (currentLevel < current.level) {
                        logger(`you need a ${current.skill} level of ${current.level} to do that`)
                        return
                    }

                    if (!gameState.player.action) {
                        const health = current.health
                        gameState.player.action = {
                            ...current,
                            maxHealth: health
                        }
                    }
                    else {
                        gameState.player.action = null
                    }
                    console.log("gathered")
                })
                area.appendChild(areaActionButton)


        }

    }
    else {
        areaName.textContent = "nothing of interest"
        area.appendChild(areaName)
        areaType.textContent = "tame wilds"
        area.appendChild(areaType)
    }

    return {
        north: north,
        south: south,
        west: west,
        east: east
    }

}

document.querySelectorAll(".move-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir;
    move(dir);
  });
});


function move (direction) {
    const now = Date.now();
    gameState.player.action = null
    if (!gameState.player.lastMove){
        gameState.player.lastMove = now
    }
    else {
        if (now - gameState.player.lastMove < 500) {
            logger("you are moving to fast slow down")
            return;
        }
        gameState.player.lastMove = now;
    }
    if (getOrSetEnergy() <= 0) return
  updateCoords();
    if (!auth.currentUser) {
        alert("you must register or log in first")
        return
    }
  if (!gameState.isHydrated) {
    console.warn("Game not ready yet");
    return;
  }
  const explorationXpAmount = addResetCheckSkill("exploration") + 10
  getOrSetEnergy("dec", 1)
  addResetCheckSkill("exploration", "add", explorationXpAmount)

  const uid = auth.currentUser.uid;

  const oldChunk = getChunkKey(
    gameState.player.location.x,
    gameState.player.location.z
  );

  const surroundings = updateAreaAndCheckSurroundings(gameState.player.location)

  switch (direction) {
    case "north":
        gameState.player.location.x++
        break
    case "south":
        gameState.player.location.x--
        break
    case "west":
        gameState.player.location.z++
        break
    case "east":
        gameState.player.location.z--
        break
  }
  
  
  updateCoords();
  autoSavePlayer();

  updateMyLivePosition(uid)

  updateAreaAndCheckSurroundings(gameState.player.location) //ran twice once is to get surroundings to verify other to set area


  const newChunk = getChunkKey(
    gameState.player.location.x,
    gameState.player.location.z
  );

  // ONLY if chunk changed
  if (oldChunk !== newChunk) {
    watchNearbyPlayers(
      gameState.player.location.x,
      gameState.player.location.z,
      handleNearbyPlayers
    );
    savePlayerData(gameState.player);
    syncPlayer(uid);

    
    
  }
}