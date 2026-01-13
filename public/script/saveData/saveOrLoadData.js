import { auth, db } from "../firebase.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const gameState = {
  player: null,     // will hold player data once loaded
  isHydrated: false // prevents logic from running too early
};

// game/state.js
export const emptyGameState = {
  stats: {},
  position: {},
  inventory: {},
  equipment: {},
  stats: {},
  combatXp: {
    melee: "balanced",
    ranged: "balanced",
    magic: "balanced"
  },
  version: 1,
  savedVersion: 1,
  saves: 0 //using to track saves
};


export async function savePlayerData(playerData) {
    console.log("saved" + " " + gameState.player.version + " " + gameState.player.savedVersion)

    gameState.player.savedVersion = gameState.player.version
    gameState.player.saves++

  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const ref = doc(db, "players", user.uid);

  await setDoc(ref, playerData);
  console.log(`saves ${gameState.player.saves}`)
}

export async function loadPlayerData() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not logged in");
  }

  const ref = doc(db, "players", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null; // first-time player
  }

  return snap.data();
}

export function hydrateGameState(playerData) {
  gameState.player = structuredClone({
    ...emptyGameState,
    ...playerData
  });

  gameState.isHydrated = true;
}

let lastSaveTime = 0;
let trailingTimer = null;

export function autoSavePlayer() {
  gameState.player.version += 1
  const now = Date.now();

  // If we haven't saved recently, save immediately
  if (now - lastSaveTime >= 30_000) {
    lastSaveTime = now;
    savePlayerData(gameState.player);
  }

  // Always reset the trailing save
  if (trailingTimer) {
    clearTimeout(trailingTimer);
  }

  trailingTimer = setTimeout(() => {
    lastSaveTime = Date.now();
    savePlayerData(gameState.player);
    trailingTimer = null;
  }, 30_000);
}

export function saveIfVersionChanged() {
    if (gameState.player.version <= gameState.player.savedVersion) {
        console.log(`version ${gameState.player.version} ${gameState.player.savedVersion}`)
        return
    }
    
    
    savePlayerData(gameState.player)
}

