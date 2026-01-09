import { updateView } from '../updateView.js';
import { getCategories ,getTotalNews, getNewsByCategory } from '../../store/newsStore.js';

let currentPage = 0;
let currentData = [];

let list, prevBtn, nextBtn;
let isEventBound = false;

let timerId = null;
const NEWS_DURATION = 20000;

export function getNewsDuration() {
    return NEWS_DURATION;
}

// 뉴스간 20초 타이머
// 그리드 탭 같은거로 넘어가거나 하면 타이머 삭제하는거도 만들어야 할듯. 아니면 계속 돌아가고 있음 
function startNewsTimer(duration) {
    // 타이머 존재시 초기화로 중복 해결
    resetListTimer();
    // 타이머 재설정
    timerId = setTimeout(() => {
        handleListNext(); // 다음 페이지로 넘어가기
    }, duration);
}
export function resetListTimer() {
    if (timerId) {
        clearTimeout(timerId);
    }
}



export function initListEvents({ viewId, prevBtnId, nextBtnId }){
    if (isEventBound) return;
    isEventBound = true;

    list = document.getElementById(viewId);
    prevBtn = document.getElementById(prevBtnId);
    nextBtn = document.getElementById(nextBtnId);

    currentData = getTotalNews();

    render();
}

// list탭을 열때마다 호출
export function showList() {
    if(!list) return;
    currentPage = 0;
    render();
}

function render() {
    updateView({
        type: "LIST-INIT",
        view: list,
        currentPage: currentPage,
        currentData: currentData
    });
    startNewsTimer(NEWS_DURATION);
}

// 페이지 넘길때마다 호출
export function handleListPrev() {
    if (currentPage === 0) return;
    currentPage--;
    update(currentPage);
}

export function handleListNext() {
    const maxPage = currentData.length - 1;
    if (currentPage >= maxPage) currentPage = 0;
    else currentPage++;
    update(currentPage);
}



export function updatePage(page) {
    currentPage = page;
    update(currentPage);
}

function update(page) {
    updateListCategory(page);

    updateView({
        type: "LIST-UPDATE",
        view: list,
        currentPage: page,
        currentData: currentData,
        itemCount: 1
    });
    startNewsTimer(NEWS_DURATION);
}

function updateListCategory(page) {
    // 현재 활성화된 카테고리에서 active효과 삭제
    const prevCategory = document.querySelectorAll('.news-category.active');
    prevCategory.forEach(e => {
        e.classList.toggle('active');
        e.classList.toggle('selected-bold14');
        e.classList.toggle('available-medium14');

        let cate_count = e.querySelector('.cate-count');
        cate_count.remove();

        let progress_bar_active = e.querySelector('.progress-bar');
        progress_bar_active.style.animation = 'none';

    });

    let category = currentData[page].category;
    let category_page = pageByCategory(category);

    // 선택 카테고리 active효과 추가
    let cate = document.getElementById(`category-${category}`);
    cate.classList.toggle('available-medium14');
    cate.classList.toggle('active');
    cate.classList.toggle('selected-bold14');

    // 카테고리별 뉴스 개수 표시
    let news_data = getNewsByCategory(category);
    let count = document.createElement('div');
    count.className = `cate-count`;
    count.id = 'cate-count';
    count.innerHTML = `${category_page}/${news_data.length}`;
    cate.appendChild(count);

    // 카테고리 롤링 애니메이션 초기화 후 재실행
    const bar = cate.querySelector('.progress-bar');
    if (bar) {
        bar.style.animation = 'none';
        bar.offsetHeight; // reflow 강제
        bar.style.animation = `fillProgress ${NEWS_DURATION/1000}s linear forwards`;
    }
}

// 이 함수도 newsStore.js로 옮겨놓고 하면 좋을걸... 근데 함수 이름은 좀 수정해야겠다. 
function pageByCategory(category){
    let arr = getCategories();

    let category_page = currentPage + 1;
    for (const e of arr) {
        if (e === category) {
            break;
        }
        category_page -= getNewsByCategory(e).length;
    }
    return category_page;
}