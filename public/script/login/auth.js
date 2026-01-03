import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { auth } from "../main.js";

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

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Logged in:", user.uid);

    // Hide login UI
    document.getElementById("authPanel").style.display = "none";

    // Load player data
    loadPlayer(user.uid);
  } else {
    console.log("Logged out");
    document.getElementById("authPanel").style.display = "block";
  }
});

