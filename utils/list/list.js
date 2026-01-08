import { getCategories, getNewsByCategory } from "../../store/newsStore.js";
import { initListCategories } from "./listCategory.js";

let categories = null;

// 리스트 초기화
export function renderList({ container, data, page }) {
    container.innerHTML = '';   // 내부 요소 초기화
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작

    categories = getCategories();
    const category_container = initListCategories(categories);    // 뉴스 카테고리란 생성
    const temp = document.createElement('div');
    temp.id = 'news-list-container';
    temp.innerHTML = `${getNewsByCategory(categories[0])[0].mainTitle}`;
    // 작업중

    fragment.appendChild(category_container);   // 뉴스 카테고리 추가
    fragment.appendChild(temp);

    container.appendChild(fragment);
}

// 리스트 업데이트
// 1. 페이지를 넘길때
// 2. 카테고리를 선택할 때
// 3. 시간에 따라 다음 페이지로 넘어갈 때
// 4. 구독관리?
export function updateList({ container }) {
    container.innerHTML = '';
}