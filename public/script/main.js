import "./login/auth.js"


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyD6U7WyEG9o5nr9MCFjKySBhAsEUxjG_2o",
  authDomain: "rpgproj-d8482.firebaseapp.com",
  projectId: "rpgproj-d8482",
  storageBucket: "rpgproj-d8482.firebasestorage.app",
  messagingSenderId: "1011180360166",
  appId: "1:1011180360166:web:eeeb70110c446f9f778627",
  measurementId: "G-T31TRD7H2E"
};

console.log("main ran")

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);