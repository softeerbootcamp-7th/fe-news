import { VIEW_TAB, CATEGORY_LIST } from "@/types/constant";

export function formatDate(datetime) {
  // 2026. 01. 08. 목요일
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  return new Intl.DateTimeFormat("ko-KR", options).format(datetime);
}

function parseDatetimeString(text, baseDate = new Date()) {
  // 01월 07일 10:28 직접 편집
  const regex = /(\d{2})월\s*(\d{2})일\s*(\d{2}):(\d{2})/;
  const match = text.match(regex);

  if (!match) return null;

  const [, month, day, hour, minute] = match.map(Number);
  const year = baseDate.getFullYear();

  return new Date(year, month - 1, day, hour, minute);
}

function formateDatetime(datetime) {
  // 2026.01.07. 10:28
  const pad = (n) => String(n).padStart(2, "0");

  return `${datetime.getFullYear()}.${pad(datetime.getMonth() + 1)}.${pad(
    datetime.getDate()
  )}. ${pad(datetime.getHours())}:${pad(datetime.getMinutes())}`;
}

export function parsePressData(rawData) {
  return rawData.map((item, index) => {
    const {
      category,
      totalPage,
      logo,
      darkLogo,
      press,
      time,
      mainTitle,
      mainLink,
      mainImg,
      relatedArticles,
    } = item;
    return {
      id: index,
      category,
      totalPage,
      logo,
      darkLogo,
      name: press,
      time: formateDatetime(parseDatetimeString(time)),
      mainNews: {
        title: mainTitle,
        thumbnail: mainImg,
        link: mainLink,
      },
      subNews: relatedArticles,
    };
  });
}

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

export function parseCategoryIndex(shuffledPressData, currentPage) {
  let currentCategory = shuffledPressData[currentPage].category;
  let lastPrevCategoryIndex = -1;
  for (let i = currentPage; i >= 0; i--) {
    if (shuffledPressData[i].category !== currentCategory) {
      lastPrevCategoryIndex = i;
      break;
    }
  }
  return currentPage - lastPrevCategoryIndex - 1;
}

export function parseFirstPageInCategory(shuffledPressData, categoryName) {
  for (let i = 0; i < shuffledPressData.length; i++) {
    if (shuffledPressData[i].category === categoryName) return i;
  }
}

// export function parsePressData(rawData) {
//   const categoryMap = new Map(); // 빠른 검색
//   rawData.forEach((item) => {
//     const {
//       category,
//       totalPage,
//       logo,
//       press,
//       time,
//       mainTitle,
//       mainLink,
//       mainImg,
//       relatedArticles,
//     } = item;

//     // 카테고리 단위 생성
//     if (!categoryMap.has(category)) {
//       categoryMap.set(category, {
//         category,
//         pressCount: totalPage,
//         pressList: [],
//       });
//     }

//     // 카테고리 맵에 언론사 추가
//     const pressItem = {
//       id: index,
//       logo,
//       name: press,
//       time,
//       mainNews: {
//         title: mainTitle,
//         thumbnail: mainImg,
//         link: mainLink,
//       },
//       subNews: relatedArticles,
//     };
//     categoryMap.get(category).pressList.push(pressItem);

//     return Array.from(categoryMap.values());
//   });
// }
