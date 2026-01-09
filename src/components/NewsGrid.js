export const NewsGrid = ({ pressList = [], isDarkMode = false }) => {
  const gridCells = pressList
    .map(
      (item) => `
    <div class="flex items-center justify-center border-b-r"
        data-press-id="${item.id}">
      <img src="${isDarkMode ? item.darkLogo : item.lightLogo}" alt="${
        item.name
      }">
    </div>
  `
    )
    .join("");

  return `
    <div class="grid gap-0 grid-cols-6 grid-rows-4 mt-6 w-930 h-97 border-t-l">
      ${gridCells}
    </div>
  `;
};
