import { TAB_TYPE } from "../../../src/constants.js";
export function TextTab({ tabItems, groupName = "default" }) {
  const tabItemsHtml = tabItems
    .map(
      (item) => `
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent"
        data-tab-group="${groupName}" 
        data-tab-item="${item}"
        data-tab-type="${TAB_TYPE.TEXT}"
      >
        ${item}
      </button>
  `
    )
    .join("");

  return `<nav class="flex gap-6">${tabItemsHtml}</nav>`;
}
