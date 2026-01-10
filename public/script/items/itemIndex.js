import { wood } from "./resources/wood.js";
import { axes } from "./tools/axe.js";
import { pickaxes } from "./tools/pickaxe.js";
import { miningItems } from "./resources/ores.js";
import { smithingBars } from "./resources/bars.js";

export const allItems = {
    ...wood,
    ...axes,
    ...miningItems,
    ...pickaxes,
    ...smithingBars

}