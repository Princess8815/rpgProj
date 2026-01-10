import { gameState } from "../saveData/saveOrLoadData.js";
import { allItems } from "../items/itemIndex.js";
import { parseStack } from "../utilities/textFormat.js";
import { logger } from "../main.js";
import { addResetCheckSkill } from "./updateMenu.js";
import { addItem, removeAndCraft } from "./inventory.js";
import { teleport } from "../nav/generateMap.js";


export function allStats(){
    const stats = {}
    let log = "";

    const equip = gameState.player.inventory.equipment

    for (const equipItem in equip) {
        let item = ""
        if (equipItem === "ammo") {
            if (!equip[equipItem]) continue
            item = allItems[equip[equipItem].ammoItem]
        }
        else {
            const itemKey = parseStack(equip[equipItem]).key
            item = allItems[itemKey]
        }

        for (const [stat, amount] of Object.entries(item.stats)) {
            if (stats[stat] !== undefined) {
                stats[stat] += amount;
                continue
            }
            else {
                stats[stat] = amount
            }
            log =  `${log} ${stat} ${amount}`
        }


    }


    logger(`${log} ${stats.gatherPower} skills/allStats allStats`)
    return stats
}


setInterval(() => {
    if (!gameState?.player?.action) return;

    const action = gameState.player.action

    if (action.craft) {
        craft(action)
        return
    }

    const tool = allItems[gameState.player.inventory.equipment.tool]
    if (!tool || tool.type != action.tool) {
        logger(`you need a ${action.tool} to do that`)
        gameState.player.action = null
        return;
    }

    const level = action.level
    const skill = action.skill
    if (level > addResetCheckSkill(skill)) {
        logger(`you need a ${skill} level of ${level} to do that`)
        gameState.player.action = null
        return
    }
    
    const stats = allStats();
    const gather = stats.gatherPower //will not be null at this point all tools have gather power

    
    
    const xp = action.xp
    const item = action.item
    const maxHealth = action.maxHealth
    const chance = (percent) => Math.random() * 100 < percent;


    gameState.player.action.health -= gather
    if (gameState.player.action.health <= 0) {
        addItem(item, 1)
        gameState.player.action.health = maxHealth
        addResetCheckSkill(skill, "add", xp)
        if (chance(action.depleteChance)) {
            logger("your arm got tired so you took a break")
            gameState.player.action = null
        }
    }


}, 1000);

function craft(action) {
    gameState.player.action.craft.time--

    if (gameState.player.action.craft.time <= 0){
        removeAndCraft(action.craft.key, action.craft.item)

        if (!gameState.player.action) return; //removeAndCraft when fails deletes action intentional
        gameState.player.action.craft.time = gameState.player.action.craft.maxTime
        gameState.player.action.craft.qty--
        if (gameState.player.action.craft.qty <= 0) {
            gameState.player.action = null
        }
    }
}

//   normalTree: {
//     name: "Normal Tree",
//     type: "resource",
//     coords: {},
//     skill: "woodcutting",
//     level: 1,
//     xp: 23,
//     item: "normalLog",
//     amount: 1,
//     health: 5,
//     respawnTime: 60_000,
//     tool: "axe",
//     depleteChance: 0.2
//   },

// bronzeAxe: {
//     name: "Bronze Axe",
//     description: "Used to gather wood",
//     type: "axe",
//     tier: 1,
//     dbl: "equip",
//     useLevel: 1,
//     useSkill: "woodcutting",
//     craftable: true,
//     craftLevel: 1,
//     craftSkill: "smithing",
//     recipe: { bronzeIngot: 2 },
//     craftXp: 25,
//     stats: { gatherPower: 1 },
//     slot: "ammo",
//     stackable: true,
//     breakable: "none"
// },


export function getIncDecHp(mode = "get", amount) {
      if (!gameState?.player) {
    setTimeout(() => getIncDecHp(), 500)
    return
  }
    const playerHpLevel = addResetCheckSkill("hp")

    const max = gameState.player.maxHealth = playerHpLevel * 10
    if (gameState.player.health === null || gameState.player.health === undefined) {
        gameState.player.health = max
    }
    const health = gameState.player.health
    if (!gameState.player.respawn) {
        gameState.player.respawn = {x: 0, y: 100, z: 0}
    }

    switch (mode) {
        case "add":
            if (health + amount >= max){
                gameState.player.health = max
            }
            else {
                gameState.player.health += amount
            }
            break;
        case "remove":
            if (health - amount <= 0){
                gameState.player.health = max
                teleport(gameState.player.respawn)
                //other on death logic here
            }
            else {
                gameState.player.health -= amount
            }
    }
    const percent = (gameState.player.health / gameState.player.maxHealth) * 100;


    const hpDiv = document.getElementById("hp")
    hpDiv.textContent = `${gameState.player.health}/${gameState.player.maxHealth} health`
    hpDiv.style.background = "red"

    hpDiv.style.width = `${percent}%`

    return gameState.player.health //no need for get case switch just wont run get needs this
    
}

getIncDecHp()

