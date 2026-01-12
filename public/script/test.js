import { auth, db } from "./firebase.js";
import { addResetCheckSkill } from "./skills/updateMenu.js";

import { savePlayerData, gameState } from "./saveData/saveOrLoadData.js";

import { allStats, getIncDecHp } from "./skills/allStats.js";
import { updateInventory, addItem, addOrRemoveAmmo } from "./skills/inventory.js";
import { openCraftMenu } from "./skills/crafting/crafterMenu.js";
import { testDamage } from "./combat/damage.js";






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
})

button3.addEventListener("click", () => {
    openCraftMenu("smithing")
})

button4.addEventListener("click", () => {
    testDamage()
})


