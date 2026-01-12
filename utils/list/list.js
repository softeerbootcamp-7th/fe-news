import { getCategories, getNewsByCategory } from "../../store/newsStore.js";
import { initListCategories } from "./listCategory.js";
import { initListContent, updateListContent } from "./listContent.js";

let categories = null;

// 리스트 초기화
export function renderList({ container, data, page }) {
    container.innerHTML = '';   // 내부 요소 초기화
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작

    categories = getCategories();
    const category_container = initListCategories(categories);    // 뉴스 카테고리란 생성
    const content_wrapper = document.createElement('div');
    content_wrapper.className = 'list-content-wrapper';
    content_wrapper.id = 'list-content-wrapper';
    const content_container = initListContent();
    // 작업중

    content_wrapper.appendChild(content_container);
    fragment.appendChild(category_container);   // 뉴스 카테고리 추가
    fragment.appendChild(content_wrapper);

    container.appendChild(fragment);
}

// 리스트 업데이트
// 1. 페이지를 넘길때
// 2. 카테고리를 선택할 때
// 3. 시간에 따라 다음 페이지로 넘어갈 때
// 4. 구독관리?
export function updateList({ container, data, page}) {
    // page가 뉴스 인덱스가 될 예정 > 이걸로 카테고리 데이터도 추출 가능
    container.innerHTML = ''; // 초기화 과정은 불필요하지 않을까? 안에 내용만 변경하도록?

    const fragment = document.createDocumentFragment();
    const updated_content = updateListContent({ data, page});
    fragment.appendChild(updated_content);
    container.appendChild(fragment);
}