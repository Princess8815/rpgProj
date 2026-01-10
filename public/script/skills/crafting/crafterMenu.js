import { gameState } from "../../saveData/saveOrLoadData.js";
import { allItems } from "../../items/itemIndex.js";
import { addResetCheckSkill } from "../updateMenu.js";
import { changeScreen, showPanel } from "../../nav/navMenu.js";

let selectedRecipeKey = null;
let selectedRecipeItem = null;


export function openCraftMenu(menu) { //menu matches the skill
    document.getElementById("craftMenu").style.display = "flex"
    document.getElementById("content").style.display = "none"
    const craftButtons = document.getElementById("craft-items")
    const skillLvl = addResetCheckSkill(menu)
    craftButtons.innerHTML = ""

    Object.entries(allItems).forEach(([key, value]) => {
        if (!value.craftable || value.craftSkill != menu || value.craftLevel > skillLvl) return
        

        const btn = document.createElement("button")

        btn.textContent = value.name
        btn.addEventListener("click", () => {
            setCrafting(key, value)
        })
        craftButtons.appendChild(btn)

    })
}

function setCrafting(key, item) {

    selectedRecipeKey = key;
    selectedRecipeItem = item;

    document.querySelector("#craft-place .craft-placeholder")
    .classList.add("hidden");

    document.getElementById("craft-details-menu")
    .classList.remove("hidden");


    document.getElementById("craftItemName").textContent = item.name
    document.getElementById("craftItemDesc").textContent = item.description
    const recipe = document.getElementById("craftRecipe")
    let recipeText = ""
    Object.entries(item.recipe).forEach(([key, value]) => {
        const ingredient = allItems[key]
        recipeText += `${ingredient.name} ${value}\n`
    })
    recipe.textContent = recipeText

    const qtySlider = document.getElementById("craftQty");
    const qtyValue  = document.getElementById("craftQtyValue");
    const craftBtn  = document.getElementById("craftButton");

    qtySlider.max = item.stackable ? 60 : 28;
    qtySlider.value = 1;
    qtyValue.textContent = "1";




}

function initCraftListeners() {
  const qtySlider = document.getElementById("craftQty");
  const qtyValue  = document.getElementById("craftQtyValue");
  const craftBtn  = document.getElementById("craftButton");

  qtySlider.addEventListener("input", () => {
    qtyValue.textContent = qtySlider.value;
  });

  craftBtn.addEventListener("click", () => {
    if (!selectedRecipeItem) return;

    const qty = Number(qtySlider.value);
    craftItem(selectedRecipeKey, selectedRecipeItem, qty);
  });
}
 
initCraftListeners()

function craftItem(key, item, qty) {
    showPanel("content")
    gameState.player.action = {
        craft: {
            key: key,
            item: item,
            qty: qty,
            maxTime: item?.time ?? 3,
            time: item?.time ?? 3
        }
    }
}