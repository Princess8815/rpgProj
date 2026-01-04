import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth, db } from "../firebase.js";

import { savePlayerData, loadPlayerData, hydrateGameState } from "../saveData/saveOrLoadData.js";
import { UpdateSkillMenu } from "../skills/updateMenu.js";

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

function loadPlayer(uid) {
  console.log("loadPlayer called for:", uid);
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged in:", user.uid);

    // Hide login UI
    document.getElementById("authPanel").style.display = "none";
    document.getElementById("logOut").style.display = "block";
    document.getElementById("content").style.display = "block";

    const data = await loadPlayerData(user.uid);
    hydrateGameState(data);

    UpdateSkillMenu();


    // Load player data
    loadPlayer(user.uid); //i think this was an oversight
  } else {
    console.log("Logged out");
    document.getElementById("authPanel").style.display = "block";
    document.getElementById("logOut").style.display = "none";
    document.getElementById("content").style.display = "none";
  }
});

logOut.onclick = async () => {
  console.log("logged out")
  signOut(auth)
};

