

import { createNode } from "../coordsSet.js";

export const rocks = {
  // populated dynamically
};

export function addRocks() {
  let rockKey = 0;

  const coordSets = {
    // starter area
    tinOre: ["2_0", "4_3", "6_5"],
    copperOre: ["3_2", "5_4", "7_6"],

    // early game
    ironOre: ["15_12", "18_14"],
    coalOre: ["22_25", "24_21"],

    // mid game
    mithrilOre: ["45_48"],
    adamantiteOre: ["72_70"],

    // high tier
    stariteOre: ["110_115"],
    goldOre: ["140_135"],

    // gems (deep zones)
    sapphire: ["175_180"],
    emerald: ["215_210"],
    ruby: ["255_260"],
    diamond: ["300_295"],

    // endgame bulk & cursed shit
    concentratedCoal: ["345_350"],
    ancientRubble: ["410_405"],
    concentratedGold: ["480_490"]
  };

  Object.entries(coordSets).forEach(([key, value]) => {
    value.forEach(valueKey => {
      const rockTag = `${key}${rockKey}`;
      rockKey++;

      const [a, b] = valueKey.split("_").map(Number);

      rocks[rockTag] = createNode(key, { x: a, y: 100, z: b });
    });
  });
}
