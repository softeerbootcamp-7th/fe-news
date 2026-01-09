import { getNewsByCategory, findFirstPage } from "../../store/newsStore.js";
import { getNewsDuration, updatePage } from "./listController.js";

export function initListCategories(categories) {
    const fragment = document.createDocumentFragment(); // DOM 한번만 조작
    
    // 뉴스 카테고리를 담을 컨테이너 생성
    const category_container = document.createElement('ul');
    category_container.className = 'category-container';

    for (let i = 0; i < categories.length; i++) {   // 각 카테고리 탭 생성
        const cell = document.createElement('li');
        cell.className = 'news-category available-medium14';
        cell.id = `category-${categories[i]}`;

        // 상태 바
        const progress_bar = document.createElement('span');
        progress_bar.className = 'progress-bar';
        cell.appendChild(progress_bar);

        // 카테고리 종류 텍스트
        const cateName = document.createElement('div');
        cateName.classList = 'news-category-text';
        cateName.innerHTML = categories[i];
        cell.appendChild(cateName);
        
        // 각 카테고리 클릭 시
        cell.addEventListener('click', () => {
            selectCategory(categories[i]);
        });

        // 초기 렌더 시 첫번째 카테고리가 자동으로 활성화상태
        if (i == 0) {
            cell.classList.toggle('available-medium14');
            cell.classList.toggle('active');
            cell.classList.toggle('selected-bold14');

            let bar = cell.querySelector('.progress-bar');            
            bar.style.animation = `fillProgress ${getNewsDuration()/1000}s linear forwards`

            let count = document.createElement('div');
            count.className = `cate-count`;
            count.innerHTML = `1/${getNewsByCategory(categories[i]).length}`;
            cell.appendChild(count);
        }
        
        fragment.appendChild(cell); // fragment에 생성된 카테고리 추가
    }
    category_container.appendChild(fragment);   // 컨테이너에 fragment 추가
    
    return category_container;  // 컨테이너 반환
}

// 카테고리 선택 시 렌더링
function selectCategory(category) {
    let currentPage = findFirstPage(category);
    updatePage(currentPage);
}

// // 카테고리id 지정하기 전에 정리
// function toSlug(text) {
//     return text
//         .toLowerCase()
//         .replace(/\+s/g, '-')           // 공백 제거
//         .replace(/[^\w\-가-힣]/g, '');  // 특수문자 제거
// }
