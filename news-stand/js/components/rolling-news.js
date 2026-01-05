import { ROLLING_NEWS_LEFT, ROLLING_NEWS_RIGHT } from '../const';

const element = document.getElementById('rolling');

const createPanel = (newsArray) => {
  const li = document.createElement('li');
  const roller = document.createElement('div');

  li.classList.add('rolling--li', 'border');

  roller.classList.add('roller');

  newsArray.forEach((item) => {
    const { name, title } = item;

    const div = document.createElement('div');
    const span = document.createElement('span');
    const a = document.createElement('a');

    span.classList.add('display-bold14', 'text-strong');
    a.classList.add('available-medium14', 'hover-medium14');

    span.textContent = name;
    a.textContent = title;

    div.append(span, a);

    roller.appendChild(div);
  });

  const firstNews = roller.firstChild.cloneNode(true);
  roller.appendChild(firstNews);

  li.appendChild(roller);

  return li;
};

const moveNext = (element) => {
  element.style.transition = 'transform 0.5s';
};

const startRolling = (element, intervalTime) => {
  const roller = element.querySelector('.roller');
  const a = element.querySelectorAll('a');

  let timeId = null;
  let currentIdx = 0;

  const tick = () => {
    roller.style.transition = 'transform 0.5s';

    roller.style.transition = currentIdx++;

    roller.style.transform = `translateY(-${currentIdx * 49}px)`;

    if (currentIdx === roller.children.length - 1) {
      setTimeout(() => {
        roller.style.transition = 'none';
        roller.style.transform = 'translateY(0px)';

        currentIdx = 0;
      }, 500);
    }
  };

  timeId = setInterval(tick, intervalTime);

  // 의미 있는 변수로 바꿀 것. 수정
  a.forEach((a) => {
    a.addEventListener('mouseenter', () => clearInterval(timeId));
    a.addEventListener(
      'mouseleave',
      () => (timeId = setInterval(tick, intervalTime))
    );
  });
};

export const renderRollingNews = (intervalTime = 5000, differTime = 1000) => {
  const leftPanel = createPanel(ROLLING_NEWS_LEFT);
  const rightPanel = createPanel(ROLLING_NEWS_RIGHT);

  element.append(leftPanel, rightPanel);

  startRolling(leftPanel, intervalTime);

  setTimeout(() => {
    startRolling(rightPanel, intervalTime);
  }, differTime);
};
