/**
 * 뉴스 카드 컴포넌트
 * 언론사명과 기사 제목을 표시하는 카드 생성
 */

/**
 * 뉴스 카드 생성 함수
 */
export function createLatestNewsCardElement(cardNum, news = {}) {
  const { press = '언론사', mainTitle = '뉴스 제목' } = news;

  const card = document.createElement('div');
  card.className = 'news-card';
  card.id = `news-card-${cardNum}`;

  const content = document.createElement('div');
  content.className = 'card-content';

  const sourceEl = document.createElement('span');
  sourceEl.className = 'card-source';
  sourceEl.id = `card-source-${cardNum}`;
  sourceEl.textContent = press;

  const titleEl = document.createElement('h3');
  titleEl.className = 'card-title';
  titleEl.id = `card-title-${cardNum}`;
  titleEl.textContent = mainTitle;

  content.appendChild(sourceEl);
  content.appendChild(titleEl);
  card.appendChild(content);

  return card;
}

export function updateLatestNewsCard(cardNum, news) {
  if (!news) return;

  const sourceEl = document.getElementById(`card-source-${cardNum}`);
  const titleEl = document.getElementById(`card-title-${cardNum}`);

  if (sourceEl) sourceEl.textContent = news.press;
  if (titleEl) titleEl.textContent = news.mainTitle;
}
