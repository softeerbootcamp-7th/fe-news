import { loadSVG } from "../utils/lodeSVG";

/**
 * 구독 버튼의 상태를 토글하고 UI를 업데이트합니다.
 * 
 * @param {HTMLElement} button - 구독 버튼 요소
 * @returns {void}
 */
export function handleSubscribe(button) {
  const icon = button.querySelector('.btn-icon');
  const text = button.querySelector('.btn-text');

  const isSubscribed = button.classList.contains('subscribed');

  if (!isSubscribed) {
    // 구독 상태로 변경
    button.classList.add('subscribed');
    button.classList.remove('btn-white');
    button.classList.add('btn-grey');

    text.textContent = '해지하기';
    icon.dataset.svg = './public/assets/icons/closed.svg';
  } else {
    // 구독 해제
    button.classList.remove('subscribed');
    button.classList.remove('btn-grey');
    button.classList.add('btn-white');

    text.textContent = '구독하기';
    icon.dataset.svg = './public/assets/icons/plus.svg';
  }

  loadSVG();
}
