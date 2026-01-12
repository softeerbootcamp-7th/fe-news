/**
 * DOM 요소를 생성하는 헬퍼 함수
 * @param {string} tag - HTML 태그명 (예: 'div', 'span', 'button')
 * @param {string|null} className - CSS 클래스명
 * @param {Object} attributes - 설정할 속성들 (예: { src: '...', alt: '...' })
 * @returns {HTMLElement} 생성된 DOM 요소
 */
export function createElement(tag, className = null, attributes = {}) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value;
  });

  return element;
}

/**
 * 이미지 요소를 생성하는 헬퍼 함수
 * @param {string} src - 이미지 경로
 * @param {string} alt - 대체 텍스트
 * @returns {HTMLElement} 생성된 img 요소
 */
export function createImageElement(src, alt) {
  return createElement('img', null, { src, alt });
}

/**
 * 버튼 요소를 생성하는 헬퍼 함수
 * @param {string} className - CSS 클래스명
 * @param {HTMLElement[]} children - 버튼 내부에 추가할 자식 요소들
 * @returns {HTMLElement} 생성된 button 요소
 */
export function createButtonElement(className, children = []) {
  const button = createElement('button', className);
  children.forEach(child => button.appendChild(child));
  return button;
}

/**
 * span 요소를 생성하는 헬퍼 함수
 * @param {string} className - CSS 클래스명
 * @param {string} textContent - 텍스트 내용
 * @returns {HTMLSpanElement} 생성된 span 요소
 */
export function createSpanElement(className, textContent = '') {
  const span = createElement('span', className);
  if (textContent) {
    span.textContent = textContent;
  }
  return span;
}

/**
 * 여러 자식 요소를 부모 요소에 추가하는 헬퍼 함수
 * @param {HTMLElement} parent - 부모 요소
 * @param {HTMLElement[]} children - 추가할 자식 요소들
 * @returns {HTMLElement} 부모 요소 (체이닝용)
 */
export function appendChildren(parent, children) {
  children.forEach(child => parent.appendChild(child));
  return parent;
}
