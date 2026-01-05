import { createBtn } from "./createBtn";
import { handleSubscribe } from "./subscribePress";

const LOGO_COUNT = 24;

export function getLogos(dir, count = LOGO_COUNT) {
  return Array.from({ length: count }, (_, i) =>
    `public/assets/logos/${dir}/press_logo_${String(i + 1).padStart(3, "0")}.png`
  );
}

export const lightModeLogos = getLogos('light_mode_logo');
export const darkModeLogos = getLogos('dark_mode_logo');
/**
 * 컨테이너에 li, img 요소를 생성하여 로고 이미지를 렌더링합니다.
 *
 * @function renderLogos
 * @param {string} containerSelector - 이미지를 추가할 컨테이너의 CSS 선택자
 * @param {string[]} pressLogos - 로고 이미지 경로 배열
 * @returns {void}
 */
export function renderLogos(containerSelector, pressLogos) {
  const container = document.querySelector(containerSelector);
  pressLogos.forEach((src) => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.className = 'press-logo-img';
    img.src = src;
    img.alt = '언론사 로고';
    li.appendChild(img);

    const subscribeBtn = createBtn('white', 'plus', '구독하기', 'subscribeBtn', handleSubscribe);
    li.appendChild(subscribeBtn);

    subscribeBtn.style.display = 'none';
    li.addEventListener('mouseover', () => {
      img.style.display = 'none';
      subscribeBtn.style.display = 'flex';
    });
    li.addEventListener('mouseleave', () => {
      img.style.display = 'block';
      subscribeBtn.style.display = 'none';
    });

    container.appendChild(li);
  });
}