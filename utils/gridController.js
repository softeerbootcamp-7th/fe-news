import { presses } from '../data/presses.js';
import { renderGrid } from './grid.js';
import { getSubscribedPresses } from './subscriptionStore.js';

const ITEMS_PER_PAGE = 24;

let currentPage = 0;
let currentData = presses;

let grid, prevBtn, nextBtn;

export function initGrid({ gridId, prevBtnId, nextBtnId }) {
  grid = document.getElementById(gridId);
  prevBtn = document.getElementById(prevBtnId);
  nextBtn = document.getElementById(nextBtnId);

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateView();
    }
  });

  nextBtn.addEventListener('click', () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < currentData.length) {
      currentPage++;
      updateView();
    }
  });

  // 구독 상태 변경 시 그리드 즉시 갱신
  document.addEventListener('subscription-change', () => {
    // 현재 "구독 탭"을 보고 있는 경우에만 다시 그림
    if (currentData !== presses) {
      currentPage = 0;
      currentData = getSubscribedPresses();
      updateView();
    }
  });

  updateView();
}

export function setGridData(data) {
  currentPage = 0;      // 페이지를 0으로 설정
  currentData = data;   // 렌더링할 데이터 설정
  updateView();         // 그리드 업데이트
}

function updateView() {
  renderGrid({
    container: grid,
    data: currentData,
    page: currentPage
  });

  prevBtn.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
  nextBtn.style.visibility =
    (currentPage + 1) * ITEMS_PER_PAGE >= currentData.length
      ? 'hidden'
      : 'visible';
}
