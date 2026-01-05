export const lightModeLogos = Array.from({ length: 24 }, (_, i) => 
  `public/assets/logos/light_mode_logo/press_logo_${String(i + 1).padStart(3, "0")}.png`
);

export const darkModeLogos = Array.from({ length: 24 }, (_, i) => 
  `public/assets/logos/dark_mode_logo/press_logo_${String(i + 1).padStart(3, "0")}.png`
);

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
    img.src = src;
    img.alt = '언론사 로고';
    li.appendChild(img);
    container.appendChild(li);
  });
}