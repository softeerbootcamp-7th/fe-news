import { presses } from '../../data/presses.js';
import { getSubscribedPresses } from '../subscription/subscriptionStore.js';
import { updateView } from '../updateView.js';

const ITEMS_PER_PAGE = 24;

let currentPage = 0;
let currentData = presses;

let grid, prevBtn, nextBtn;
let isEventBound = false;

/* 이벤트는 1번만 */
export function initGridEvents({ viewId, prevBtnId, nextBtnId }) {
  if (isEventBound) return;
  isEventBound = true;

  grid = document.getElementById(viewId);
  prevBtn = document.getElementById(prevBtnId);
  nextBtn = document.getElementById(nextBtnId);

  document.addEventListener('subscription-change', () => {
    if (currentData !== presses) {
      currentPage = 0;
      currentData = getSubscribedPresses();
      render();
    }
  });

  render();
}

/* GRID 탭을 열 때마다 호출 */
export function showGrid() {
  if (!grid) return;
  currentPage = 0;
  render();
}

export function handleGridPrev() {
  if (currentPage === 0) return;
  currentPage--;
  render();
}

export function handleGridNext() {
  const maxPage = Math.ceil(currentData.length / ITEMS_PER_PAGE) - 1;
  if (currentPage >= maxPage) return;
  currentPage++;
  render();
}

function render() {
  updateView({
    type: "GRID",
    view: grid,
    currentPage,
    currentData,
    itemCount: ITEMS_PER_PAGE
  });
}

export function setGridData(data) {
  currentPage = 0;
  currentData = data;
  render();
}