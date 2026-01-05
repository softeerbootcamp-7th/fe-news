/**
 * data-svg 속성을 가진 모든 DOM 요소를 찾아 해당 경로에서 SVG를 가져와
 * 요소의 `innerHTML`을 SVG 마크업으로 채우는 함수
 *
 * @function loadSVG
 * @returns {void}
 */
export function loadSVG() {
  document.querySelectorAll("[data-svg]").forEach(el => {
    fetch(el.dataset.svg)
      .then(res => res.text())
      .then(svg => {
        el.innerHTML = svg;
      });
  });
}
