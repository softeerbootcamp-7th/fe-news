export function parseDateString(datetime) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const formatted = new Intl.DateTimeFormat("ko-KR", options).format(datetime);

  return formatted;
}

export function parsePressData(rawData) {
  return rawData.map((item, index) => {
    const {
      category,
      totalPage,
      logo,
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
      name: press,
      time,
      mainNews: {
        title: mainTitle,
        thumbnail: mainImg,
        link: mainLink,
      },
      subNews: relatedArticles,
    };
  });
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
