import { pressLogos, PER_PAGE } from '../data/press.js';
import { isSubscribed, toggleSubscribe } from '../state/subscription.js';

let currentPage = 0;
const grid = document.querySelector('.provider-grid');
console.log('grid:', grid);

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

export function initProviderGrid() {
    render();
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
}

function render() {
    grid.innerHTML = '';

    const start = currentPage * PER_PAGE;
    const items = shufflePressLogos.slice(start, start + PER_PAGE);

    items.forEach(({ src }) => {
        const li = document.createElement('li');
        li.className = 'provider-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = '';

        li.appendChild(img);
        grid.appendChild(li);
    });

    prevBtn.style.display = currentPage === 0 ? 'none' : 'block';
    nextBtn.style.display = currentPage === 3 ? 'none' : 'block';
}

function prev() {
    if (currentPage === 0) return;
    currentPage--;
    render();
}

function next() {
    if (currentPage === 3) return;
    currentPage++;
    render();
}
