

export const smithingBars = {
  bronzeIngot: {
    name: "Bronze Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 1,
    recipe: {
      tinOre: 1,
      copperOre: 1
    },
    craftXp: 12
  },

  ironIngot: {
    name: "Iron Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 5,
    recipe: {
      ironOre: 2
    },
    craftXp: 20
  },

  steelIngot: {
    name: "Steel Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 10,
    recipe: {
      ironIngot: 1,
      coal: 2
    },
    craftXp: 35
  },

  mithrilIngot: {
    name: "Mithril Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 20,
    recipe: {
      mithrilOre: 1,
      coal: 4
    },
    craftXp: 55
  },

  adamantiteIngot: {
    name: "Adamantite Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 30,
    recipe: {
      adamantiteOre: 1,
      coal: 10
    },
    craftXp: 80
  },

  silverIngot: {
    name: "Silver Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 40,
    recipe: {
      silverOre: 1
    },
    craftXp: 90
  },

  goldIngot: {
    name: "Gold Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 50,
    recipe: {
      goldOre: 1
    },
    craftXp: 110
  },

  stariteIngot: {
    name: "Starite Ingot",
    dbl: "none",
    stackable: false,
    craftable: true,
    craftSkill: "smithing",
    craftLevel: 45,
    recipe: {
      stariteOre: 1,
      adamantiteIngot: 1
    },
    craftXp: 150
  }
};
