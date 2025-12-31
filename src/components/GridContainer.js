// src/components/GridContainer.js
import { GridTab } from "./GridTab.js";
import { NewsGrid } from "./NewsGrid.js";

export const GridContainer = (
  selectedTab,
  subscribedCount,
  newsItems,
  isDarkMode
) => {
  return `
    <div class="grid-container">
      ${GridTab(selectedTab, subscribedCount)}
      <div class="grid-wrapper">
        <button class="grid-arrow grid-arrow-left" aria-label="이전">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        ${NewsGrid(newsItems, isDarkMode)}
        <button class="grid-arrow grid-arrow-right" aria-label="다음">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;
};
