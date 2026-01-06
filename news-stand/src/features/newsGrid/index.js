import { fetchPressData } from '../../api/pressDataApi.js';
import { managePressState } from './services/managePressState.js';
import { renderPressGrid } from './services/renderPressGrid.js';

/**
 * newsGrid 기능 초기화
 */
export async function initNewsGrid() {
  try {
    const pressData = await fetchPressData();

    if (pressData.length === 0) {
      console.error('언론사 데이터가 없습니다');
      return;
    }

    managePressState.init(pressData);

    managePressState.subscribe((pageData) => {
      renderPressGrid(pageData);
    });

    renderPressGrid(managePressState.getCurrentPageData());

    setupNavigationButtons();
  } catch (error) {
    console.error('newsGrid 초기화 실패:', error);
  }
}

function setupNavigationButtons() {
  const prevButton = document.querySelector('.news-grid-wrapper .nav-button.prev');
  const nextButton = document.querySelector('.news-grid-wrapper .nav-button.next');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      managePressState.prevPage();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      managePressState.nextPage();
    });
  }
}
