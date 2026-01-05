import { presses } from '../../data/presses.js';
import { getSubscribedPresses } from '../subscription/subscriptionStore.js';

import { updateView } from '../updateView.js';
import { movePrev } from '../page/movePrevPage.js';
import { moveNext } from '../page/moveNextPage.js';

const ITEMS_PER_PAGE = 24;

let currentPage = 0;
let currentData = presses;

let grid, prevBtn, nextBtn;


export function initGrid({ viewId, prevBtnId, nextBtnId }) {
  grid = document.getElementById(viewId);
  prevBtn = document.getElementById(prevBtnId);
  nextBtn = document.getElementById(nextBtnId);

  prevBtn.addEventListener('click', () => {
    currentPage = movePrev(currentPage);
    updateView({
      type: "GRID",
      view: grid,
      currentPage: currentPage,
      currentData: currentData
    });
  })
  nextBtn.addEventListener('click', () => {
    currentPage = moveNext(currentPage, ITEMS_PER_PAGE, currentData.length);
    updateView({
      type: "GRID",
      view: grid,
      currentPage: currentPage,
      currentData: currentData,
      itemCount: ITEMS_PER_PAGE
    });
  })

  // 구독 상태 변경 시 그리드 즉시 갱신
  document.addEventListener('subscription-change', () => {
    // 현재 "구독 탭"을 보고 있는 경우에만 다시 그림
    if (currentData !== presses) {
      currentPage = 0;
      currentData = getSubscribedPresses();
      updateView({
        type: "GRID",
        view: grid,
        currentPage: currentPage,
        currentData: currentData,
       itemCount: ITEMS_PER_PAGE
      });
    }
  });

  updateView({
    type: "GRID",
    view: grid,
    currentPage: currentPage,
    currentData: currentData,
    itemCount: ITEMS_PER_PAGE
  });
}

export function setGridData(data) {
  currentPage = 0;      // 페이지를 0으로 설정
  currentData = data;   // 렌더링할 데이터 설정

  // 그리드 업데이트
  updateView({
    type: "GRID",
    view: grid,
    currentPage: currentPage,
    currentData: currentData,
    itemCount: ITEMS_PER_PAGE
  });
}


// function updateView() {

//   renderGrid({
//     container: grid,
//     data: currentData,
//     page: currentPage
//   });

//   // 페이지 버튼 숨김처리
//   prevBtn.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
//   nextBtn.style.visibility =
//     (currentPage + 1) * ITEMS_PER_PAGE >= currentData.length
//       ? 'hidden'
//       : 'visible';
// }