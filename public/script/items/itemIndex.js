import { wood } from "./resources/wood.js";
import { axes } from "./tools/axe.js";
import { pickaxes } from "./tools/pickaxe.js";
import { miningItems } from "./resources/ores.js";
import { smithingBars } from "./resources/bars.js";
import { shortbows, longbows, crossbows } from "./weapons/bows.js";
import { fletchingMaterials, unstrungShortbows, unstrungLongbows } from "./resources/unstrungBow.js";
import { shields } from "./armor/shields.js";
import { arrows, arrowTips } from "./resources/arrows.js";
import { swords, daggers, twoHandedSwords } from "./weapons/swords.js";

export const allItems = {
    ...wood,
    ...axes,
    ...miningItems,
    ...pickaxes,
    ...smithingBars,
    ...shortbows,
    ...longbows,
    ...crossbows,
    ...fletchingMaterials,
    ...unstrungLongbows,
    ...unstrungShortbows,
    ...shields,
    ...arrows,
    ...arrowTips,
    ...swords,
    ...daggers,
    ...twoHandedSwords,

}