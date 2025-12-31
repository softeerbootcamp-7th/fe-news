import "../style/newsFilter.css";

export default function newsFilter(
  activeFilter = "all",
  activeView = "grid",
  subscribedCount = 0
) {
  const filters = [
    { id: "all", label: "전체 언론사", count: null },
    { id: "favorite", label: "내가 구독한 언론사", count: subscribedCount },
  ];

  return /* html */ `
    <div class="news-filter-container">
      <div class="news-filter">
        ${filters
          .map(
            (filter) => `
          <button 
            class="filter-btn ${activeFilter === filter.id ? "active" : ""}"
            data-filter="${filter.id}"
          >
            ${filter.label}
            ${filter.count ? `<span class="count">${filter.count}</span>` : ""}
          </button>
        `
          )
          .join("")}
      </div>
      
      <div class="view-toggle">
        <button 
          class="view-btn ${activeView === "list" ? "active" : ""}"
          data-view="list"
          aria-label="리스트 보기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3" width="16" height="2" fill="currentColor"/>
            <rect x="2" y="9" width="16" height="2" fill="currentColor"/>
            <rect x="2" y="15" width="16" height="2" fill="currentColor"/>
          </svg>
        </button>
        <button 
          class="view-btn ${activeView === "grid" ? "active" : ""}"
          data-view="grid"
          aria-label="그리드 보기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="6" height="6" fill="currentColor"/>
            <rect x="12" y="2" width="6" height="6" fill="currentColor"/>
            <rect x="2" y="12" width="6" height="6" fill="currentColor"/>
            <rect x="12" y="12" width="6" height="6" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}
