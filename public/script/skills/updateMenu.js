import { auth, db } from "../firebase.js";
import { savePlayerData, gameState } from "../saveData/saveOrLoadData.js";
import { autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { logger } from "../main.js";
import { getOrSetEnergy } from "./exploration/energy.js";

export const skillsInGame = {
  attack: { name: "Attack"},
  strength: { name: "Strength"},
  defense: { name: "Defense"},
  hp: { name: "Hitpoints"},
  magic: { name: "Magic"},
  range: { name: "Ranged"},
  woodcutting: { name: "Woodcutting"},
  mining: { name: "Mining"},
  smithing: { name: "Smithing"},
  fletching: { name: "Fletching"},
  runecrafting: { name: "Runecrafting"},
  prayer: { name: "Prayer"},
  summoning: { name: "Summoning"},
  sailing: { name: "Sailing"},
  construction: { name: "Construction"},

  // 3 unique skills (same base values, no cheating)
  exploration: { name: "Exploration"},
  survival: { name: "Survival"},
  arcana: { name: "Arcana"},
  crafting: {name: "Crafting"},
  fishing: {name: "Fishing"},
  cooking: {name: "Cooking"},

  farming: {name: "Farming"},
  hunting: {name: "Hunting"},
  engineering: {name: "Engineering"}
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
    const diff = gameState.player.stats?.[key]?.diff ?? 83
    const remainingXp = nextXp - xp

    nameSpan.title = "remaining xp " + remainingXp + "\nTotal Xp " + xp

    const percent = ((diff - remainingXp) / diff) * 100


    item.style.background = `linear-gradient(to right, green ${percent}%, white ${percent}%)`;
    item.appendChild(nameSpan);


    skillMenu.appendChild(item);
  });
}


export function updateSkillsLogic() {
    if (!gameState.player) {
        setTimeout(() => {
            updateSkillsLogic();
            return
        }, 1000)
    }
    Object.entries(skillsInGame).forEach(([key, value]) => {
        let level = gameState.player.stats?.[key]?.level ?? 1
        const xp = gameState.player.stats?.[key]?.xp ?? 0
        let nextXp = gameState.player.stats?.[key]?.nextXp ?? 83

        if (typeof gameState.player.stats[key] !== "object") {
            gameState.player.stats[key] = { xp: 0, level: 1, nextXp: 83, diff: 83 }
        }


        while (xp >= nextXp) {
            level = gameState.player.stats?.[key]?.level ?? 1
            const diff = gameState.player.stats?.[key]?.diff ?? 83
            const remainingXp = nextXp - xp //prob not needed here this is a display only thing saving to move easily
            gameState.player.stats[key].level = level + 1

            gameState.player.stats[key].diff = Math.round(diff * 1.1)
            gameState.player.stats[key].nextXp += gameState.player.stats[key].diff
            nextXp = gameState.player.stats[key].nextXp //adjusted for the while loop
            getOrSetEnergy("set") //yes this is intended any level up will reset energy
        }
    })
    autoSavePlayer();
}

export function addResetCheckSkill(skill, mode = "get", amount = 0) {
    //logger(`${skill} ${mode} ${amount}`, "pink")
    let level = gameState.player.stats?.[skill]?.level ?? 1
    if (!gameState.player.stats) {
        gameState.player.stats = {}
    }
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
            delete gameState.player.stats[skill]
            addResetCheckSkill(skill)
            updateSkillsLogic();
            UpdateSkillMenu();
            break
        case "resetAll":
            delete gameState.player.stats
            gameState.player.stats = {}
            updateSkillsLogic();
            UpdateSkillMenu();
            break;
        case "set":
            gameState.player.stats[skill].xp = amount
            updateSkillsLogic();
            UpdateSkillMenu();
            break

            
    }
    autoSavePlayer()
}
