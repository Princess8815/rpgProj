import { gameState, autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { changeScreen } from "../nav/navMenu.js";
import { allItems } from "../items/itemIndex.js";
import { parseStack } from "../utilities/textFormat.js";
import { updateInventory, addItem } from "./inventory.js";

export function initBank() {
  let space = Number(gameState.player.bank?.space);

  if (!Number.isFinite(space) || space <= 0) {
    space = 40;
    gameState.player.bank.space = 40;
  }

  const newBank = { space };

  for (let i = 0; i < space; i++) {
    const k = `slot${i}`;
    newBank[k] = gameState.player.bank[k] ?? "empty";
  }

  gameState.player.bank = newBank;
}



export function openBank(){
    let log = "logs"
    initBank()

    changeScreen("bank")

    const space = gameState.player.bank.space
    console.log(space)

    const invSide = document.getElementById("inventoryBank")
    const bankSide = document.getElementById("bank")
    invSide.innerHTML = "";
    bankSide.innerHTML = "";

    console.log("invSide exists?", !!invSide, invSide);
    console.log("bankSide exists?", !!bankSide, bankSide);

    for (let i = 0; i < 28; i++) {
        const item = gameState.player.inventory[`slot${i}`]
        const invEl = document.createElement("div")
        log = log + item
        invEl.classList.add("bank-slot")
        if (item === "empty") {
            invEl.textContent = "empty"
            invSide.appendChild(invEl)
            continue
        }

        const {key, qty} = parseStack(item)
        const actualItem = allItems[key]

        

        

        invEl.textContent = `${actualItem.name} ${qty}`
        invEl.addEventListener("click", () => {
            addToBank(item, `slot${i}`)
        })

        invSide.appendChild(invEl)
    }

    for (let i = 0; i < space; i++) {
        const bankItem = gameState.player.bank[`slot${i}`]
        log = log + bankItem
        const bankEl = document.createElement("div")
        bankEl.classList.add("bank-slot")
        if (bankItem === "empty") {
            bankEl.textContent = ""
            bankSide.appendChild(bankEl)
            continue
        }

        const {key, qty} = parseStack(bankItem)
        const actualItem = allItems[key]

        bankEl.textContent = `${actualItem.name} ${qty}`
        bankEl.addEventListener("click", () => {
            removeFromBank(bankItem, `slot${i}`)
        })

        bankSide.appendChild(bankEl)
        
    }
    console.log(log)
    
}

export function addToBank(item, invSlot) {
    const { key, qty } = parseStack(item);

    let emptySlot = null;

    for (const [slotKey, value] of Object.entries(gameState.player.bank)) {
        if (slotKey === "space") continue;

        if (value === "empty") {
            if (emptySlot === null) emptySlot = slotKey;
            continue;
        }

        const { key: bankKey, qty: bankQty } = parseStack(value);

        if (bankKey === key) {
            gameState.player.bank[slotKey] = `${bankKey} ${bankQty + qty}`;
            gameState.player.inventory[invSlot] = "empty";
            openBank();
            return;
        }
    }

    if (emptySlot) {
        gameState.player.bank[emptySlot] = item;
        gameState.player.inventory[invSlot] = "empty";
    }
    openBank();
}


export function removeFromBank(item, slot) {
    const { key, qty } = parseStack(item);
    const actualItem = allItems[key]

    if (actualItem.stackable) {
        addItem(key, qty)
        gameState.player.bank[slot] = "empty"
    }
    else {
        addItem(key, 1)
        if (qty - 1 <= 0) {
            gameState.player.bank[slot] = "empty"
        }
        else {
            gameState.player.bank[slot] = `${key} ${qty - 1}`
        }
    }
    openBank()
}