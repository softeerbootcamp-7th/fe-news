// src/components/NewsGrid.js
export const NewsGrid = (newsItems = [], isDarkMode = false) => {
  const gridCells = newsItems
    .map(
      (item) => `
    <div class="grid-cell border-default">
      <img src="${isDarkMode ? item.darkLogo : item.lightLogo}" alt="${
        item.name
      }">
    </div>
  `
    )
    .join("");

  return `
    <div class="grid-content">
      ${gridCells}
    </div>
  `;
};
