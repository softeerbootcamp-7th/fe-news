import pressData from "../data/pressData.json";

export const PRESS_CATEGORIES = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

// Function to get rolling data
export const getRollingData = ({ left, right }) => {
  const filteredPressData = pressData
    .filter((item) => item.relatedArticles?.length > 0)
    .map((p) => ({
      pressName: p.press,
      title: p.relatedArticles[0].title,
      url: p.relatedArticles[0].link,
    }));

  return [
    filteredPressData.slice(0, left),
    filteredPressData.slice(left, left + right),
  ];
};

export const getGridData = () => {
  return pressData.map((p) => ({
    pressName: p.press,
    icon: p.logo,
  }));
};

/**
 * @param {Array} list pressMockData.json
 * @returns {Record<string, {totalPage: number, presses: Record<string, any>}>}
 */
export const groupPressByCategory = (list) => {
  return list.reduce((acc, item) => {
    const category = item.category ?? "기타";
    const pressName = item.press ?? "알수없음";

    const totalPage = Number.parseInt(item.totalPage, 10);
    if (!acc[category]) {
      acc[category] = {
        totalPage,
        presses: [],
      };
    } else {
      acc[category].totalPage = Math.max(acc[category].totalPage, totalPage);
    }

    acc[category].presses.push({ ...item });

    return acc;
  }, {});
};
