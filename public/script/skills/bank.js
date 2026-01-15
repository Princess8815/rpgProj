import { gameState, autoSavePlayer } from "../saveData/saveOrLoadData.js";
import { allItems } from "../items/itemIndex.js";
import { parseStack } from "../utilities/textFormat.js";
import { showPanel } from "../nav/navMenu.js";
import { updateInventory } from "./inventory.js";

const BANK_SLOTS = 40;
let bankWithdrawHandler = null;

function bankLog(text, color = "red") {
    const log = document.getElementById("floatingLogBox");
    if (!log) return;

    const logEl = document.createElement("div");
    logEl.textContent = text;
    logEl.style.color = color;
    log.appendChild(logEl);
    log.scrollTop = log.scrollHeight;
}

function ensureBankState() {
    if (!gameState.player) return;
    if (!gameState.player.bank || typeof gameState.player.bank !== "object") {
        gameState.player.bank = {};
    }

    for (let i = 0; i < BANK_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (!gameState.player.bank[slotKey]) {
            gameState.player.bank[slotKey] = "empty";
        }
    }
}

export function initializeBankUI() {
    const closeBtn = document.getElementById("closeBank");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeBank();
        });
    }
}

export function setBankWithdrawHandler(handler) {
    bankWithdrawHandler = handler;
}

export function isBankOpen() {
    return Boolean(gameState.player?.bankOpen);
}

export function openBank() {
    ensureBankState();
    gameState.player.bankOpen = true;
    showPanel("bankScreen");
    updateInventory();
    updateBank();
}

export function closeBank() {
    if (!gameState.player) return;
    gameState.player.bankOpen = false;
    showPanel("content");
}

export function addToBank(itemKey, amount = 1) {
    ensureBankState();
    const bank = gameState.player.bank;

    for (let i = 0; i < BANK_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (bank[slotKey] === "empty") continue;

        const { key, qty } = parseStack(bank[slotKey]);
        if (key === itemKey) {
            const nextQty = (qty ?? 1) + amount;
            bank[slotKey] = `${key} ${nextQty}`;
            autoSavePlayer();
            return true;
        }
    }

    for (let i = 0; i < BANK_SLOTS; i++) {
        const slotKey = `slot${i}`;
        if (bank[slotKey] === "empty") {
            bank[slotKey] = `${itemKey} ${amount}`;
            autoSavePlayer();
            return true;
        }
    }

    bankLog("bank is full");
    return false;
}

export function updateBank() {
    ensureBankState();
    const bankElement = document.getElementById("bankGrid");
    if (!bankElement) return;

    bankElement.innerHTML = "";
    const bank = gameState.player.bank;

    for (let i = 0; i < BANK_SLOTS; i++) {
        const slotKey = `slot${i}`;
        const bankSlot = document.createElement("div");
        bankSlot.classList.add("bank-slot");

        if (bank[slotKey] === "empty") {
            bankSlot.textContent = "";
            bankElement.appendChild(bankSlot);
            continue;
        }

        const { key, qty } = parseStack(bank[slotKey]);
        const item = allItems[key];
        const displayQty = qty ?? 1;

        bankSlot.textContent = item ? `${item.name} x${displayQty}` : "???";
        bankSlot.title = item?.description ?? "Unknown item";

        bankSlot.addEventListener("click", () => {
            if (!bankWithdrawHandler) return;
            const withdrawAmount = 1;
            const canWithdraw = bankWithdrawHandler(key, withdrawAmount);
            if (!canWithdraw) {
                bankLog("inventory is full");
                return;
            }

            const remaining = displayQty - withdrawAmount;
            if (remaining <= 0) {
                bank[slotKey] = "empty";
            } else {
                bank[slotKey] = `${key} ${remaining}`;
            }

            updateBank();
            autoSavePlayer();
        });

        bankElement.appendChild(bankSlot);
    }
}
