import { createNode } from "../coordsSet.js";

export const trees = {
    //tree1: createNode("normalTree", {x: 1, y: 100, z: 1})
}


export function addTrees() {
    let treeKey = 0
    let coordSets = {
    normalTree: ["1_1","3_4", "5_6", "0_1"], //starts at spawn
    pineTree: ["20_23"], //20x and 20y pos or neg
    birchTree: ["53_52"], //50
    oakTree: ["99_95"], //90
    mapleTree: ["143_149"], // 140
    spruceTree: ["207_223"], //200
    willowTree: ["275_289"], //270
    yewTree: ["357_363"], // 350
    eucalyptusTree: ["448_440"], // 440
    ebonyTree: ["540_540"], //540
    bloodwoodTree: ["657_669"], //650
    magicTree: ["775_780"], // 770
    bloodMagicTree: ["997_900"] // 900
    };

    Object.entries(coordSets).forEach(([key, value]) => {
        value.forEach(valueKey => {
            const treeTag = `${key}${treeKey}`
            treeKey++
            const [a, b] = valueKey.split("_").map(Number);
            trees[treeTag] = createNode(key, {x: a, y: 100, z: b})
        })
    })
}