/**
 * 개별 언론사 아이템 UI 컴포넌트
 */
export function createPressItem(pressData) {
  const { logo, press } = pressData;

  const item = document.createElement('div');
  item.className = 'news-item';

  const img = document.createElement('img');
  img.src = logo;
  img.alt = press;

  item.appendChild(img);

  return item;
}
