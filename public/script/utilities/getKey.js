import { allItems } from "../items/itemIndex.js";

export function getItemKey(itemObj) {
  return Object.keys(allItems).find(
    key => allItems[key] === itemObj
  ) ?? null;
}
