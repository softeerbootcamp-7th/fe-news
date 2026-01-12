import { TAB_TYPE, TAB_LABELS } from "@/constants.js";

export function TextTab({ tabItems, groupName = "default" }) {
  const tabItemsHtml = tabItems
    .map(
      (item) => `
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent flex items-center"
        data-tab-group="${groupName}" 
        data-tab-item="${item}"
        data-tab-type="${TAB_TYPE.TEXT}"
      >
        ${TAB_LABELS[item] || item}
      </button>
  `
    )
    .join("");

  return `<nav class="flex gap-6">${tabItemsHtml}</nav>`;
}
