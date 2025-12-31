// src/components/GridTab.js
export const GridTab = (selectedTab = "all", subscribedCount = 8) => {
  return `
    <nav class="grid-tab">
      <button 
        class="grid-tab-item ${
          selectedTab === "all"
            ? "selected-bold16 selected"
            : "available-medium16 available"
        }"
        data-tab="all"
      >
        전체 언론사
      </button>
      <button 
        class="grid-tab-item ${
          selectedTab === "subscribed"
            ? "selected-bold16 selected"
            : "available-medium16 available"
        }"
        data-tab="subscribed"
      >
        내가 구독한 언론사 <span class="badge">${subscribedCount}</span>
      </button>
    </nav>
  `;
};
