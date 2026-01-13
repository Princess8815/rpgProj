import { gameState } from "../saveData/saveOrLoadData.js";
import { allItems } from "../items/itemIndex.js";
import { parseStack } from "../utilities/textFormat.js";
import { logger } from "../main.js";
import { addResetCheckSkill } from "./updateMenu.js";
import { addItem, removeAndCraft } from "./inventory.js";
import { teleport } from "../nav/generateMap.js";
import { findLocationsAt } from "../nav/coordsMap.js";
import { damage } from "../combat/damage.js";
import { lootTables } from "../combat/lootTables/lootIndex.js";


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


    //logger(`${log} skills/allStats allStats`)
    return stats
}


setInterval(() => {
    actionDisplay()
    if (!gameState?.player?.action) return;

    const action = gameState.player.action

    if (action.craft) {
        craft(action)
        actionDisplay()
        return
    }

    if (action.combat) {
        initCombat(action)
        actionDisplay()
        return
    }

    const tool = allItems[gameState.player.inventory.equipment.tool]
    if (action.tool != "none" && (tool && tool.type != action.tool)) {
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
    let gather = 1
    
    const stats = allStats();
    if (action.tool != "none") {
        gather = stats.gatherPower
    }

    
    
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
    actionDisplay()


}, 1000);

export function actionDisplay(){
    const actionEl = document.getElementById("action")
    if (!gameState.player.action) {
        actionEl.textContent = "idle"
        actionEl.style.width = "100%"
        actionEl.style.background = "#5DADE2"
        return;
    }

    const action = gameState.player.action

    if (action.craft) {
        const time = action.craft.time
        const max = action.craft.maxTime
        const percent = (time / max) * 100;
        actionEl.textContent = `${time}/${max}`
        actionEl.style.width = `${percent}%`
        actionEl.style.background = "#8E44AD"
        return;
    }
        if (action.combat) {
        const health = action.combat.enemy.stats.health
        const max = action.combat.enemy.stats.maxHealth
        const percent = (health / max) * 100;
        actionEl.textContent = `${health}/${max}`
        actionEl.style.width = `${percent}%`
        actionEl.style.background = "#f70606ff"
        return;
    }

    const health = action.health
    const maxHealth = action.maxHealth
    const percent = (health / maxHealth) * 100;
    actionEl.textContent = `${health}/${maxHealth}`
    actionEl.style.width = `${percent}%`
    actionEl.style.background = "#A97142"

}

function initCombat(action){
    gameState.player.action.combat.playerSpeed--
    gameState.player.action.combat.enemySpeed--
    logger(`my attack ${gameState.player.action.combat.playerSpeed} monsters attack ${gameState.player.action.combat.enemySpeed}`)
    let prayer = null
    let enemyPrayer = null

    if (gameState.player.prayers) {
        prayer = gameState.player.prayers
    }

    if (action.combat.enemy.prayers) {
        enemyPrayer = action.combat.enemy.prayers
    }

    const playerStats = action.combat.playerStats
    const playerSkills = action.combat.playerSkills

    const enemyStats = action.combat.enemy.stats
    const enemySkills = action.combat.enemy.skills

    if (gameState.player.action.combat.enemySpeed <= 0) {
        console.log(enemyStats)
        console.log(playerStats)
        const damageInflicted = damage(enemyStats, playerStats, enemySkills, playerSkills, enemyPrayer, prayer )
        gameState.player.action.combat.enemySpeed = gameState.player.action.combat.enemy.stats.attackSpeed
        getIncDecHp("remove", damageInflicted.damage)
        logger(`monster damage ${damageInflicted.damage} hit chance ${damageInflicted.hitChance} max ${damageInflicted.maxHit}`)
    }
        if (gameState.player.action.combat.playerSpeed <= 0) {
        const damageInflicted = damage(playerStats, enemyStats, playerSkills, enemySkills, prayer, enemyPrayer )
        gameState.player.action.combat.playerSpeed = gameState.player.action.combat.playerStats.attackSpeed
        gameState.player.action.combat.enemy.stats.health -= damageInflicted.damage
        if (gameState.player.action.combat.enemy.stats.health <= 0) {
            lootTables(action.combat.enemy.loot)
            gameState.player.action.combat.enemy.stats.health = gameState.player.action.combat.enemy.stats.maxHealth
        }
    }
}

function craft(action) {
    gameState.player.action.craft.time--

    if (gameState.player.action.craft.time <= 0){
        removeAndCraft(action.craft.key, action.craft.item)
        const skillXp = action.craft.item.craftXp
        const skillName = action.craft.item.craftSkill

        addResetCheckSkill(skillName, "add", skillXp)

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


export function getIncDecHp(mode = "get", amount = 0) {
      if (!gameState?.player) {
    setTimeout(() => getIncDecHp(), 500)
    return
    }
    const stats = allStats()

    

    if (typeof gameState.player.stats?.hp != "object") {
        gameState.player.stats.hp = {xp: 0, level: 1, nextXp: 83, diff: 83}
    }

    const playerHpLevel = addResetCheckSkill("hp")

    if (playerHpLevel < 10) {
        addResetCheckSkill("hp", "set", 1122)
    }

    let addedHealth = 0

    if (stats.healthBoost) {
        addedHealth = stats.healthBoost
    }

    const max = gameState.player.maxHealth = playerHpLevel * 10 + addedHealth
    if (gameState.player.health === null || gameState.player.health === undefined) {
        gameState.player.health = max
    }
    const health = gameState.player.health
    if (!gameState.player.respawn) {
        gameState.player.respawn = {x: 0, y: 100, z: 0}
    }

    if (health >= max) {
        gameState.player.health = max
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

setInterval(() => {
    if (!gameState.player) return
    const locArray = findLocationsAt(gameState.player.location.x, gameState.player.location.y, gameState.player.location.z,)
    for (const loc of locArray) {
        if (loc.type === "town") {
            getIncDecHp("add", 5)
            break;
        }
    }
    
}, 1000)

