import { gameState, autoSavePlayer, savePlayerData } from "../saveData/saveOrLoadData.js";
import { allItems } from "../items/itemIndex.js";
import { capitalizeAfterSpaces, parseStack } from "../utilities/textFormat.js";
import { getItemKey } from "../utilities/getKey.js";
import { addResetCheckSkill } from "./updateMenu.js";
import { logger } from "../main.js";


export function updateInventory() {
    console.log("update inv ran")
    document.querySelectorAll(".selected")
        .forEach(el => el.classList.remove("selected"));
        gameState.player.selected = null
    const slots = 28


    if (!gameState.player.inventory || typeof gameState.player.inventory !== "object" || Object.keys(gameState.player.inventory).length === 0) {
        gameState.player.inventory = {
            equipment: gameState.player.inventory?.equipment ?? {},
        };
        for (let i = 0; i < slots; i++) {
            gameState.player.inventory[`slot${i}`] = "empty"
        }
    }

    const inventoryElement = document.getElementById("inventoryGrid")
    inventoryElement.innerHTML = "";

    for (let i = 0; i < slots; i++) {
        const invItem = document.createElement("div")
        invItem.classList.add("inv-slot")

        if (gameState.player.inventory[`slot${i}`] === "empty") {
            invItem.textContent = "";
            invItem.addEventListener("click", () => {
                if (gameState.player.selected) {
                    swap(gameState.player.selected.item, "empty") //its my only way to sort inventory prob no longer needed
                }
            })
            inventoryElement.appendChild(invItem);
            continue;
        }

        const key = gameState.player.inventory[`slot${i}`]

        const fullItem = parseStack(key)
        const realKey = fullItem.key
        const quantity = fullItem.qty
        


        const actualItem = allItems[realKey]

        if (!actualItem) {
            invItem.textContent = "???";

            invItem.addEventListener("click", () => {
                console.log(`${realKey} ${quantity}`)

                        // 🔥 remove the bad data
                gameState.player.inventory[`slot${i}`] = "empty";

                // optional but recommended
                autoSavePlayer();
                updateInventory();

            })

            inventoryElement.appendChild(invItem);
            continue;
        }


        const combineAction = actualItem?.combine
        const combineParam = combineAction?.param

        const selectedCombine = gameState.player?.selected?.item?.combine

        let realQuantity = quantity
        if (!actualItem.stackable) {
            realQuantity = ""
        }
        invItem.textContent = `${actualItem.name} ${realQuantity}`
        invItem.title = actualItem.description
        invItem.addEventListener("click", () => {
            if (actualItem.dbl && actualItem.dbl != "none") {
                runDouble(actualItem.dbl, actualItem, quantity) 
                return 
            }
            if (!gameState.player.selected) {
                invItem.classList.add("selected");
                gameState.player.selected = {
                    slot: `slot${i}`,
                    item: actualItem
                }
            }
            else if (gameState.player.selected.slot === `slot${i}`) {
                document.querySelectorAll(".selected")
                    .forEach(el => el.classList.remove("selected"));

                gameState.player.selected = null
            }
            else {
                if (!combineAction || !selectedCombine || !selectedCombine.item.includes(key)) {
                document.querySelectorAll(".selected")
                    .forEach(el => el.classList.remove("selected"));
                    gameState.player.selected = null
                    logger("nothing interesting happened")
                }
                else {
                document.querySelectorAll(".selected")
                    .forEach(el => el.classList.remove("selected"));
                    gameState.player.selected = null
                    combine(combineParam)
                }
                    
            }
            
        })

        invItem.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // kill the default browser menu
            openItemMenu(e, invItem, actualItem, quantity);
        });

        inventoryElement.appendChild(invItem);

    }


}

function combine(param) {
    //comming soon to a hellscript near you
}

function runDouble(param, item, quantity) {
    console.log(`examined ${item.name} ${param}`)
    switch (param) {
        case "equip":
            equip(item, quantity)
    }
}

function openItemMenu(e, itemEl, item, quantity) {
    console.log("open item ran")
    document.querySelectorAll(".selected")
        .forEach(el => el.classList.remove("selected"));
    gameState.player.selected = null //just added assurance
    const menu = document.getElementById("contextMenu");
    menu.innerHTML = "";
    

    if (item.dbl) {
        const menuItem = document.createElement("div")

        const textContent = capitalizeAfterSpaces(item.dbl)

        menuItem.textContent = textContent
        menuItem.classList.add("menu-item")
        menuItem.addEventListener("click", () => {
            runDouble(item.dbl ,item, quantity)
        })
        menu.appendChild(menuItem)
    }

    const menuItem = document.createElement("div")
    menuItem.textContent = "drop"

    menuItem.classList.add("menu-item")
    menuItem.addEventListener("click", () => {
            removeItem(item)
        })
        menu.appendChild(menuItem)

    const menuItem2 = document.createElement("div")
    menuItem2.textContent = "examine"

    menuItem2.classList.add("menu-item")
    menuItem2.addEventListener("click", () => {
            examine(item)
        })
        menu.appendChild(menuItem2)

    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    menu.classList.remove("hidden");
}

