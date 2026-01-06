import { createPressItem } from '../components/PressItem.js';

/**
 * 언론사 그리드 렌더링
 */
export function renderPressGrid(pressDataList) {
  const gridContainer = document.querySelector('.news-grid');

  if (!gridContainer) {
    console.error('news-grid 요소를 찾을 수 없습니다');
    return;
  }

  gridContainer.innerHTML = '';

  pressDataList.forEach((pressData) => {
    const pressItem = createPressItem(pressData);
    gridContainer.appendChild(pressItem);
  });
}
