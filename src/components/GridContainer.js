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
    <main class="bg-surface-alt mt-8">
      ${GridTab(selectedTab, subscribedCount)}
      <div class="relative">
        <button class="absolute top-1/2 translate-y-neg-1/2 w-12 h-12 rounded-full border bg-surface-default cursor-pointer flex items-center justify-center text-default transition-all hover:bg-surface-alt hover:border-bold hover:text-strong left-neg-20" aria-label="이전">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        ${NewsGrid(newsItems, isDarkMode)}
        <button class="absolute top-1/2 translate-y-neg-1/2 w-12 h-12 rounded-full border bg-surface-default cursor-pointer flex items-center justify-center text-default transition-all hover:bg-surface-alt hover:border-bold hover:text-strong right-neg-20" aria-label="다음">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </main>
  `;
};
