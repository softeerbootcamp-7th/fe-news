import { initHeader } from "@/feature/header/header";
import { LatestNewsView } from "@/feature/latest-news/latestNews.js";
import { initPressView } from "@/feature/press/press";
import { initTheme } from "@/feature/header/theme";

initApp();

function initApp() {
  // 다크모드 테마
  initTheme();

  // 기본 상단 영역
  initHeader();

  // 뉴스 콘텐츠 영역
  initNews();
}

function initNews() {
  // 데이터 fetch
  fetch("./src/assets/dummy/articlesData.json")
    .then((response) => response.json())
    .then((articlesData) => {
      // 뉴스 자동 롤링
      const latestNewsView = new LatestNewsView();
      latestNewsView.initLatestNews(articlesData);

      // 그리드/리스트 영역
      initPressView(articlesData);

      return articlesData;
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(
        ".newsstand-main"
      ).innerHTML = `<span>데이터를 불러오는 중 오류가 발생했습니다.</span>`;
    });
}
