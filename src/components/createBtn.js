import { loadSVG } from "../utils/lodeSVG";

/**
 * 공통 스타일이 적용된 버튼 컴포넌트를 생성하는 함수
 * 
 * @param {string} color
 * @param {'plus' | 'closed'} iconName
 * @param {string} text
 * @param {string} className
 * @param {Function} onClick
 */
export function createBtn(color = 'white', iconName = 'plus', text, className, onClick) {
    const button = document.createElement('button');
    button.className = `btn btn-${color} ${className}`;

    if (!iconName) return button;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'btn-icon';
    iconSpan.setAttribute('data-svg', `./public/assets/icons/${iconName}.svg`);
    button.appendChild(iconSpan);

    if (text) {
        const textSpan = document.createElement('span');
        textSpan.className = 'btn-text available-medium12';
        textSpan.textContent = text;
        button.appendChild(textSpan);
    }

    if (onClick) {
        button.addEventListener('click', (e) => {
        e.stopPropagation();
        onClick(button);
        });
    }

    loadSVG();
    return button;
}