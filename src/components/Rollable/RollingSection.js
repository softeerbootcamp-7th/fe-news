import "./AutoRollingNews.css";
import { AutoRollingNews } from "./AutoRollingNews.js";

export function RollingSection() {
  return `<section class="auto-rolling-news-section">
    ${AutoRollingNews()}
    ${AutoRollingNews()}
  </section>`;
}
