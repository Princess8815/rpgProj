import { mapGenerater } from "./generateMap.js";
import { updateInventory } from "../skills/inventory.js";

export function changeScreen(navItem) {
    switch (navItem) {
        case "map":
            mapGenerater();
            showPanel("map")
            break
        case "home":
            showPanel("content")
            
            break
        case "bank":
            showPanel("bankArea")
            break
    }
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const nav = e.currentTarget.dataset.nav;
    changeScreen(nav);
  });
});

export function showPanel(panelId) {
  const bodyChildren = document.body.children;

  for (const el of bodyChildren) {
    if (!el.id) continue;

    el.style.display = (el.id === panelId) ? "block" : "none";
  }
}

document.querySelectorAll(".homeBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    showPanel("content");
    updateInventory()
  });
});

