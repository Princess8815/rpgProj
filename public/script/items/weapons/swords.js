

export const swords = {
  bronzeSword: {
    name: "Bronze Sword",
    description: "A dull but usable blade",
    type: "sword",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "attack",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 2 },
    craftXp: 25,
    stats: {
      accuracy: 2,
      strengthBonus: 2,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  ironSword: {
    name: "Iron Sword",
    description: "Better balance and edge",
    type: "sword",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "attack",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 2 },
    craftXp: 45,
    stats: {
      accuracy: 4,
      strengthBonus: 4,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  steelSword: {
    name: "Steel Sword",
    description: "Reliable and battle-ready",
    type: "sword",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "attack",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 2 },
    craftXp: 75,
    stats: {
      accuracy: 6,
      strengthBonus: 7,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  mithrilSword: {
    name: "Mithril Sword",
    description: "Lightweight and vicious",
    type: "sword",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "attack",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 2 },
    craftXp: 120,
    stats: {
      accuracy: 10,
      strengthBonus: 11,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  adamantiteSword: {
    name: "Adamantite Sword",
    description: "Heavy hits, steady rhythm",
    type: "sword",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "attack",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 2 },
    craftXp: 180,
    stats: {
      accuracy: 15,
      strengthBonus: 18,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  stariteSword: {
    name: "Starite Sword",
    description: "Star-forged and terrifying",
    type: "sword",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "attack",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 2 },
    craftXp: 300,
    stats: {
      accuracy: 22,
      strengthBonus: 26,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  legendsSword: {
    name: "Legends Sword",
    description: "A blade whispered about",
    type: "sword",
    tier: 7,
    dbl: "equip",
    useLevel: 60,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 32,
      strengthBonus: 38,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  imbuedSword: {
    name: "Imbued Sword",
    description: "Arcane power sealed in steel",
    type: "sword",
    tier: 8,
    dbl: "equip",
    useLevel: 70,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 45,
      strengthBonus: 55,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  godsSword: {
    name: "Gods Sword",
    description: "Divine judgment in metal form",
    type: "sword",
    tier: 9,
    dbl: "equip",
    useLevel: 85,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 70,
      strengthBonus: 90,
      attackSpeed: 3
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  }
};

export const daggers = {
  bronzeDagger: {
    name: "Bronze Dagger",
    description: "A small, quick blade",
    type: "dagger",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "attack",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 1 },
    craftXp: 15,
    stats: {
      accuracy: 4,
      strengthBonus: 1,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  ironDagger: {
    name: "Iron Dagger",
    description: "Quick and reliable",
    type: "dagger",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "attack",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 1 },
    craftXp: 30,
    stats: {
      accuracy: 7,
      strengthBonus: 2,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  steelDagger: {
    name: "Steel Dagger",
    description: "Sharp and precise",
    type: "dagger",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "attack",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 1 },
    craftXp: 55,
    stats: {
      accuracy: 11,
      strengthBonus: 3,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  mithrilDagger: {
    name: "Mithril Dagger",
    description: "Light as air, deadly as sin",
    type: "dagger",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "attack",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 1 },
    craftXp: 85,
    stats: {
      accuracy: 18,
      strengthBonus: 5,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  adamantiteDagger: {
    name: "Adamantite Dagger",
    description: "Strikes before enemies react",
    type: "dagger",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "attack",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 1 },
    craftXp: 130,
    stats: {
      accuracy: 26,
      strengthBonus: 8,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  stariteDagger: {
    name: "Starite Dagger",
    description: "Forged from fallen stars",
    type: "dagger",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "attack",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 1 },
    craftXp: 220,
    stats: {
      accuracy: 38,
      strengthBonus: 12,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  legendsDagger: {
    name: "Legends Dagger",
    description: "Too fast to be seen",
    type: "dagger",
    tier: 7,
    dbl: "equip",
    useLevel: 60,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 55,
      strengthBonus: 18,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  imbuedDagger: {
    name: "Imbued Dagger",
    description: "Magic-infused precision",
    type: "dagger",
    tier: 8,
    dbl: "equip",
    useLevel: 70,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 75,
      strengthBonus: 26,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  },

  godsDagger: {
    name: "Gods Dagger",
    description: "A divine blink-and-you’re-dead weapon",
    type: "dagger",
    tier: 9,
    dbl: "equip",
    useLevel: 85,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 110,
      strengthBonus: 40,
      attackSpeed: 1
    },
    slot: "mainhand",
    stackable: false,
    breakable: "none"
  }
};
export const twoHandedSwords = {
  bronzeGreatsword: {
    name: "Bronze Greatsword",
    description: "A heavy, unwieldy slab of bronze",
    type: "sword",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "attack",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 4 },
    craftXp: 40,
    stats: {
      accuracy: 2,
      strengthBonus: 6,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  ironGreatsword: {
    name: "Iron Greatsword",
    description: "Slow, brutal, effective",
    type: "sword",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "attack",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 4 },
    craftXp: 70,
    stats: {
      accuracy: 4,
      strengthBonus: 10,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  steelGreatsword: {
    name: "Steel Greatsword",
    description: "Crushes armor and bones alike",
    type: "sword",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "attack",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 4 },
    craftXp: 110,
    stats: {
      accuracy: 7,
      strengthBonus: 16,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  mithrilGreatsword: {
    name: "Mithril Greatsword",
    description: "Lighter, faster, still devastating",
    type: "sword",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "attack",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 4 },
    craftXp: 170,
    stats: {
      accuracy: 12,
      strengthBonus: 24,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  adamantiteGreatsword: {
    name: "Adamantite Greatsword",
    description: "Each swing ends arguments",
    type: "sword",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "attack",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 4 },
    craftXp: 240,
    stats: {
      accuracy: 18,
      strengthBonus: 34,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  stariteGreatsword: {
    name: "Starite Greatsword",
    description: "Forged from fallen stars and bad intentions",
    type: "sword",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "attack",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 4 },
    craftXp: 350,
    stats: {
      accuracy: 26,
      strengthBonus: 50,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  legendsGreatsword: {
    name: "Legends Greatsword",
    description: "One swing, one legend erased",
    type: "sword",
    tier: 7,
    dbl: "equip",
    useLevel: 60,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 38,
      strengthBonus: 70,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  imbuedGreatsword: {
    name: "Imbued Greatsword",
    description: "Magic reinforces every devastating strike",
    type: "sword",
    tier: 8,
    dbl: "equip",
    useLevel: 70,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 55,
      strengthBonus: 95,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  },

  godsGreatsword: {
    name: "Gods Greatsword",
    description: "The earth cracks when it lands",
    type: "sword",
    tier: 9,
    dbl: "equip",
    useLevel: 85,
    useSkill: "attack",
    craftable: false,
    stats: {
      accuracy: 85,
      strengthBonus: 140,
      attackSpeed: 5
    },
    slot: "mainhand",
    twoHanded: true,
    stackable: false,
    breakable: "none"
  }
};
