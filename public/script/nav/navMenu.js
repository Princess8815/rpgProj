import { mapGenerater } from "./generateMap.js";

export function changeScreen(navItem) {
    switch (navItem) {
        case "map":
            mapGenerater();
            document.getElementById("map").style.display = "block";
            document.getElementById("content").style.display = "none";
            break
        case "home":
            document.getElementById("map").style.display = "none";
            document.getElementById("cityDetails").style.display = "none";
            document.getElementById("content").style.display = "block";
            break
    }
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const nav = e.currentTarget.dataset.nav;
    changeScreen(nav);
  });
});