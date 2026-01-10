import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth, db, rtdb } from "../firebase.js";

import { savePlayerData, loadPlayerData, hydrateGameState, gameState } from "../saveData/saveOrLoadData.js";
import { UpdateSkillMenu } from "../skills/updateMenu.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  set,
  update,
  onValue,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { updateMyLivePosition, watchNearbyPlayers } from "../saveData/realtime.js";
import { updateCoords } from "../movement/move.js"
import { updateAreaAndCheckSurroundings } from "../movement/move.js";
import { updateInventory, addItem, equip } from "../skills/inventory.js";
import { initGlobalChat, sendChatMessage } from "../chat/global.js";
let chatInitialized = false;






console.log("auth ran")

registerBtn.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
  } catch (err) {
    authError.textContent = err.message;
  }
};

loginBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
  } catch (err) {
    authError.textContent = err.message;
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged in:", user.uid);
    const uid = user.uid;




    // Hide login UI
    document.getElementById("authPanel").style.display = "none";
    document.getElementById("logOut").style.display = "block";
    document.getElementById("content").style.display = "block";

    const data = await loadPlayerData(user.uid);
    hydrateGameState(data);

        updateCoords()
        updateAreaAndCheckSurroundings(gameState.player.location)
        updateInventory()
        equip()
        gameState.player.action = null
initGlobalChat(msg => {
  const chatBox = document.getElementById("globalChat");
  if (!chatBox) return;

  const line = document.createElement("div");
  line.textContent = `[${msg.name}] ${msg.text}`;
  console.log(`[CHAT] ${msg.name}: ${msg.text}`);
  chatBox.appendChild(line);
  chatBox.scrollTop = chatBox.scrollHeight;
});



        const chatInput = document.getElementById("chatInput");
        const sendBtn = document.getElementById("sendChat");

        if (chatInput && sendBtn) {
          sendBtn.onclick = () => {
            sendChatMessage(chatInput.value);
            chatInput.value = "";
          };

          chatInput.onkeydown = e => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendChatMessage(chatInput.value);
              chatInput.value = "";
            }
          };
        }





    UpdateSkillMenu();
    await ensurePlayerName(user.uid);
    document.getElementById("name").textContent = gameState.player.name


    startGame(uid);

    // initial live position write
    updateMyLivePosition(uid);

    // start watching nearby players
    watchNearbyPlayers(
      gameState.player.location.x,
      gameState.player.location.z,
      handleNearbyPlayers
    );
    
  } else {
    console.log("Logged out");
    document.getElementById("authPanel").style.display = "block";
    document.getElementById("logOut").style.display = "none";
    document.getElementById("content").style.display = "none";
  }
});

logOut.onclick = async () => {
  console.log("logged out")
  await savePlayerData(gameState.player);
  await signOut(auth);
};


export async function ensurePlayerName(uid) {
  if (gameState.player.name) return;

  while (true) {
    const name = prompt("Choose a username:");

    if (!name) {
      alert("You must choose a name.");
      continue;
    }

    const clean = name.trim();

    if (clean.length < 3) {
      alert("Name too short.");
      continue;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
      alert("Only letters, numbers, and underscores allowed.");
      continue;
    }

    const nameRef = doc(db, "usernames", clean.toLowerCase());
    const snap = await getDoc(nameRef);

    if (snap.exists()) {
      alert("That name is already taken. Try another.");
      continue;
    }

    // reserve username
    await setDoc(nameRef, { uid });

    // save to player
    gameState.player.name = clean;
    await savePlayerData(gameState.player);

    break;
  }
}

function startGame(uid) {
  const playerRef = ref(rtdb, `players/${uid}`);

  // mirror current gameState.player
  set(playerRef, gameState.player);

  // save same snapshot if disconnect happens
  onDisconnect(playerRef).set(gameState.player);
}

export function syncPlayer(uid) {
  const playerRef = ref(rtdb, `players/${uid}`);

  set(playerRef, gameState.player);
  onDisconnect(playerRef).set(gameState.player);
}

export function updateWorldImprint(uid) {
  set(ref(rtdb, `worldImprints/${uid}`), {
    x: gameState.player.location.x ?? 0,
    y: gameState.player.location.y ?? 100,
    z: gameState.player.location.z ?? 0,
    danger: gameState.player.multiplier ?? 1,
    lastSeen: Date.now()
  });
}

setInterval(() => {
  updateWorldImprint(auth.currentUser.uid)
}, 30000)

export function handleNearbyPlayers(chunkKey, players) {
  for (const [uid, data] of Object.entries(players)) {
    console.log(`Player ${data.name} (${uid}) at`, data.x, data.z);
  }
}


export function handleNearbyImprints(imprints) {
  console.log("Offline imprints nearby:", imprints);

  // Later:
  // - render ghost/proxy
  // - show bounty marker
  // - danger aura, etc
}







