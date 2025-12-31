import { createLatestNewsCardElement } from './components/NewsCard.js';
import { getLatestNews } from './services/latestNewsService.js';
import './style.css';

let latestNews = [];
let currentIndex = 0;

/*
    초기 뉴스 로드
*/
function renderInitialCards() {
  const container = document.getElementById('news-container');

  if (!container) {
    console.error('news-container를 찾을 수 없습니다');
    return;
  }

  // 카드 컨테이너 생성
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'cards-wrapper';

  // 첫 2개 카드 DOM 생성
  const card1 = createLatestNewsCardElement(1, latestNews[0]);
  const card2 = createLatestNewsCardElement(2, latestNews[1]);

  cardsWrapper.appendChild(card1);
  cardsWrapper.appendChild(card2);
  container.appendChild(cardsWrapper);

  currentIndex = 2; // 다음 표시할 인덱스
}

/**
 * 초기 뉴스 로드
 */
async function initLatestNews() {
  try {
    latestNews = await getLatestNews(10);

    if (latestNews.length < 2) {
      console.error('뉴스 데이터가 부족합니다 (최소 2개 필요)');
      return;
    }

    console.log('뉴스 데이터 로드 완료:', latestNews);

    // 초기 카드 렌더링
    renderInitialCards();
  } catch (error) {
    console.error('뉴스 초기화 실패:', error);
  }
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', initLatestNews);
