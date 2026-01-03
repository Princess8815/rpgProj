


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);