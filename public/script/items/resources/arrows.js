

export const arrowTips = {
  bronzeArrowtip: {
    name: "Bronze Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 1,
    recipe: {
      bronzeIngot: 1
    },
    craftAmount: 15,
    craftXp: 8
  },

  ironArrowtip: {
    name: "Iron Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 5,
    recipe: {
      ironIngot: 1
    },
    craftAmount: 15,
    craftXp: 12
  },

  steelArrowtip: {
    name: "Steel Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 10,
    recipe: {
      steelIngot: 1
    },
    craftAmount: 15,
    craftXp: 18
  },

  mithrilArrowtip: {
    name: "Mithril Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 20,
    recipe: {
      mithrilIngot: 1
    },
    craftAmount: 15,
    craftXp: 25
  },

  adamantiteArrowtip: {
    name: "Adamantite Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 30,
    recipe: {
      adamantiteIngot: 1
    },
    craftAmount: 15,
    craftXp: 35
  },

  silverArrowtip: {
    name: "Silver Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 40,
    recipe: {
      silverIngot: 1
    },
    craftAmount: 15,
    craftXp: 45
  },

  goldArrowtip: {
    name: "Gold Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 50,
    recipe: {
      goldIngot: 1
    },
    craftAmount: 15,
    craftXp: 60
  },

  stariteArrowtip: {
    name: "Starite Arrowtip",
    dbl: "fletching",
    stackable: true,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 45,
    recipe: {
      stariteIngot: 1
    },
    craftAmount: 15,
    craftXp: 90
  }
};

export const arrows = {
  bronzeArrow: {
    name: "Bronze Arrow",
    description: "Basic bronze-tipped arrows",
    tier: 1,
    dbl: "equip",
    useLevel: 1,
    useSkill: "range",
    craftable: true,
    craftLevel: 1,
    craftSkill: "fletching",
    recipe: {
      bronzeArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 15,
    stats: {
      damage: 2,
      accuracy: 3
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  },

  ironArrow: {
    name: "Iron Arrow",
    description: "Sharper arrows with better penetration",
    tier: 2,
    dbl: "equip",
    useLevel: 5,
    useSkill: "range",
    craftable: true,
    craftLevel: 5,
    craftSkill: "fletching",
    recipe: {
      ironArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 25,
    stats: {
      damage: 4,
      accuracy: 5
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  },

  steelArrow: {
    name: "Steel Arrow",
    description: "Reliable arrows used by trained rangers",
    tier: 3,
    dbl: "equip",
    useLevel: 10,
    useSkill: "range",
    craftable: true,
    craftLevel: 10,
    craftSkill: "fletching",
    recipe: {
      steelArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 40,
    stats: {
      damage: 7,
      accuracy: 7
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  },

  mithrilArrow: {
    name: "Mithril Arrow",
    description: "Lightweight arrows with deadly speed",
    tier: 4,
    dbl: "equip",
    useLevel: 20,
    useSkill: "range",
    craftable: true,
    craftLevel: 20,
    craftSkill: "fletching",
    recipe: {
      mithrilArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 65,
    stats: {
      damage: 11,
      accuracy: 10
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  },

  adamantiteArrow: {
    name: "Adamantite Arrow",
    description: "Heavy arrows that punch through armor",
    tier: 5,
    dbl: "equip",
    useLevel: 30,
    useSkill: "range",
    craftable: true,
    craftLevel: 30,
    craftSkill: "fletching",
    recipe: {
      adamantiteArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 95,
    stats: {
      damage: 16,
      accuracy: 13
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  },

  stariteArrow: {
    name: "Starite Arrow",
    description: "Arrows forged from fallen stars",
    tier: 6,
    dbl: "equip",
    useLevel: 45,
    useSkill: "range",
    craftable: true,
    craftLevel: 45,
    craftSkill: "fletching",
    recipe: {
      stariteArrowtip: 10,
      feather: 10,
      headlessArrow: 10
    },
    craftAmount: 10,
    craftXp: 140,
    stats: {
      damage: 24,
      accuracy: 18
    },
    slot: "ammo",
    stackable: true,
    breakable: "none"
  }
};

