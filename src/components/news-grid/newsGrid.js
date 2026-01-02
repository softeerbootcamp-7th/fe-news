import { mapPngToUrls } from './iconUrlMapper.js';
import { store } from '../../store/index.js';

const ITEMS_PER_PAGE = 24; 

let pages = [];
let urls = [];
let pageContainer = null;
let prevBtn = null;
let nextBtn = null;

export const actions = {
  nextPage() {
    const state = store.getState();
    const totalPages = pages.length;
    if (state.currentPage < totalPages - 1) {
      store.dispatch('NEXT_PAGE');
    }
  },
  prevPage() {
    const state = store.getState();
    if (state.currentPage > 0) {
      store.dispatch('PREV_PAGE');
    }
  },
  toggleSubscribe(pressName) {
    const state = store.getState();
    const isSubscribed = state.subscribedIds.includes(pressName);
    if (isSubscribed) {
      store.dispatch('UNSUBSCRIBE', pressName);
    } else {
      store.dispatch('SUBSCRIBE', pressName);
    }
  },
};

function renderPage(pageIndex) {
  const page = pages[pageIndex] || [];
  const pageHtml = [];
  const state = store.getState();
  const subscribedIds = state.subscribedIds;

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const press = page[i];
    if (press) {
      const globalIndex = pageIndex * ITEMS_PER_PAGE + i;
      const url = urls[globalIndex];
      const isSubscribed = subscribedIds.includes(press.name);
      const plusIcon = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z" fill="currentColor"/></svg>';
      const crossIcon = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z" fill="currentColor"/></svg>';
      pageHtml.push(`
        <div class="news-grid-item" data-press-name="${press.name}">
          <img src="${url}" alt="${press.name}" class="news-grid-logo" />
          <button class="news-grid-subscribe-btn ${isSubscribed ? 'is-subscribed' : ''}" 
                  data-press-name="${press.name}"
                  aria-label="${isSubscribed ? '구독 취소' : '구독하기'}">
            ${isSubscribed ? `${crossIcon}구독해지` : `${plusIcon}구독하기`}
          </button>
        </div>
      `);
    } else {
      pageHtml.push(`
        <div class="news-grid-item"></div>
      `);
    }
  }

  return pageHtml.join('');
}

function updateButtonVisibility(currentPage, totalPages) {
  if (prevBtn) {
    prevBtn.disabled = currentPage === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages - 1;
  }
}

function attachSubscribeHandlers() {
  if (!pageContainer) return;
  
  const subscribeButtons = pageContainer.querySelectorAll('.news-grid-subscribe-btn');
  subscribeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const pressName = button.getAttribute('data-press-name');
      if (pressName) {
        actions.toggleSubscribe(pressName);
      }
    });
  });
}

export function renderNewsGrid(pressList, container, theme = 'auto') {
  const containerElement = document.querySelector(container);

  const pngNames = pressList.map((press) => press.pngName);
  urls = mapPngToUrls(pngNames, theme);

  // 페이지 분할
  pages = [];
  for (let i = 0; i < pressList.length; i += ITEMS_PER_PAGE) {
    pages.push(pressList.slice(i, i + ITEMS_PER_PAGE));
  }

  // 초기 HTML 렌더링
  const initialHtml = `
    <div class="news-grid-page">
      ${renderPage(0)}
    </div>
  `;

  containerElement.className = 'news-grid-container';
  containerElement.innerHTML = initialHtml;

  pageContainer = containerElement.querySelector('.news-grid-page');
  
  // 초기 구독 버튼 이벤트 핸들러 연결
  attachSubscribeHandlers();

  if (pages.length > 1) {
    const controlsHtml = `
      <button class="news-grid-prev" aria-label="이전 페이지">
        <img src="./src/icons/icon-left-arrow.svg" alt="이전" />
      </button>
      <button class="news-grid-next" aria-label="다음 페이지">
        <img src="./src/icons/icon-right-arrow.svg" alt="다음" />
      </button>
    `;

    const parentElement = containerElement.parentElement;
    if (parentElement) {
      parentElement.style.position = 'relative';
      parentElement.insertAdjacentHTML('beforeend', controlsHtml);
    }

    prevBtn = parentElement
      ? parentElement.querySelector('.news-grid-prev')
      : null;
    nextBtn = parentElement
      ? parentElement.querySelector('.news-grid-next')
      : null;

    // Store 구독: 상태가 바뀌면 화면 갱신
    store.subscribe(() => {
      const state = store.getState();
      const { currentPage } = state;
      
      if (pageContainer) {
        pageContainer.innerHTML = renderPage(currentPage);
        attachSubscribeHandlers();
      }
      updateButtonVisibility(currentPage, pages.length);
    });


    if (prevBtn) {
      prevBtn.addEventListener('click', () => actions.prevPage());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => actions.nextPage());
    }

    // 초기 버튼 상태 설정
    const initialState = store.getState();
    updateButtonVisibility(initialState.currentPage, pages.length);
  }
}