window.addEventListener("click", () => {
    const menu = document.getElementById("contextMenu");
    if (menu) menu.classList.add("hidden");

});

const equipMap = {
  helmet:    { c: 2, r: 1 },

  necklace: { c: 2, r: 2 },

  mainhand: { c: 1, r: 3 },
  chest:    { c: 2, r: 3 },
  offhand:  { c: 3, r: 3 },

  gloves:   { c: 1, r: 5 },
  legs:     { c: 2, r: 4 },
  ring:     { c: 3, r: 5 },

  boots:    { c: 2, r: 5 },

  tool:     { c: 1, r: 1 },
  ammo:     { c: 3, r: 1 },
};


export function equip(item = null, quantity = 1) {
    //trust item.slot always matches equipslot useSkill always skill useLevel always level all are always on equipables equip only ran from its item
    let equip = gameState.player.inventory.equipment
    const equipDoc = document.getElementById("equipmentGrid")
    equipDoc.innerHTML = ""
    const ammoDoc = document.createElement("div")
    ammoDoc.id = "ammo"
    ammoDoc.classList.add("equip-slot")
    const ammoLocationKey = equipMap.ammo

    ammoDoc.style.gridColumn = ammoLocationKey.c
    ammoDoc.style.gridRow = ammoLocationKey.r
    equipDoc.appendChild(ammoDoc)
    const equipSlots = ["helmet", "chest", "legs", "boots", "gloves", "necklace", "ring", "mainhand", "offhand", "tool"]
    if (item) {
        if (!equip || typeof equip != "object" ||  Object.keys(equip).length === 0) {
            equip = gameState.player.inventory.equipment = {};
        }

        const itemSlotType = item.slot
        if (itemSlotType === "ammo"){
            addOrRemoveAmmo(equipDoc, item, quantity, true)
        }
        else {
            const equipKey = getItemKey(item)
            addResetCheckSkill(item.useSkill)

            const currentReqSkill = gameState.player.stats[item.useSkill].level


            if (currentReqSkill >= item.useLevel) { //
                //todo handle stackable ammo
                if (!equip[itemSlotType]) {
                    removeItem(item)
                    equip[itemSlotType] = equipKey
                }
                else {
                const equippedKey = equip[itemSlotType]
                    removeItem(item);
                    equip[itemSlotType] = equipKey
                    addItem(equippedKey)
                    
                }
            }
            else {
                logger(`you need a ${item.useSkill} of ${item.useLevel} to equip that item`)
            }
        }
    }

    for (const [slot, pos] of Object.entries(equipMap)) {
    const el = document.createElement("div");
    el.classList.add("equip-slot");

    el.style.gridColumn = pos.c;
    el.style.gridRow = pos.r;

    if (equip[slot]) {
        el.textContent = allItems[equip[slot]].name;
        el.addEventListener("click", () => unEquip(slot));
    } else {
        el.textContent = slot;
    }

    equipDoc.appendChild(el);
    }
    addOrRemoveAmmo(equipDoc);
    autoSavePlayer()
}

function unEquip(slot) {
    const equipItem = gameState.player.inventory.equipment;
    const item = equipItem[slot];
    if (!item) return false;

    if (addItem(item)) {
        delete equipItem[slot];
    
        updateInventory();
        equip()
        return true;
    }

    console.log("inventory is to full to equip that")
    autoSavePlayer()
    return false
}

function examine(item) {
    logger(`examined ${item.name}`)
}

function swap(item1, item2){
    
}

export function addItem(itemKey, amount = 1) { 
    const inv = gameState.player.inventory;
    let empty = false //used for stackables

    if (!allItems[itemKey]?.stackable) {
        for (let i = 0; i < 28; i++) {
            const slotKey = `slot${i}`;
            if (inv[slotKey] === "empty") {
                inv[slotKey] = itemKey;
                updateInventory();
                autoSavePlayer();
                return true;
            }
        }
    }
    else {
        // 1️⃣ Try to add to existing stack
        for (let i = 0; i < 28; i++) {
            const slotKey = `slot${i}`;
            if (inv[slotKey] === "empty") continue;

            const { key, qty } = parseStack(inv[slotKey]);

            if (key === itemKey) {
                inv[slotKey] = `${key} ${qty + amount}`;
                updateInventory();
                autoSavePlayer();
                return true;
            }
        }

        // 2️⃣ Otherwise put in empty slot
        for (let i = 0; i < 28; i++) {
            const slotKey = `slot${i}`;
            if (inv[slotKey] === "empty") {
                inv[slotKey] = `${itemKey} ${amount}`;
                updateInventory();
                autoSavePlayer();
                return true;
            }
        }
    }


    return false;
}

