import { gameState } from "../saveData/saveOrLoadData.js";
import { getOrSetEnergy } from "./exploration/energy.js";
import { addResetCheckSkill } from "./updateMenu.js";
import { logger } from "../main.js";

function getExplorationTimer() {
    //logger(`energy ${gameState.player.energy}`)
    const explorationLevel = addResetCheckSkill("exploration")
    return Math.max((180 - explorationLevel) * 1000, 1000) //5 will be 120 but testing purposes
}

function startExplorationRegen() {
  if (!gameState?.player) {
    setTimeout(startExplorationRegen, 100); //this also sets ui need to be 100 not 1000
    return;
  }
  getOrSetEnergy();

  const delay = getExplorationTimer();

  setTimeout(() => {
    getOrSetEnergy("set");
    startExplorationRegen();
  }, delay);
}


startExplorationRegen();
