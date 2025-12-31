import './autoRollingNewsBar.css';

export function createAutoRollingNewsBar (classId, newsList, interval) {
    const container = document.createElement('div');
    container.className = 'auto-rolling-news-bar';
    container.id = classId;

    container.innerHTML = `
        <h3 id="auto-rolling-news-bar__press_${classId}"></h3>
        <div id="auto-rolling-news-bar__title_${classId}"></div>
    `;

    const pressEl = container.querySelector(`#auto-rolling-news-bar__press_${classId}`);
    const titleEl = container.querySelector(`#auto-rolling-news-bar__title_${classId}`);

    let currentIndex = 0;

    function render (index) {
        const { press, mainTitle } = newsList[index];

        pressEl.textContent = press;
        titleEl.textContent = mainTitle;
    };

    let intervalId = null;

    function start () {
        render(currentIndex);

        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % newsList.length;
            render(currentIndex);
        }, interval);
    }

    function stop () {
        clearInterval(intervalId);
        intervalId = null;
    }


    return { el: container, start, stop };
}