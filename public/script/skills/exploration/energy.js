import { gameState } from "../../saveData/saveOrLoadData.js";
import { addResetCheckSkill } from "../updateMenu.js";

export function getOrSetEnergy(mode = "get", amount = 1) {
    const explorationLevel = addResetCheckSkill("exploration")

    if (gameState.player.energy === null){
        gameState.player.energy = explorationLevel
    }

    switch (mode) { 
        case "set":
            gameState.player.energy = explorationLevel
            break;
        case "dec":
            gameState.player.energy -= amount
            break;
        case "inv":
            gameState.player.energy += amount
            break;
    }
    const percent = (gameState.player.energy / explorationLevel) * 100;

    const energyDiv = document.getElementById("energy")
    energyDiv.textContent = `${gameState.player.energy}/${explorationLevel} energy`
    energyDiv.style.background = "yellow"
    energyDiv.style.width = `${percent}%`
    energyDiv.style.color = "black"

    

    return gameState.player.energy
}