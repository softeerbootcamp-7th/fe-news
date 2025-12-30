// src/components/RollingNews.js
export const RollingNews = (
  newsItems = [
    {
      title: "연합뉴스",
      content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
    {
      title: "서울경제",
      content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
  ]
) => {
  const newsHtml = newsItems
    .map(
      (item) => `
    <div class="rolling-news-content">
      <span class="display-bold14 title">${item.title}</span>
      <span class="display-medium14">${item.content}</span>
    </div>
  `
    )
    .join("");

  return `
    <section class="flex-gap-8">
      ${newsHtml}
    </section>
  `;
};
