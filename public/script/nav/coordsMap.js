import { createNode } from "./coordsSet.js";
import { towns } from "./zone1/area1.js";
import { trees, addTrees } from "./zone1/trees.js";
import { rocks, addRocks } from "./zone1/rocks.js";
import { fieldSets } from "./zone1/fields.js";

export function addNode(coordSets) {
  let typeVal = 0;
  let typeObj = {}



  Object.entries(coordSets).forEach(([key, value]) => {
    value.forEach(valueKey => {
      const valTag = `${key}${typeVal}`;
      typeVal++;

      const [a, b] = valueKey.split("_").map(Number);

      typeObj[valTag] = createNode(key, { x: a, y: 100, z: b });
    });
  });
  return typeObj
}
addTrees();
addRocks();

export const map = {
    town: {
        ...towns
    },
    resources: {
        ...trees,
        ...rocks,
        ...addNode(fieldSets)
    },
    npcs: {

    },
    monsters: {

    }
}



export function findLocationsAt(x, y, z) {
  const results = [];

  for (const [type, category] of Object.entries(map)) {
    for (const [id, entry] of Object.entries(category)) {
      if (!entry.coords) continue;

      const c = entry.coords;

      if (c.x === x && c.y === y && c.z === z) {
        results.push({
          type,   // "town", "resource", "dungeon", etc
          id,     // "emberleaf"
          ...entry
        });
      }
    }
  }

  return results.length ? results : null;
}


