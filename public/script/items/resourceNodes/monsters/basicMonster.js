

export const basicMonsters = {
    level1Rat: {
        name: "Level 1 Rat",
        type: "monster",
        coords: {},
        combatLevel: 1,
        aggressive: true,
        loot: "ratDrop",
        stat: {
              type: "melee",

                accuracy: 3,
                strengthBonus: 0,
                defense: 1,

                meleeAffinity: 0,
                rangeAffinity: 1,
                magicAffinity: -1,

                attackSpeed: 3,
                healthBoost: 6,

                accuracyMultiplier: 1,
                damageMultiplier: 1,
                defenseMultiplier: 1,
        },
        skills: {
            attack: 1,
            strength: 1,
            defense: 1,
            ranged: 1,
            magic: 1,
        }
    },
}