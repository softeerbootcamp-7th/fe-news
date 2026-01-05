// src/components/GridTab.js
export const GridTab = (selectedTab = "all", subscribedCount = 8) => {
  return `
    <nav class="flex gap-6 mb-6">
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent ${
          selectedTab === "all"
            ? "selected-bold16 text-strong"
            : "available-medium16 text-weak"
        }"
        data-tab="all"
      >
        전체 언론사
      </button>
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent ${
          selectedTab === "subscribed"
            ? "selected-bold16 text-strong"
            : "available-medium16 text-weak"
        }"
        data-tab="subscribed"
      >
        내가 구독한 언론사 <span class="badge">${subscribedCount}</span>
      </button>
    </nav>
  `;
};
