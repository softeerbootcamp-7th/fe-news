import { fetchLatestNews } from './services/fetchLatestNews.js';
import { manageNewsState } from './services/manageNewsState.js';
import { renderInitialCards } from './services/renderInitialCards.js';
import { startCardRolling } from './services/startCardRolling.js';

/**
 * 최신 뉴스 렌더링 (Entry point)
 */
export async function renderLatestNews() {
  try {
    const newsData = await fetchLatestNews(10);

    if (newsData.length < 2) {
      console.error('뉴스 데이터가 부족합니다 (최소 2개 필요)');
      return;
    }

    manageNewsState.init(newsData);
    const initialNews = manageNewsState.getInitialNews();

    renderInitialCards(initialNews);
    startCardRolling(manageNewsState);
  } catch (error) {
    console.error(' 뉴스 초기화 실패:', error);
  }
}
