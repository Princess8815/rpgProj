import { treeTypes } from "./trees/trees.js"
import { oreTypes } from "./ores/ores.js"
import { fields } from "./misc/fields.js"

export const resourceNodes = {
    ...treeTypes,
    ...oreTypes,
    ...fields
}