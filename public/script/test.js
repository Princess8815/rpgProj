import { auth, db } from "./firebase.js";
import { addResetCheckSkill } from "./skills/updateMenu.js";

import { savePlayerData, gameState } from "./saveData/saveOrLoadData.js";

import { allStats, getIncDecHp } from "./skills/allStats.js";
import { updateInventory, addItem, addOrRemoveAmmo } from "./skills/inventory.js";
import { openCraftMenu } from "./skills/crafting/crafterMenu.js";
import { testDamage, damage } from "./combat/damage.js";
import { normalizePlayerStats } from "./combat/normalizePlayer.js";
import { basicMonsters } from "./items/resourceNodes/monsters/basicMonster.js";
import { logger } from "./main.js";






resetInv.addEventListener("click", () => {
    gameState.player.inventory = null
    updateInventory()
    savePlayerData(gameState.player)
})

addLog.addEventListener("click", () => {
    const amountRemoved = addOrRemoveAmmo(null, null, 2, false);
    console.log(amountRemoved)
    //addResetCheckSkill("exploration", "reset")
    allStats()
})

addAxe.addEventListener("click", () => {
    // addItem("bronzeAxe");
    // addItem("ironAxe")
    addResetCheckSkill("exploration", "add", 250)
    getIncDecHp("remove", 1)
    addItem("bronzePickaxe");
    addItem("normalShortbow");
    addItem("bronzeShield");
})

button3.addEventListener("click", () => {
    openCraftMenu("smithing")
})

button4.addEventListener("click", () => {
    //testDamage()
    //addResetCheckSkill("hp", "resetAll") 
    const playerStats = normalizePlayerStats("melee")
    const monsterStats = basicMonsters.level1Rat.stat
    const monsterSkills = basicMonsters.level1Rat.skills

    const result = damage(playerStats.stats, monsterStats, playerStats.skills, monsterSkills)
    const result2 = damage(monsterStats, playerStats.stats, monsterSkills, playerStats.skills)

    logger(`mine ${result.damage}`)
    logger(`rats ${result2.damage}`)
})


