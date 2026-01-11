

export const axes = {
    bronzeAxe: {
        name: "Bronze Axe",
        description: "Used to gather wood",
        type: "axe",
        tier: 1,
        dbl: "equip",
        useLevel: 1,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 1,
        craftSkill: "smithing",
        recipe: { bronzeIngot: 2 },
        craftXp: 25,
        stats: { gatherPower: 1 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    ironAxe: {
        name: "Iron Axe",
        description: "Stronger axe for faster woodcutting",
        type: "axe",
        tier: 2,
        dbl: "equip",
        useLevel: 5,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 5,
        craftSkill: "smithing",
        recipe: { ironIngot: 2 },
        craftXp: 45,
        stats: { gatherPower: 2 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    steelAxe: {
        name: "Steel Axe",
        description: "Reliable and efficient woodcutting tool",
        type: "axe",
        tier: 3,
        dbl: "equip",
        useLevel: 10,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 10,
        craftSkill: "smithing",
        recipe: { steelIngot: 2 },
        craftXp: 75,
        stats: { gatherPower: 3 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    mithrilAxe: {
        name: "Mithril Axe",
        description: "Lightweight and dangerously sharp",
        type: "axe",
        tier: 4,
        dbl: "equip",
        useLevel: 20,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 20,
        craftSkill: "smithing",
        recipe: { mithrilIngot: 2 },
        craftXp: 120,
        stats: { gatherPower: 5 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    adamantiteAxe: {
        name: "Adamantite Axe",
        description: "Cuts through ancient trees with ease",
        type: "axe",
        tier: 5,
        dbl: "equip",
        useLevel: 30,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 30,
        craftSkill: "smithing",
        recipe: { adamantiteIngot: 2 },
        craftXp: 180,
        stats: { gatherPower: 7 },
        slot: "axe",
        stackable: false,
        breakable: "none"
    },

    stariteAxe: {
        name: "Starite Axe",
        description: "Forged from fallen stars",
        type: "axe",
        tier: 6,
        dbl: "equip",
        useLevel: 45,
        useSkill: "woodcutting",
        craftable: true,
        craftLevel: 45,
        craftSkill: "smithing",
        recipe: { stariteIngot: 2 },
        craftXp: 300,
        stats: { gatherPower: 10 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    legendsAxe: {
        name: "Legends Axe",
        description: "An axe spoken of only in myths",
        type: "axe",
        tier: 7,
        dbl: "equip",
        useLevel: 60,
        useSkill: "woodcutting",
        craftable: false,
        stats: { gatherPower: 14 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    imbuedAxe: {
        name: "Imbued Axe",
        description: "Infused with ancient magic",
        type: "axe",
        tier: 8,
        dbl: "equip",
        useLevel: 70,
        useSkill: "woodcutting",
        craftable: false,
        stats: { gatherPower: 18 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    },

    godsAxe: {
        name: "Gods Axe",
        description: "An axe wielded by divine hands",
        type: "axe",
        tier: 9,
        dbl: "equip",
        useLevel: 85,
        useSkill: "woodcutting",
        craftable: false,
        stats: { gatherPower: 25 },
        slot: "tool",
        stackable: false,
        breakable: "none"
    }
}

