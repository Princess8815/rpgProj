import { auth, db } from "../firebase.js";
import { savePlayerData, gameState } from "../saveData/saveOrLoadData.js";
import { autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { logger } from "../main.js";

export const skillsInGame = {
  attack: { name: "Attack", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  strength: { name: "Strength", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  defense: { name: "Defense", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  hp: { name: "Hitpoints", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  magic: { name: "Magic", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  range: { name: "Ranged", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  woodcutting: { name: "Woodcutting", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  mining: { name: "Mining", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  smithing: { name: "Smithing", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  fletching: { name: "Fletching", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  runecrafting: { name: "Runecrafting", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  prayer: { name: "Prayer", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  summoning: { name: "Summoning", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  sailing: { name: "Sailing", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  construction: { name: "Construction", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },

  // 3 unique skills (same base values, no cheating)
  exploration: { name: "Exploration", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  survival: { name: "Survival", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 },
  arcana: { name: "Arcana", xp: 0, remainingXp: 83, nextLvl: 83, nextDif: 83 }
}; //it is possible i dont need the xp stuff stored here

export function UpdateSkillMenu() {
  const skillMenu = document.getElementById("skills");
  if (!skillMenu) return;

  skillMenu.innerHTML = "";

  Object.entries(skillsInGame).forEach(([key, value]) => {
    const item = document.createElement("div");

    // force it to behave like a grid item no matter what
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.padding = ".5rem .75rem";
    item.style.border = "1px solid rgba(255,255,255,.2)";
    item.style.borderRadius = "6px";
    item.style.boxSizing = "border-box";

    const nameSpan = document.createElement("div");
    nameSpan.textContent = value.name + " " + String(gameState.player.stats?.[key]?.level ?? 1);
    const xp = gameState.player.stats?.[key]?.xp ?? 0
    const nextXp = gameState.player.stats?.[key]?.nextXp ?? 83

    nameSpan.title = "remaining xp " + (nextXp - xp) + "\nTotal Xp " + xp

    item.appendChild(nameSpan);


    skillMenu.appendChild(item);
  });
}


export function updateSkillsLogic() {
    Object.entries(skillsInGame).forEach(([key, value]) => {
        let level = gameState.player.stats?.[key]?.level ?? 1
        const xp = gameState.player.stats?.[key]?.xp ?? 0
        let nextXp = gameState.player.stats?.[key]?.nextXp ?? 83

        while (xp >= nextXp) {
            level = gameState.player.stats?.[key]?.level ?? 1
            const diff = gameState.player.stats?.[key]?.diff ?? 83
            const remainingXp = nextXp - xp //prob not needed here this is a display only thing saving to move easily
            gameState.player.stats[key].level = level + 1

            gameState.player.stats[key].diff = Math.round(diff * 1.1)
            gameState.player.stats[key].nextXp += gameState.player.stats[key].diff
            nextXp = gameState.player.stats[key].nextXp //adjusted for the while loop
        }
    })
    autoSavePlayer();
}

export function addResetCheckSkill(skill, mode = "get", amount = 0) {
    //logger(`${skill} ${mode} ${amount}`, "pink")
    let level = gameState.player.stats?.[skill]?.level ?? 1
    if (!gameState.player.stats[skill]) {
        gameState.player.stats[skill] = { xp: 0, level: 1, nextXp: 83, diff: 83 }
    }

    switch (mode) {
        case "get":
            return level
        case "add":
            gameState.player.stats[skill].xp += amount
            updateSkillsLogic();
            UpdateSkillMenu();
            level = gameState.player.stats[skill].level
            return level
        case "reset": //troubleshooting or rare occurrences but def needed
            gameState.player.stats[skill].xp = 0
            gameState.player.stats[skill].level = 1
            gameState.player.stats[skill].diff = 83
            gameState.player.stats[skill].nextXp = 83
            updateSkillsLogic();
            UpdateSkillMenu();
            break
            
    }
    autoSavePlayer()
}
