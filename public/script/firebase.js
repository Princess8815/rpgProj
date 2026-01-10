import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6U7WyEG9o5nr9MCFjKySBhAsEUxjG_2o",
  authDomain: "rpgproj-d8482.firebaseapp.com",
  projectId: "rpgproj-d8482",
  storageBucket: "rpgproj-d8482.firebasestorage.app",
  messagingSenderId: "1011180360166",
  appId: "1:1011180360166:web:eeeb70110c446f9f778627",
  measurementId: "G-T31TRD7H2E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(
  app,
  "https://rpgproj-d8482-default-rtdb.firebaseio.com"
);