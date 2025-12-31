import "./AutoRollingNews.css";

export function AutoRollingNews(
  press = "언론사",
  newsTitle = "기사 제목이 들어갑니다. 기사 제목이 들어갑니다"
) {
  return `
    <article class="auto-rolling-news">
        <a class="press-company">${press}</a>
        <a class="news-title">${newsTitle}</a>
    </article>
    `;
}
