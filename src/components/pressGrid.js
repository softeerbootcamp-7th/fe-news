import { pressLogos, PER_PAGE } from '../data/press.js';
import { isSubscribed } from '../state/subscription.js';

let currentTab = 'all';
let currentPage = 0;
const lastPage = 3;

const grid = document.querySelector('.provider-grid');
const prevBtn = document.querySelector('.grid-nav-btn--prev');
const nextBtn = document.querySelector('.grid-nav-btn--next');

// 언론사 순서 랜덤 셔플
function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

const shufflePressLogos = shuffle(pressLogos);

export function setPressGridTab(tab) {
    currentTab = tab;
    currentPage = 0;
    renderPressGrid();
}

// 전체 / 구독한 언론사 데이터 반환
function getGridData() {
    if (currentTab === 'all') {
        return shufflePressLogos;
    } else {
        return shufflePressLogos.filter(({ id }) => isSubscribed(id));
    }
}

export function initPressGrid() {
    renderPressGrid();
    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);
}

function renderPressGrid() {
    grid.innerHTML = '';

    const data = getGridData();    
    const start = currentPage * PER_PAGE;
    const items = data.slice(start, start + PER_PAGE);

    items.forEach(({ src }) => {
        const li = document.createElement('li');
        li.className = 'provider-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = '';

        li.appendChild(img);
        grid.appendChild(li);
    });

    // 빈 칸 채우기
    const emptyCount = PER_PAGE - items.length;
    for (let i = 0; i < emptyCount; i++) {
        const li = document.createElement('li');
        li.className = 'provider-item provider-item--empty';
        grid.appendChild(li);
    }

    prevBtn.style.display = currentPage === 0 ? 'none' : 'block';
    nextBtn.style.display = currentPage === lastPage ? 'none' : 'block';
}

function goPrev() {
    if (currentPage === 0) return;
    currentPage--;
    renderPressGrid();
}

function goNext() {
    if (currentPage === lastPage) return;
    currentPage++;
    renderPressGrid();
}
