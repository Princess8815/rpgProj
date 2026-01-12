

export const shields = {
  bronzeShield: {
    name: "Bronze Shield",
    description: "Basic defensive shield",
    type: "shield",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "defense",
    craftable: true,
    craftLevel: 1,
    craftSkill: "smithing",
    recipe: { bronzeIngot: 3 },
    craftXp: 25,
    stats: {
      meleeAffinity: 10,
      rangeAffinity: 20,
      magicAffinity: -10,
      healthBoost: 100
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  ironShield: {
    name: "Iron Shield",
    description: "Solid and reliable protection",
    type: "shield",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "defense",
    craftable: true,
    craftLevel: 5,
    craftSkill: "smithing",
    recipe: { ironIngot: 3 },
    craftXp: 45,
    stats: {
      meleeAffinity: 20,
      rangeAffinity: 35,
      magicAffinity: -20,
      healthBoost: 200
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  steelShield: {
    name: "Steel Shield",
    description: "Well-balanced defensive gear",
    type: "shield",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "defense",
    craftable: true,
    craftLevel: 10,
    craftSkill: "smithing",
    recipe: { steelIngot: 3 },
    craftXp: 75,
    stats: {
      meleeAffinity: 30,
      rangeAffinity: 50,
      magicAffinity: -30,
      healthBoost: 300
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  mithrilShield: {
    name: "Mithril Shield",
    description: "Lightweight yet powerful",
    type: "shield",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "defense",
    craftable: true,
    craftLevel: 20,
    craftSkill: "smithing",
    recipe: { mithrilIngot: 3 },
    craftXp: 120,
    stats: {
      meleeAffinity: 40,
      rangeAffinity: 65,
      magicAffinity: -40,
      healthBoost: 450
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  adamantiteShield: {
    name: "Adamantite Shield",
    description: "Nearly unbreakable defense",
    type: "shield",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "defense",
    craftable: true,
    craftLevel: 30,
    craftSkill: "smithing",
    recipe: { adamantiteIngot: 3 },
    craftXp: 180,
    stats: {
      meleeAffinity: 55,
      rangeAffinity: 80,
      magicAffinity: -55,
      healthBoost: 600
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  stariteShield: {
    name: "Starite Shield",
    description: "Radiates celestial resilience",
    type: "shield",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "defense",
    craftable: true,
    craftLevel: 45,
    craftSkill: "smithing",
    recipe: { stariteIngot: 3 },
    craftXp: 300,
    stats: {
      meleeAffinity: 70,
      rangeAffinity: 100,
      magicAffinity: -70,
      healthBoost: 800
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  legendsShield: {
    name: "Legends Shield",
    description: "A shield carried by heroes of old",
    type: "shield",
    tier: 7,
    dbl: "equip",
    useLevel: 60,
    useSkill: "defense",
    craftable: false,
    stats: {
      meleeAffinity: 85,
      rangeAffinity: 120,
      magicAffinity: -85,
      healthBoost: 900
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  },

  godsShield: {
    name: "Gods Shield",
    description: "Forged for divine protection",
    type: "shield",
    tier: 9,
    dbl: "equip",
    useLevel: 85,
    useSkill: "defense",
    craftable: false,
    stats: {
      meleeAffinity: 100,
      rangeAffinity: 150,
      magicAffinity: -100,
      healthBoost: 1000
    },
    slot: "offhand",
    stackable: false,
    breakable: "none"
  }
};
