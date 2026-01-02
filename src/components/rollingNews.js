import { rollingNews } from '../data/rollingNews.js';

const INTERVAL = 5000;
const DELAY = 1000;

let leftInterval;
let rightInterval;
let rightDelayTimeout;
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

function renderRollingNews(list, data) {
    data.forEach((item) => {
        list.appendChild(createItem(item));
    });
}

function roll(track) {
    const first = track.firstElementChild;
    const height = first.offsetHeight;
    
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateY(-${height}px)`;

    track.addEventListener(
        'transitionend',
        () => {
            track.style.transition = 'none';
            track.style.transform = 'translateY(0)';
            track.appendChild(first);
        },
        { once: true }
    );
}

function startRolling(left, right) {
    stopRolling();
    leftInterval = setInterval(() => roll(left), INTERVAL);
    rightDelayTimeout = setTimeout(() => rightInterval = setInterval(() => roll(right), INTERVAL), DELAY);
}

function stopRolling() {
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearTimeout(rightDelayTimeout);
}

export function initRollingNews() {
    const leftTrack = document.querySelector('.rolling-left .rolling-track');
    const rightTrack = document.querySelector('.rolling-right .rolling-track');

    renderRollingNews(leftTrack, rollingNews.left);
    renderRollingNews(rightTrack, rollingNews.right);
    startRolling(leftTrack, rightTrack);
    
    [leftTrack, rightTrack].forEach((track) => {
        track.addEventListener('mouseenter', () => {
            stopRolling();
            clearTimeout(hoverTimeout);
        });

        track.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                startRolling(leftTrack, rightTrack);
            }, DELAY);
        });
    });
}
