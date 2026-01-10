


// Import the functions you need from the SDKs you need

import "./login/auth.js"
import "./test.js"
import "./nav/navMenu.js"
import "./movement/move.js"
import "./chat/global.js"
import "./skills/inventory.js"
import "./skills/allStats.js"
import "./nav/coordsMap.js"
import "./skills/skillIntervals.js"

import { saveIfVersionChanged } from "./saveData/saveOrLoadData.js"
import { gameState } from "./saveData/saveOrLoadData.js"


save.addEventListener("click", () => {
    saveIfVersionChanged()
})



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional






document.getElementById("map").style.display = "none";

export function logger(text, color = "red") {
  const log = document.getElementById("floatingLogBox")

  const logEl = document.createElement("div") 

  logEl.textContent = text
  logEl.style.color = color

  log.appendChild(logEl)

  log.scrollTop = log.scrollHeight;
}

export function setName(){
  document.getElementById("name").textContent = gameState.player.name

  

}

//http://localhost:5000/

// Initialize Firebase

//useful console commands
//firebase deploy --only hosting //to redeploy site
//firebase serve //to start local host server

