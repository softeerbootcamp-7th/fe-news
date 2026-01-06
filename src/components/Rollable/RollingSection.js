import "./AutoRollingNews.css";

import { AutoRollingNews } from "./AutoRollingNews.js";
import { rollingArticles } from "../../store/index.js";
import { makeNode } from "../../utils/utils.js";

export function RollingSection() {
  const $el = makeNode(`
    <section class="auto-rolling-news-section">
      <div class="auto-rolling-news-wrapper first">
        ${rollingArticles
          .slice(0, 5)
          .map((article) => AutoRollingNews(article.press, article.newsTitle))
          .join("")}
          ${AutoRollingNews(
            rollingArticles[0].press,
            rollingArticles[0].newsTitle
          )}
      </div>
      <div class="auto-rolling-news-wrapper second">
        ${rollingArticles
          .slice(5, 10)
          .map((article) => AutoRollingNews(article.press, article.newsTitle))
          .join("")}
          ${AutoRollingNews(
            rollingArticles[5].press,
            rollingArticles[5].newsTitle
          )}
      </div>
    </section>
  `);

  return $el;
}
