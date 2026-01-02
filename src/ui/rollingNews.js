import { rollingNews } from '../data/rollingNews.js';

const INTERVAL = 5000;
const DELAY = 1000;

let leftTimer;
let rightTimer;
let hoverTimeout;

function createItem({ provider, headline }) {
    const li = document.createElement('li');
    li.className = 'rolling-item';

    const providerSpan = document.createElement('span');
    providerSpan.className = 'news-provider';
    providerSpan.textContent = provider;
    
    const headlineSpan = document.createElement('span');
    headlineSpan.className = 'news-headline';
    headlineSpan.textContent = headline;
    
    li.append(providerSpan, headlineSpan);
    return li;
}

function render(listEl, data) {
    data.forEach((item) => {
        listEl.appendChild(createItem(item));
    });
}

function roll(list) {
    const first = list.firstElementChild;
    const height = first.offsetHeight;
    
    list.style.transition = 'transform 0.5s ease';
    list.style.transform = `translateY(-${height}px)`;

    list.addEventListener(
        'transitionend',
        () => {
            list.style.transition = 'none';
            list.style.transform = 'translateY(0)';
        list.appendChild(first);
        },
        { once: true }
    );
}

function start(left, right) {
    leftTimer = setInterval(() => roll(left), INTERVAL);
    rightTimer = setInterval(() => roll(right), INTERVAL);
}

function stop() {
    clearInterval(leftTimer);
    clearInterval(rightTimer);
}

export function initRollingNews() {
    const leftList = document.querySelector('.rolling-left');
    const rightList = document.querySelector('.rolling-right');

    render(leftList, rollingNews.left);
    render(rightList, rollingNews.right);

    leftTimer = setInterval(() => roll(leftList), INTERVAL);
    setTimeout(() => {
        rightTimer = setInterval(() => roll(rightList), INTERVAL);
    }, DELAY);
    
    [leftList, rightList].forEach((list) => {
        list.addEventListener('mouseenter', () => {
        stop();
        clearTimeout(hoverTimeout);
        });

        list.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                start(leftList, rightList);
            }, DELAY);
        });
    });
}
