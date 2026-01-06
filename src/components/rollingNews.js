import { rollingNews } from '../data/rollingNews.js';

const INTERVAL = 5000;
const DELAY = 1000;
const DURATION = 500;

let leftInterval;
let rightInterval;
let rightDelayTimeout;
let hoverTimeout;

// 현재 인덱스 관리
const indexState = {
    left: 0,
    right: 0,
};

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

// 트랙 초기화 - rolling item은 2개만 생성
function initTrack(track, data, key) {
    track.innerHTML = '';

    const current = createItem(data[0]);
    const next = createItem(data[1]);

    current.classList.add('current');
    next.classList.add('next');

    track.append(current, next);
    indexState[key] = 0;
}

function roll(track, data, key) {
    const current = track.querySelector('.current');
    const next = track.querySelector('.next');

    const height = current.offsetHeight;

    current.style.transition = `transform ${DURATION}ms ease`;
    next.style.transition = `transform ${DURATION}ms ease`;

    current.style.transform = `translateY(-${height}px)`;
    next.style.transform = 'translateY(0)';

    setTimeout(() => {
        // index 갱신
        indexState[key] = (indexState[key] + 1) % data.length;
        const nextIndex = (indexState[key] + 1) % data.length;

        // 내용만 교체
        current.innerHTML = createItem(data[indexState[key]]).innerHTML;
        next.innerHTML = createItem(data[nextIndex]).innerHTML;

        // 위치 리셋
        current.style.transition = 'none';
        next.style.transition = 'none';

        current.style.transform = 'translateY(0)';
        next.style.transform = `translateY(${height}px)`;
    }, DURATION);
}

function startRolling(leftTrack, rightTrack) {
    stopRolling();

    leftInterval = setInterval(
        () => roll(leftTrack, rollingNews.left, 'left'),
        INTERVAL
    );

    rightDelayTimeout = setTimeout(() => {
        rightInterval = setInterval(
            () => roll(rightTrack, rollingNews.right, 'right'),
            INTERVAL
        );
    }, DELAY);
}

function stopRolling() {
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearTimeout(rightDelayTimeout);
}

export function initRollingNews() {
    const leftTrack = document.querySelector('.rolling-left .rolling-track');
    const rightTrack = document.querySelector('.rolling-right .rolling-track');

    initTrack(leftTrack, rollingNews.left, 'left');
    initTrack(rightTrack, rollingNews.right, 'right');

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
