import { ratDrop } from "./basicDrops/rat.js"
import { addItem } from "../../skills/inventory.js"

// export const ratDrop = {
//     ratDrop: {
//         pulls: 3, 
//         normalLog: {weight: 5, qty: 1, fill: 1},
//         oakLog: {weight: 5, qty: 1, fill: 2}
//     }
// }

const indexTable = {
    ...ratDrop,
}

export function lootTables(table) {
    const lootObj = indexTable[table]
    const lootItems = {}
    if (!lootObj) {
        console.log(table)
        return
    }

    let remainingPulls = lootObj.pulls
    let totalWeight = 0


    Object.entries(lootObj).forEach(([key, value]) => {
        if (key === "pulls") return

        const min = totalWeight + 1
        const max = totalWeight + value.weight

        lootItems[key] = {
            min,
            max,
            fill: value.fill,
            qty: value.qty
        }

        totalWeight = max
    })

    while (remainingPulls > 0) {
        const roll = Math.floor(Math.random() * totalWeight) + 1;

        for (const [itemKey, itemVal] of Object.entries(lootItems)) {
            if (roll < itemVal.min || roll > itemVal.max) continue
            if (itemVal.fill > remainingPulls) break //im not sure best way to readjust the obj

            if (itemKey === "nothing") {
                remainingPulls = remainingPulls - itemVal.fill
                continue
            }

            addItem(itemKey, itemVal.qty)
            remainingPulls = remainingPulls - itemVal.fill
        }
    }

}

// const example = {
//     nothing: {min: 1, max: 1, fill: 1},
//     normalLog: {min: 2, max: 6, fill: 1, qty: 1},
//     oakLog: {min: 7, max: 11, fill: 2, qty: 1}
// }