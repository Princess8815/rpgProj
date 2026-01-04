import { auth, db } from "./firebase.js";

import { savePlayerData, gameState } from "./saveData/saveOrLoadData.js";

north.onclick = async () => {
    if (!auth.currentUser) {
        alert("you must register or log in first")
        return
    }
  if (!gameState.isHydrated) {
    console.warn("Game not ready yet");
    return;
  }
  if (Number.isNaN(gameState.player.stats.hp)){
    gameState.player.stats.hp = 0
  }

  gameState.player.stats.hp += 1;

  document.getElementById("statHp").textContent =
    gameState.player.stats.hp;

  await savePlayerData(gameState.player);
};