function removeItem(itemOrKey) {
    console.log("remove ran");
    const inv = gameState.player.inventory;

    // Accept either an item object OR a string key
    const itemKey =
        typeof itemOrKey === "string"
            ? itemOrKey
            : Object.keys(allItems).find(key => allItems[key] === itemOrKey);

    if (!itemKey) return false;

    for (let i = 0; i < 28; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue;

        const { key, qty } = parseStack(inv[slotKey]);

        if (key === itemKey) {
            inv[slotKey] = "empty";

            updateInventory();
            autoSavePlayer();
            reorderInventory();
            return true;
        }
    }

    return false;
}

export function removeAndCraft(key, item) {
    const inv = gameState.player.inventory;
    let recipe = {...item.recipe}
    let craftable = false

    for (let i = 0; i < 28; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue;

        const { key: invKey, qty: invQty } = parseStack(inv[slotKey]);



        if (!recipe[invKey]) continue

        if (recipe[invKey] <= invQty) {
            delete recipe[invKey]
            if (Object.keys(recipe).length === 0) {
                craftable = true
                break;
            }
            continue
        }
        recipe[invKey] -= invQty
        if (recipe[invKey] <= 0) {
            delete recipe[invKey]
                if (Object.keys(recipe).length === 0) {
                    craftable = true
                break;
            }
        }
    }

    if (!craftable) {
        logger("you dont have enough resources to do that")
        gameState.player.action = null //even if ran another way theres no multitask 
        return false //not sure i need false but just in case
    }

    removeIngredients(item.recipe)
    let craftAmount = 1
    if (item.craftAmount) {
        craftAmount = item.craftAmount
    }

    addItem(key, craftAmount)

}

export function removeIngredients(recipe) {
  const inv = gameState.player.inventory;

  // iterate each required ingredient
  for (const [ingredientKey, requiredQty] of Object.entries(recipe)) {
    let remaining = requiredQty;

    for (let i = 0; i < 28 && remaining > 0; i++) {
      const slotKey = `slot${i}`;
      const slot = inv[slotKey];
      if (slot === "empty") continue;

      const { key: slotItemKey, qty: slotQty } = parseStack(slot);
      if (slotItemKey !== ingredientKey) continue;

      // slot fully consumed
      if (slotQty <= remaining) {
        inv[slotKey] = "empty";
        remaining -= slotQty;
      }
      // slot partially consumed
      else {
        inv[slotKey] = `${slotItemKey} ${slotQty - remaining}`;
        remaining = 0;
      }
    }
  }
}



function reorderInventory() {
    const currentItem = []
    let inv = gameState.player.inventory

    for (let i = 0; i < 28; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue

        currentItem.push(inv[slotKey])
        inv[slotKey] = "empty"
    }
    currentItem.forEach(key => {
        addItem(key)
    })

    updateInventory()
    autoSavePlayer()

}

export function addOrRemoveAmmo(doc, item = null, quantity = 1, add = true) {
    let remove = quantity //only used in remove
    const equip = gameState.player.inventory.equipment

    const ammoEl = document.getElementById("ammo")
        
        
        if (add && item) {
            const key = getItemKey(item)
            if (!equip.ammo) {
                gameState.player.inventory.equipment.ammo = {
                    name: allItems[key].name,
                    ammoItem: key,
                    quantity: quantity
                }
                removeItem(item)

            }
            else if (equip.ammo.ammoItem === key) {
                gameState.player.inventory.equipment.ammo.quantity += quantity
                removeItem(item)
            }

            else {
                addItem(equip.ammo.ammoItem, equip.ammo.quantity)
                gameState.player.inventory.equipment.ammo = {
                    name: allItems[key].name,
                    ammoItem: key,
                    quantity: quantity
                }
                removeItem(item)
            }

        }
        else if (!add) { //i did an else if incase i need to add a third mode i can replace mode to string and change easier
            //ammo remove works dif since its combat only that reduces ammo 
            //no verification needed remove 10 when 6 will remove the 6 thats by design
            //does not need to know what ammo type thats handled in the stats handler
            if (gameState.player.inventory.equipment.ammo) {
                gameState.player.inventory.equipment.ammo.quantity -= quantity
                if (gameState.player.inventory.equipment.ammo.quantity <= 0) {
                    let totalRemove = Math.abs(gameState.player.inventory.equipment.ammo.quantity)
                    remove -= totalRemove
                    equip.ammo = null;
                    ammoEl.textContent = "ammo";
                }
            }
            else {
                remove = 0
            }
        }
    
    let textCont = "ammo"
    if (equip.ammo) {
        textCont = `${equip.ammo.name} ${equip.ammo.quantity}`
    }
    ammoEl.textContent = textCont

    ammoEl.onclick = () => {
    if (!equip.ammo) return;
    if (addItem(equip.ammo.ammoItem, equip.ammo.quantity)) {
        equip.ammo = null;
        ammoEl.textContent = "ammo";
    }
    };
    autoSavePlayer();
    return remove
}





