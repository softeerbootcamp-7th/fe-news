/**
 * 최신 뉴스 카드 생성 함수
 *  이벤트가 등록되는 card 는 createElement로 만들고, 내부는 innerHTML 로 한번에 dom 요소 생성
 */
export function createLatestNewsCard(cardNum, news = {}) {
  const { press = '언론사', mainTitle = '뉴스 제목' } = news;

  const card = document.createElement('div');
  card.className = 'news-card';
  card.id = `news-card-${cardNum}`;

  card.innerHTML = `
    <div class="card-content">
      <div class="card-source" id="card-source-${cardNum}">${press}</div>
      <div class="card-title" id="card-title-${cardNum}">${mainTitle}</div>
    </div>
  `;

  return card;
}

/**
 * 뉴스 카드 내용 업데이트
 */
export function updateLatestNewsCard(cardNum, news) {
  if (!news) return;

  const sourceEl = document.getElementById(`card-source-${cardNum}`);
  const titleEl = document.getElementById(`card-title-${cardNum}`);

  if (sourceEl) sourceEl.textContent = news.press;
  if (titleEl) titleEl.textContent = news.mainTitle;
}
