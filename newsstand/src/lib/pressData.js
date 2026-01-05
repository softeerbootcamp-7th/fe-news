import pressData from "../data/pressData.json";

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
