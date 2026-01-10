import { ref, push, onChildAdded, remove, get } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { auth, rtdb } from "../firebase.js";
import { gameState } from "../saveData/saveOrLoadData.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const CHAT_PATH = "chat/global";

export async function sendChatMessage(text) {
  const user = auth.currentUser;
  if (!user || !gameState.player) return;

  const msg = (text ?? "").trim();
  if (!msg) return;

  await push(ref(rtdb, CHAT_PATH), {
    uid: user.uid,
    name: gameState.player.name,
    text: msg,
    time: Date.now()
  });
}

// ONLY attach AFTER auth

export function initGlobalChat(onMessage) {
  const chatRef = ref(rtdb, "chat/global");

  onChildAdded(chatRef, snap => {
    const msg = snap.val();
    if (!msg) return;
    onMessage(msg, snap.key);
  });
}

setInterval(async () => {
  const chatRef = ref(rtdb, "chat/global");
  const snap = await get(chatRef);
  if (!snap.exists()) return;

  const now = Date.now();
  snap.forEach(child => {
    const msg = child.val();
    if (now - msg.time > 60_000) {
      remove(ref(rtdb, `chat/global/${child.key}`));
    }
  });
}, 1_000);






