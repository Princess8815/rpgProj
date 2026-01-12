import { treeTypes } from "./trees/trees.js"
import { oreTypes } from "./ores/ores.js"
import { fields } from "./misc/fields.js"
import { basicMonsters } from "./monsters/basicMonster.js"

export const resourceNodes = {
    ...treeTypes,
    ...oreTypes,
    ...fields,
    ...basicMonsters,
}