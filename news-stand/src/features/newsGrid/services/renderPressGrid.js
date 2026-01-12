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

  // DocumentFragment로 DOM 접근 최소화
  const fragment = document.createDocumentFragment();

  pressDataList.forEach((pressData) => {
    const pressItem = createPressItem(pressData);
    fragment.appendChild(pressItem);
  });

  // 기존 콘텐츠 제거 후 fragment 추가
  gridContainer.replaceChildren(fragment);
}
