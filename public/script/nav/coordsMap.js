import { towns } from "./zone1/area1.js";
import { trees, addTrees } from "./zone1/trees.js";
import { rocks, addRocks } from "./zone1/rocks.js";

addTrees();
addRocks();

export const map = {
    town: {
        ...towns
    },
    resources: {
        ...trees,
        ...rocks
    }
}



export function findLocationAt(x, y, z) {
  for (const [type, category] of Object.entries(map)) {
    for (const [id, entry] of Object.entries(category)) {
      if (!entry.coords) continue;

      const c = entry.coords;

      if (c.x === x && c.y === y && c.z === z) {
        return {
          type,   // "town", "dungeon", etc
          id,     // "emberleaf"
          ...entry
        };
      }
    }
  }
  return null;
}

