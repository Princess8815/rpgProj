import { ref, set, remove, onValue, off, onDisconnect } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { rtdb, auth } from "../firebase.js";
import { gameState } from "../saveData/saveOrLoadData.js";


const CHUNK_SIZE = 50;
let lastChunkKey = null;
const activeChunkRefs = new Map();

function getChunkKey(x, z) {
  return `${Math.floor(x / CHUNK_SIZE)}_${Math.floor(z / CHUNK_SIZE)}`;
}

function getPublicPlayerState() {
  const p = gameState.player;

  return {
    uid: auth.currentUser.uid,
    name: p.name,
    location: {
      x: p.location.x,
      y: p.location.y,
      z: p.location.z
    },
    level: p.level ?? 1,
    hp: p.hp ?? 100,
    danger: p.multiplier ?? 1,
    lastUpdate: Date.now()
  };
}


export function updateMyLivePosition(uid) {
  const { x, y, z } = gameState.player.location;
  const chunkKey = getChunkKey(x, z);

  // if chunk changed, remove old entry
  if (lastChunkKey && lastChunkKey !== chunkKey) {
    remove(ref(rtdb, `onlinePlayers/${lastChunkKey}/${uid}`));
  }

  lastChunkKey = chunkKey;

  const meRef = ref(rtdb, `onlinePlayers/${chunkKey}/${uid}`);

  set(meRef, {
    x, y, z,
    name: gameState.player.name,
    state: getPublicPlayerState(),
    lastUpdate: Date.now()
  });

  onDisconnect(meRef).remove();
}

export function watchNearbyPlayers(x, z, onUpdate) {
  const cx = Math.floor(x / CHUNK_SIZE);
  const cz = Math.floor(z / CHUNK_SIZE);

  const wanted = new Set();

  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      wanted.add(`${cx + dx}_${cz + dz}`);
    }
  }

  // unsubscribe old chunks
  for (const [key, refObj] of activeChunkRefs.entries()) {
    if (!wanted.has(key)) {
      off(refObj);
      activeChunkRefs.delete(key);
    }
  }

  // subscribe new chunks
  for (const key of wanted) {
    if (activeChunkRefs.has(key)) continue;

    const chunkRef = ref(rtdb, `onlinePlayers/${key}`);
    activeChunkRefs.set(key, chunkRef);

    onValue(chunkRef, snap => {
      onUpdate(key, snap.val() || {});
    });
  }
}

export function watchNearbyImprints(x, z, onUpdate) {
  const imprintRef = ref(rtdb, "worldImprints");

  onValue(imprintRef, snap => {
    const all = snap.val() || {};
    const nearby = {};

    for (const [uid, data] of Object.entries(all)) {
      const dx = data.x - x;
      const dz = data.z - z;

      if (Math.abs(dx) <= 50 && Math.abs(dz) <= 50) {
        nearby[uid] = data;
      }
    }

    onUpdate(nearby);
  });
}
