

export function giveCoords(latDir = null, latVal = 0, longDir = null, longVal = 0, y = null){
    let minX = 0
    let maxX = 0
    let minY = 100
    let maxY = 100
    let minZ = 0
    let maxZ = 0

    //this is only to simplify directions if straight in 1 direction this forces a north or west lateral
    if (latDir === null) latDir = "north"
    if (longDir === null) longDir = "west"



    if (latDir === "north"){
        minX = 0 + (latVal * 100)
        maxX = 0 + (latVal * 100) + 100
    }
    else if (latDir === "south"){
        minX = 0 - (latVal * 100)
        maxX = 0 - (latVal * 100) + 100
    }

    if (longDir === "west"){
        minZ = 0 + (longVal * 100)
        maxZ = 0 + (longVal * 100) + 100
    }
    else if (longDir === "east"){
        minZ = 0 - (longVal * 100)
        maxZ = 0 - (longVal * 100) + 100
    }

    if (y !== null) {
    if (typeof y !== "object" || y.min == null || y.max == null) {
        throw new Error(
        "giveCoords: y must be an object like { min, max }"
        );
    }

    minY = y.min
    maxY = y.max
    }


    return {x: {minX: minX, maxX: maxX}, y: {minY: minY, maxY: maxY}, z: {minZ: minZ, maxZ: maxZ}}
}

import { resourceNodes } from "../items/resourceNodes/resourceNodesIndex.js"

export function createNode(key, coords) {
    const node = {
        ...resourceNodes[key]
    }
    node.coords = coords
    return node

}

