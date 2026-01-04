import { auth, db } from "../firebase.js";

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
  inventory: [],
  equipment: {}
};


export async function savePlayerData(playerData) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const ref = doc(db, "players", user.uid);

  await setDoc(ref, playerData, { merge: true });
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

