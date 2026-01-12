import { gameState, autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { allItems } from "../items/itemIndex.js";
import { capitalizeAfterSpaces, parseStack } from "../utilities/textFormat.js";
import { getItemKey } from "../utilities/getKey.js";
import { addResetCheckSkill } from "./updateMenu.js";
import { logger } from "../main.js";
import { openCraftMenu } from "./crafting/crafterMenu.js";

const INVENTORY_SLOTS = 28;
console.log("im in test")

export function updateInventory() {
    console.log("update inv ran");

    // Clear any previously selected state before rebuilding the UI.
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    gameState.player.selected = null;

    // Ensure the inventory object is always initialized and has all slots.
    if (!gameState.player.inventory || typeof gameState.player.inventory !== "object" || Object.keys(gameState.player.inventory).length === 0) {
        gameState.player.inventory = {
            equipment: gameState.player.inventory?.equipment ?? {},
        };
        for (let i = 0; i < INVENTORY_SLOTS; i++) {
            gameState.player.inventory[`slot${i}`] = "empty";
        }
    }

    const inventoryElement = document.getElementById("inventoryGrid");
    inventoryElement.innerHTML = "";

    for (let i = 0; i < INVENTORY_SLOTS; i++) {
        const invItem = document.createElement("div");
        invItem.classList.add("inv-slot");

        if (gameState.player.inventory[`slot${i}`] === "empty") {
            invItem.textContent = "";
            invItem.addEventListener("click", () => {
                if (gameState.player.selected) {
                    swap(gameState.player.selected.item, "empty"); // TODO: remove if sorting is no longer needed.
                }
            });
            inventoryElement.appendChild(invItem);
            continue;
        }

        const key = gameState.player.inventory[`slot${i}`];

        const { key: realKey, qty: quantity } = parseStack(key);
        const actualItem = allItems[realKey];

        if (!actualItem) {
            invItem.textContent = "???";

            invItem.addEventListener("click", () => {
                console.log(`${realKey} ${quantity}`);

                // Remove corrupted data caused by stale item keys.
                gameState.player.inventory[`slot${i}`] = "empty";

                // Keep save data consistent with the UI.
                autoSavePlayer();
                updateInventory();
            });

            inventoryElement.appendChild(invItem);
            continue;
        }

        const combineAction = actualItem?.combine;
        const combineParam = combineAction?.param;
        const selectedCombine = gameState.player?.selected?.item?.combine;

        const displayQty = actualItem.stackable ? quantity : "";
        invItem.textContent = `${actualItem.name} ${displayQty}`;
        invItem.title = actualItem.description;

        invItem.addEventListener("click", () => {
            if (actualItem.dbl && actualItem.dbl !== "none") {
                runDouble(actualItem.dbl, actualItem, quantity);
                return;
            }

            if (!gameState.player.selected) {
                invItem.classList.add("selected");
                gameState.player.selected = {
                    slot: `slot${i}`,
                    item: actualItem,
                };
                return;
            }

            if (gameState.player.selected.slot === `slot${i}`) {
                document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
                gameState.player.selected = null;
                return;
            }

            if (!combineAction || !selectedCombine || !selectedCombine.item.includes(key)) {
                document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
                gameState.player.selected = null;
                logger("nothing interesting happened");
                return;
            }

            document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
            gameState.player.selected = null;
            combine(combineParam);
        });

        invItem.addEventListener("contextmenu", (e) => {
            e.preventDefault(); // kill the default browser menu
            openItemMenu(e, actualItem, quantity);
        });

        inventoryElement.appendChild(invItem);
    }
}

function combine(param) {
    // Placeholder for future combine logic.
}

function runDouble(param, item, quantity) {
    console.log(`examined ${item.name} ${param}`);
    switch (param) {
        case "equip":
            equip(item, quantity);
            break;
        case "fletching":
        case "crafting":
            openCraftMenu(param);
            break;
        default:
            break;
    }
}

function openItemMenu(e, item, quantity) {
    console.log("open item ran");

    // Clear selection any time the context menu is opened.
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    gameState.player.selected = null;

    const menu = document.getElementById("contextMenu");
    menu.innerHTML = "";

    if (item.dbl) {
        const menuItem = document.createElement("div");
        menuItem.textContent = capitalizeAfterSpaces(item.dbl);
        menuItem.classList.add("menu-item");
        menuItem.addEventListener("click", () => {
            runDouble(item.dbl, item, quantity);
        });
        menu.appendChild(menuItem);
    }

    const dropItem = document.createElement("div");
    dropItem.textContent = "drop";
    dropItem.classList.add("menu-item");
    dropItem.addEventListener("click", () => {
        removeItem(item);
    });
    menu.appendChild(dropItem);

    const examineItem = document.createElement("div");
    examineItem.textContent = "examine";
    examineItem.classList.add("menu-item");
    examineItem.addEventListener("click", () => {
        examine(item);
    });
    menu.appendChild(examineItem);

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
    // Trust: item.slot matches equipment slot; equip is only called for equippable items.
    let equipment = gameState.player.inventory.equipment;

    if (item) {
        if (!equipment || typeof equipment !== "object" || Object.keys(equipment).length === 0) {
            equipment = gameState.player.inventory.equipment = {};
        }

        const itemSlotType = item.slot;
        if (itemSlotType === "ammo") {
            addOrRemoveAmmo(item, quantity, true);
        } else {
            const equipKey = getItemKey(item);
            addResetCheckSkill(item.useSkill);

            const currentReqSkill = gameState.player.stats[item.useSkill].level;

            if (currentReqSkill >= item.useLevel) {
                if (item.twoHanded && equipment.offhand) {
                    logger("you need both hands free to equip that");
                    RenderEquip();
                    return;
                }
                if (itemSlotType === "offhand" && equipment.mainhand) {
                    const mainhand = parseStack(equipment.mainhand);
                    const mainItem = allItems[mainhand.key];
                    if (mainItem.twoHanded) {
                        logger("you are carrying a really heavy weapon you arent a super hero");
                        logger("even if you can carry thousands of pounds in yoyr inventory");
                        delete gameState.player.inventory.equipment.offhand;
                        RenderEquip();
                        return;
                    }
                }
                if (!equipment[itemSlotType]) {
                    removeItem(item);
                    equipment[itemSlotType] = equipKey;
                } else {
                    const equippedKey = equipment[itemSlotType];
                    removeItem(item);
                    equipment[itemSlotType] = equipKey;
                    addItem(equippedKey);
                }
            } else {
                logger(`you need a ${item.useSkill} of ${item.useLevel} to equip that item`);
            }
        }
    }

    RenderEquip();
    autoSavePlayer();
}

function RenderEquip() {
    const equipment = gameState.player.inventory.equipment;
    const equipDoc = document.getElementById("equipmentGrid");
    equipDoc.innerHTML = "";

    for (const [slot, pos] of Object.entries(equipMap)) {
        const el = document.createElement("div");
        el.classList.add("equip-slot");
        if (slot === "ammo") {
            el.id = "ammo";
        }

        el.style.gridColumn = pos.c;
        el.style.gridRow = pos.r;

        if (equipment[slot]) {
            const { key } = parseStack(equipment[slot]);
            const itemDef = allItems[key];

            if (itemDef) {
                el.textContent = itemDef.name;
                el.addEventListener("click", () => unEquip(slot));
            } else {
                el.textContent = slot;
            }
        } else {
            el.textContent = slot;
        }

        equipDoc.appendChild(el);
    }

    addOrRemoveAmmo();
}

function unEquip(slot) {
    const equipItem = gameState.player.inventory.equipment;
    const item = equipItem[slot];
    if (!item) return false;

    if (addItem(item)) {
        delete equipItem[slot];

        updateInventory();
        equip();
        return true;
    }

    console.log("inventory is to full to equip that");
    autoSavePlayer();
    return false;
}

function examine(item) {
    logger(`examined ${item.name}`);
}

function swap(item1, item2) {

}

export function addItem(itemKey, amount = 1) {
    const inv = gameState.player.inventory;

    if (!allItems[itemKey]?.stackable) {
        for (let i = 0; i < INVENTORY_SLOTS; i++) {
            const slotKey = `slot${i}`;
            if (inv[slotKey] === "empty") {
                inv[slotKey] = itemKey;
                updateInventory();
                autoSavePlayer();
                return true;
            }
        }
    } else {
        // 1️⃣ Try to add to existing stack
        for (let i = 0; i < INVENTORY_SLOTS; i++) {
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
        for (let i = 0; i < INVENTORY_SLOTS; i++) {
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

    // Accept either an item object OR a string key.
    const itemKey =
        typeof itemOrKey === "string"
            ? itemOrKey
            : Object.keys(allItems).find(key => allItems[key] === itemOrKey);

    if (!itemKey) return false;

    for (let i = 0; i < INVENTORY_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue;

        const { key } = parseStack(inv[slotKey]);

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
    let recipe = { ...item.recipe };
    let craftable = false;

    for (let i = 0; i < INVENTORY_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue;

        const { key: invKey, qty: invQty } = parseStack(inv[slotKey]);

        if (!recipe[invKey]) continue;

        if (recipe[invKey] <= invQty) {
            delete recipe[invKey];
            if (Object.keys(recipe).length === 0) {
                craftable = true;
                break;
            }
            continue;
        }

        recipe[invKey] -= invQty;
        if (recipe[invKey] <= 0) {
            delete recipe[invKey];
            if (Object.keys(recipe).length === 0) {
                craftable = true;
                break;
            }
        }
    }

    if (!craftable) {
        logger("you dont have enough resources to do that");
        gameState.player.action = null; // even if ran another way theres no multitask
        return false; // not sure i need false but just in case
    }

    removeIngredients(item.recipe);
    const craftAmount = item.craftAmount ?? 1;
    addItem(key, craftAmount);
    return true;
}

export function removeIngredients(recipe) {
    const inv = gameState.player.inventory;

    // Iterate each required ingredient and remove from stacks.
    for (const [ingredientKey, requiredQty] of Object.entries(recipe)) {
        let remaining = requiredQty;

        for (let i = 0; i < INVENTORY_SLOTS && remaining > 0; i++) {
            const slotKey = `slot${i}`;
            const slot = inv[slotKey];
            if (slot === "empty") continue;

            const { key: slotItemKey, qty: slotQty } = parseStack(slot);
            if (slotItemKey !== ingredientKey) continue;

            // Slot fully consumed.
            if (slotQty <= remaining) {
                inv[slotKey] = "empty";
                remaining -= slotQty;
            }
            // Slot partially consumed.
            else {
                inv[slotKey] = `${slotItemKey} ${slotQty - remaining}`;
                remaining = 0;
            }
        }
    }
}

function reorderInventory() {
    const currentItem = [];
    const inv = gameState.player.inventory;

    for (let i = 0; i < INVENTORY_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (inv[slotKey] === "empty") continue;

        currentItem.push(inv[slotKey]);
        inv[slotKey] = "empty";
    }

    currentItem.forEach(stackKey => {
        const { key: itemKey, qty } = parseStack(stackKey);
        addItem(itemKey, qty ?? 1);
    });

    updateInventory();
    autoSavePlayer();
}

export function addOrRemoveAmmo(item = null, quantity = 1, add = true) {
    let remove = quantity; // only used in remove
    const equip = gameState.player.inventory.equipment;

    const ammoEl = document.getElementById("ammo");
    if (!ammoEl) {
        return remove;
    }

    if (add && item) {
        const key = getItemKey(item);
        if (!equip.ammo) {
            gameState.player.inventory.equipment.ammo = {
                name: allItems[key].name,
                ammoItem: key,
                quantity: quantity,
            };
            removeItem(item);
        } else if (equip.ammo.ammoItem === key) {
            gameState.player.inventory.equipment.ammo.quantity += quantity;
            removeItem(item);
        } else {
            addItem(equip.ammo.ammoItem, equip.ammo.quantity);
            gameState.player.inventory.equipment.ammo = {
                name: allItems[key].name,
                ammoItem: key,
                quantity: quantity,
            };
            removeItem(item);
        }
    } else if (!add) {
        // Ammo removal works differently since combat only reduces ammo.
        // Remove 10 when 6 will remove the 6 that's by design.
        if (gameState.player.inventory.equipment.ammo) {
            gameState.player.inventory.equipment.ammo.quantity -= quantity;
            if (gameState.player.inventory.equipment.ammo.quantity <= 0) {
                const totalRemove = Math.abs(gameState.player.inventory.equipment.ammo.quantity);
                remove -= totalRemove;
                equip.ammo = null;
                ammoEl.textContent = "ammo";
            }
        } else {
            remove = 0;
        }
    }

    ammoEl.textContent = equip.ammo
        ? `${equip.ammo.name} ${equip.ammo.quantity}`
        : "ammo";

    ammoEl.onclick = () => {
        if (!equip.ammo) return;
        if (addItem(equip.ammo.ammoItem, equip.ammo.quantity)) {
            equip.ammo = null;
            ammoEl.textContent = "ammo";
        }
    };

    autoSavePlayer();
    return remove;
}
