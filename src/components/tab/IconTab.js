import { TAB_TYPE } from "@/constants.js";
export function IconTab({ tabItems, tabIcons, groupName = "default" }) {
  const tabItemsHtml = tabItems
    .map(
      (item) => `
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent"
        data-tab-group="${groupName}" 
        data-tab-item="${item}"
        data-tab-type="${TAB_TYPE.ICON}"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <use href="/assets/icons/${tabIcons[tabItems.indexOf(item)]}.svg"/>
        </svg>
      </button>
  `
    )
    .join("");

  return `<nav class="flex gap-1">${tabItemsHtml}</nav>`;
}
