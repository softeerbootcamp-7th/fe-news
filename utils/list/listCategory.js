import { loadNews, getCategories } from "../../store/newsStore.js";

export function initNewsCategories() {
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작
    
    // 뉴스 카테고리를 담을 컨테이너 생성
    const category_container = document.createElement('ul');
    category_container.className = 'category-container';

    // fetch로 뉴스 로드 시도(비동기방식) > 성공 시 카테고리 분류 작업 > 분류 후 컨테이너에 추가
    loadNews().then(() => {
        const categories = getCategories(); // 카테고리 배열 불러오기
        
        for (let i = 0; i < categories.length; i++) {   // 각 카테고리 탭 생성
            const cell = document.createElement('li');
            cell.className = 'news-category';
            cell.id = `category-${toSlug(categories[i])}`;
            cell.innerHTML = categories[i];

            fragment.appendChild(cell); // fragment에 생성된 카테고리 추가
        }
        category_container.appendChild(fragment);   // 컨테이너에 fragment 추가
    });
    
    return category_container;  // 컨테이너 반환
}

// 카테고리id 지정하기 전에 정리
function toSlug(text) {
    return text
        .toLowerCase()
        .replace(/\+s/g, '-')           // 공백 제거
        .replace(/[^\w\-가-힣]/g, '');  // 특수문자 제거
}