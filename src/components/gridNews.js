import pagination, { nextButton } from "./pagination.js";
import "../style/gridNews.css";

export default function gridNews(
  newsItems = [],
  subscribedNews = new Set(),
  currentFilter = "all"
) {
  const totalCells = 24;

  const items = Array.isArray(newsItems) ? newsItems : [];

  const paddedNews = [...items];
  while (paddedNews.length < totalCells) {
    paddedNews.push(null);
  }

  return /* html */ `
    <div class="grid-pagination-wrapper">
      ${pagination()}
      
      <section class="grid-news-section">
        <ul class="logo-grid">
          ${paddedNews
            .map(
              (item) => `
            <li class="news-card ${item ? "has-content" : ""}">
              ${
                item
                  ? `
                <a href="${
                  item.mainLink
                }" target="_blank" rel="noopener" class="news-link">
                  <img src="${item.logo}" alt="${item.press}">
                </a>
                <button 
                  class="subscribe-btn ${
                    subscribedNews.has(item.press) ? "subscribed" : ""
                  }"
                  data-press="${item.press}"
                  data-logo="${item.logo}"
                  data-filter="${currentFilter}"
                >
                  ${subscribedNews.has(item.press) ? "구독 해지" : "구독하기"}
                </button>
              `
                  : ""
              }
            </li>
          `
            )
            .join("")}
        </ul>
      </section>
      
      ${nextButton()}
    </div>
  `;
}
