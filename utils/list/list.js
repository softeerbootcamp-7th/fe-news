import { initNewsCategories } from "./listCategory.js";

export function renderList({ container, data, page }) {
    container.innerHTML = '';   // 내부 요소 초기화
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작

    const category_container = initNewsCategories(data);    // 뉴스 카테고리란 생성
    const temp = document.createElement('div');
    temp.innerHTML = "temp";
    
    fragment.appendChild(category_container);   // 뉴스 카테고리 추가
    fragment.appendChild(temp);

    container.appendChild(fragment);
}