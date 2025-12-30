import './autoRollingNewsBar.css';

export function createAutoRollingNewsBar (classId, newsList, interval) {
    const container = document.createElement('div');
    container.className = 'auto-rolling-news-bar';
    //container.id = classId;

    container.innerHTML = `
        <h3>
            연합뉴스
        </h3>
        <div>
            [속보] 도심 공원 조용한 시범 운영
        </div>
    `;

    return container;
}