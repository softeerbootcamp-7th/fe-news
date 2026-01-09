import { GRID } from '../../../constants/grid.js';
import { createNewsSubscribeStore } from '../../../store/newsSubscribeStore/newsSubscribeStore.js';
import {
  appendChildren,
  createElement,
  createImageElement,
  createSpanElement,
} from '../helpers.js';

// 싱글톤 store 생성
const subscribeStore = createNewsSubscribeStore();

/**
 * 개별 언론사 아이템 UI 컴포넌트
 */
export function createPressItem(pressData) {
  const { logo, press } = pressData;

  // 아이템 컨테이너 생성
  const item = createElement('div', 'news-item');

  // 이미지 생성
  const img = createImageElement(logo, press);

  // 구독 버튼 생성
  const subscribeBtn = createElement('button', 'subscribe-btn');
  const icon = createSpanElement('btn-icon');
  const text = createSpanElement('btn-text');

  // 버튼에 자식 요소 추가
  appendChildren(subscribeBtn, [icon, text]);

  // 구독 상태에 따라 UI 업데이트
  function updateSubscribeBtn() {
    const isSubscribed = subscribeStore.has(press);
    icon.textContent = isSubscribed ? GRID.UNSUBSCRIBE_ICON : GRID.SUBSCRIBE_ICON;
    text.textContent = isSubscribed ? GRID.UNSUBSCRIBE_BTN : GRID.SUBSCRIBE_BTN;
    subscribeBtn.classList.toggle('subscribed', isSubscribed);
  }

  // 초기 상태 설정
  updateSubscribeBtn();

  // 클릭 이벤트: 구독 토글
  subscribeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    subscribeStore.toggle(press);
    updateSubscribeBtn();
  });

  // 아이템에 자식 요소들 추가
  appendChildren(item, [img, subscribeBtn]);

  return item;
}
