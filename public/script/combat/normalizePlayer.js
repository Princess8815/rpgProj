import { gameState } from "../saveData/saveOrLoadData.js";
import { addResetCheckSkill } from "../skills/updateMenu.js";
import { allStats } from "../skills/allStats.js";

export function normalizePlayerStats(type = "melee") {
    const stats = {
        type: type,
        accuracy: 10,

        strengthBonus: 0,
        defense: 10,

        meleeAffinity: 0,
        rangeAffinity: 0,
        magicAffinity: 0,

        attackSpeed: 5,

        accuracyMultiplier: 1,
        damageMultiplier: 1,
        defenseMultiplier: 1,
    }

    const skills = {
        attack: addResetCheckSkill("attack"),
        strength: addResetCheckSkill("strength"),
        defense: addResetCheckSkill("defense"),
        ranged: addResetCheckSkill("ranged"),
        magic: addResetCheckSkill("magic"),
    }

    const fullStats = {
        ...stats,
        ...allStats()
        
    }
    console.log(stats)
    console.log(skills)
    return {
        stats: fullStats,
        skills: skills
    }
}