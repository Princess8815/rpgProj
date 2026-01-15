export const metalArmor = {
  bronzeHelmet: {
    name: "Bronze Helmet",
    description: "Simple bronze head protection",
    type: "helmet",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 2 },
    craftXp: 20,
    stats: {
      defense: 4,
      meleeAffinity: 2,
      rangeAffinity: 4,
      magicAffinity: -2,
      healthBoost: 25
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  bronzeChestplate: {
    name: "Bronze Chestplate",
    description: "Bronze chest armor with solid coverage",
    type: "chestplate",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 5 },
    craftXp: 60,
    stats: {
      defense: 10,
      meleeAffinity: 5,
      rangeAffinity: 10,
      magicAffinity: -5,
      healthBoost: 60
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  bronzeLeggings: {
    name: "Bronze Leggings",
    description: "Bronze leggings for basic defense",
    type: "legs",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 4 },
    craftXp: 50,
    stats: {
      defense: 8,
      meleeAffinity: 4,
      rangeAffinity: 8,
      magicAffinity: -4,
      healthBoost: 45
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  bronzeGloves: {
    name: "Bronze Gloves",
    description: "Bronze gloves for a steadier guard",
    type: "gloves",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 1 },
    craftXp: 15,
    stats: {
      defense: 2,
      meleeAffinity: 1,
      rangeAffinity: 2,
      magicAffinity: -1,
      healthBoost: 15
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  bronzeBoots: {
    name: "Bronze Boots",
    description: "Bronze boots for basic protection",
    type: "boots",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 1 },
    craftXp: 15,
    stats: {
      defense: 2,
      meleeAffinity: 1,
      rangeAffinity: 2,
      magicAffinity: -1,
      healthBoost: 15
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  },

  ironHelmet: {
    name: "Iron Helmet",
    description: "Reliable iron head protection",
    type: "helmet",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 2 },
    craftXp: 30,
    stats: {
      defense: 7,
      meleeAffinity: 4,
      rangeAffinity: 8,
      magicAffinity: -4,
      healthBoost: 40
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  ironChestplate: {
    name: "Iron Chestplate",
    description: "Iron chest armor with solid coverage",
    type: "chestplate",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 5 },
    craftXp: 90,
    stats: {
      defense: 16,
      meleeAffinity: 8,
      rangeAffinity: 16,
      magicAffinity: -8,
      healthBoost: 90
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  ironLeggings: {
    name: "Iron Leggings",
    description: "Iron leggings with dependable armor",
    type: "legs",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 4 },
    craftXp: 75,
    stats: {
      defense: 13,
      meleeAffinity: 6,
      rangeAffinity: 12,
      magicAffinity: -6,
      healthBoost: 70
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  ironGloves: {
    name: "Iron Gloves",
    description: "Iron gloves that steady the guard",
    type: "gloves",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 1 },
    craftXp: 25,
    stats: {
      defense: 4,
      meleeAffinity: 2,
      rangeAffinity: 3,
      magicAffinity: -2,
      healthBoost: 20
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  ironBoots: {
    name: "Iron Boots",
    description: "Iron boots for sturdy footing",
    type: "boots",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 1 },
    craftXp: 25,
    stats: {
      defense: 4,
      meleeAffinity: 2,
      rangeAffinity: 3,
      magicAffinity: -2,
      healthBoost: 20
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  },

  steelHelmet: {
    name: "Steel Helmet",
    description: "Steel helm built for brawls",
    type: "helmet",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 2 },
    craftXp: 45,
    stats: {
      defense: 10,
      meleeAffinity: 6,
      rangeAffinity: 12,
      magicAffinity: -6,
      healthBoost: 60
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  steelChestplate: {
    name: "Steel Chestplate",
    description: "Steel chest armor for frontline fights",
    type: "chestplate",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 5 },
    craftXp: 120,
    stats: {
      defense: 24,
      meleeAffinity: 12,
      rangeAffinity: 22,
      magicAffinity: -12,
      healthBoost: 120
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  steelLeggings: {
    name: "Steel Leggings",
    description: "Steel leggings with reliable coverage",
    type: "legs",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 4 },
    craftXp: 100,
    stats: {
      defense: 20,
      meleeAffinity: 10,
      rangeAffinity: 18,
      magicAffinity: -10,
      healthBoost: 95
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  steelGloves: {
    name: "Steel Gloves",
    description: "Steel gloves for seasoned guards",
    type: "gloves",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 1 },
    craftXp: 35,
    stats: {
      defense: 6,
      meleeAffinity: 3,
      rangeAffinity: 4,
      magicAffinity: -3,
      healthBoost: 28
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  steelBoots: {
    name: "Steel Boots",
    description: "Steel boots for steadier footing",
    type: "boots",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 1 },
    craftXp: 35,
    stats: {
      defense: 6,
      meleeAffinity: 3,
      rangeAffinity: 4,
      magicAffinity: -3,
      healthBoost: 28
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  },

  mithrilHelmet: {
    name: "Mithril Helmet",
    description: "Lightweight mithril headgear",
    type: "helmet",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 2 },
    craftXp: 70,
    stats: {
      defense: 15,
      meleeAffinity: 8,
      rangeAffinity: 16,
      magicAffinity: -8,
      healthBoost: 85
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  mithrilChestplate: {
    name: "Mithril Chestplate",
    description: "Mithril chest armor with strong plating",
    type: "chestplate",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 5 },
    craftXp: 170,
    stats: {
      defense: 34,
      meleeAffinity: 16,
      rangeAffinity: 30,
      magicAffinity: -16,
      healthBoost: 160
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  mithrilLeggings: {
    name: "Mithril Leggings",
    description: "Mithril leggings for agile defense",
    type: "legs",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 4 },
    craftXp: 145,
    stats: {
      defense: 28,
      meleeAffinity: 13,
      rangeAffinity: 24,
      magicAffinity: -13,
      healthBoost: 125
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  mithrilGloves: {
    name: "Mithril Gloves",
    description: "Mithril gloves with balanced coverage",
    type: "gloves",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 1 },
    craftXp: 55,
    stats: {
      defense: 8,
      meleeAffinity: 4,
      rangeAffinity: 5,
      magicAffinity: -4,
      healthBoost: 36
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  mithrilBoots: {
    name: "Mithril Boots",
    description: "Mithril boots made for long marches",
    type: "boots",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 1 },
    craftXp: 55,
    stats: {
      defense: 8,
      meleeAffinity: 4,
      rangeAffinity: 5,
      magicAffinity: -4,
      healthBoost: 36
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  },

  adamantiteHelmet: {
    name: "Adamantite Helmet",
    description: "Dense adamantite head armor",
    type: "helmet",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 2 },
    craftXp: 95,
    stats: {
      defense: 20,
      meleeAffinity: 10,
      rangeAffinity: 20,
      magicAffinity: -10,
      healthBoost: 110
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  adamantiteChestplate: {
    name: "Adamantite Chestplate",
    description: "Adamantite chest armor built to last",
    type: "chestplate",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 5 },
    craftXp: 230,
    stats: {
      defense: 46,
      meleeAffinity: 20,
      rangeAffinity: 38,
      magicAffinity: -20,
      healthBoost: 210
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  adamantiteLeggings: {
    name: "Adamantite Leggings",
    description: "Adamantite leggings for heavy defense",
    type: "legs",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 4 },
    craftXp: 195,
    stats: {
      defense: 38,
      meleeAffinity: 17,
      rangeAffinity: 30,
      magicAffinity: -17,
      healthBoost: 160
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  adamantiteGloves: {
    name: "Adamantite Gloves",
    description: "Adamantite gloves for hardened guards",
    type: "gloves",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 1 },
    craftXp: 75,
    stats: {
      defense: 10,
      meleeAffinity: 5,
      rangeAffinity: 6,
      magicAffinity: -5,
      healthBoost: 44
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  adamantiteBoots: {
    name: "Adamantite Boots",
    description: "Adamantite boots with heavy tread",
    type: "boots",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 1 },
    craftXp: 75,
    stats: {
      defense: 10,
      meleeAffinity: 5,
      rangeAffinity: 6,
      magicAffinity: -5,
      healthBoost: 44
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  },

  stariteHelmet: {
    name: "Starite Helmet",
    description: "Starite helm with celestial sheen",
    type: "helmet",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 2 },
    craftXp: 130,
    stats: {
      defense: 26,
      meleeAffinity: 12,
      rangeAffinity: 25,
      magicAffinity: -12,
      healthBoost: 140
    },
    slot: "helmet",
    stackable: false,
    breakable: "none"
  },

  stariteChestplate: {
    name: "Starite Chestplate",
    description: "Starite chest armor of rare craftsmanship",
    type: "chestplate",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 5 },
    craftXp: 300,
    stats: {
      defense: 60,
      meleeAffinity: 25,
      rangeAffinity: 45,
      magicAffinity: -25,
      healthBoost: 260
    },
    slot: "chest",
    stackable: false,
    breakable: "none"
  },

  stariteLeggings: {
    name: "Starite Leggings",
    description: "Starite leggings with high resilience",
    type: "legs",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 4 },
    craftXp: 260,
    stats: {
      defense: 50,
      meleeAffinity: 22,
      rangeAffinity: 38,
      magicAffinity: -22,
      healthBoost: 200
    },
    slot: "legs",
    stackable: false,
    breakable: "none"
  },

  stariteGloves: {
    name: "Starite Gloves",
    description: "Starite gloves for elite defenders",
    type: "gloves",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 1 },
    craftXp: 100,
    stats: {
      defense: 13,
      meleeAffinity: 6,
      rangeAffinity: 7,
      magicAffinity: -6,
      healthBoost: 55
    },
    slot: "gloves",
    stackable: false,
    breakable: "none"
  },

  stariteBoots: {
    name: "Starite Boots",
    description: "Starite boots to keep you grounded",
    type: "boots",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 1 },
    craftXp: 100,
    stats: {
      defense: 13,
      meleeAffinity: 6,
      rangeAffinity: 7,
      magicAffinity: -6,
      healthBoost: 55
    },
    slot: "boots",
    stackable: false,
    breakable: "none"
  }
};
