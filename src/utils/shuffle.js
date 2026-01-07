import { VIEW_TAB, CATEGORY_LIST } from "@/types/constant";

export function shufflePressData(viewTab, pressData) {
  switch (viewTab) {
    case VIEW_TAB.GRID:
      return shuffleArray(pressData);
    case VIEW_TAB.LIST:
      return shufflePressDataByCategory(pressData);
  }
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
function shufflePressDataByCategory(pressData) {
  const categoryOrder = Object.values(CATEGORY_LIST);

  const categoryMap = pressData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return categoryOrder.flatMap((category) =>
    shuffleArray(categoryMap[category] ?? [])
  );
}
