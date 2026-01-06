import { ROLLING_NEWS_LEFT, ROLLING_NEWS_RIGHT } from '../const';

const element = document.getElementById('rolling');

const intervalTime = 5000;
const delayTime = 1000;

const getNewsContent = (side) => {
  return side === 'left' ? ROLLING_NEWS_LEFT : ROLLING_NEWS_RIGHT;
};

const createInnerContent = (item) => {
  const { name, title } = item;

  const div = document.createElement('div');
  const span = document.createElement('span');
  const a = document.createElement('a');

  span.classList.add('display-bold14', 'text-strong');
  a.classList.add('available-medium14', 'hover-medium14');

  span.textContent = name;
  a.textContent = title;

  div.append(span, a);

  return div;
};

const createPanel = (side) => {
  const newsContent = getNewsContent(side);
  const li = document.createElement('li');
  const roller = document.createElement('div');

  li.classList.add('rolling--li', 'border', `${side}-rolling`);

  roller.classList.add('roller');

  const firstContent = createInnerContent(newsContent[0]);
  const secondContent = createInnerContent(newsContent[1]);

  roller.append(firstContent, secondContent);

  li.appendChild(roller);

  return li;
};

// 한 번만 사용하므로 객체 리터럴로 구현하는 싱글톤 패턴 활용.
const controlPanel = {
  elements: {
    left: document.querySelector('.left-rolling'),
    right: document.querySelector('.right-rolling'),
  },
  nextTimes: {
    left: 0,
    right: 0,
  },
  timerIds: {
    left: null,
    right: null,
  },
  idx: {
    left: 1,
    right: 1,
  },

  eventListenerInit(side) {
    this.elements[side] = document.querySelector(`.${side}-rolling`);

    // 안전장치: 만약 요소를 못 찾았다면 에러를 내지 않고 종료
    if (!this.elements[side]) {
      console.error(`Error: .${side}-rolling 요소를 찾을 수 없습니다.`);
      return;
    }

    const allA = this.elements[side].querySelectorAll('a');

    allA.forEach((a) => {
      a.addEventListener('mouseenter', () => {
        debugger;
        clearInterval(this.timerIds[side]);
      });

      a.addEventListener('mouseleave', () => {
        this.syncAndResume(side);
      });
    });

    const firstRight = side === 'right' ? true : false;
    const delay = firstRight ? delayTime + 1000 : delayTime;

    this.scheduleRolling(side, delay);
  },

  updateContent(side) {
    const parent = this.elements[side].querySelector('div');
    const prevContent = parent.querySelector('div');
    prevContent.remove();
    this.idx[side]++;

    const newsContent = getNewsContent(side);

    if (this.idx[side] === newsContent.length - 1) {
      this.idx[side] = 0;
    }

    const secondContent = createInnerContent(newsContent[this.idx[side]]);
    parent.appendChild(secondContent);

    // 이벤트를 여기서도 추가해야 하나? 기존에 있던 이벤트들은 요소가 삭제된다면 어떻게 될까?
    const a = parent.querySelector('a');

    a.addEventListener('mouseenter', () => {
      debugger;
      clearInterval(this.timerIds[side]);
    });

    a.addEventListener('mouseleave', () => {
      this.syncAndResume(side);
    });
  },

  startRolling(side) {
    let updateTimer = null;
    const element = this.elements[side].querySelector('div'); // 수정
    element.style.transition = 'transform 0.5s';
    element.style.transform = `translateY(-49px)`; // 수정

    updateTimer = setTimeout(() => {
      this.updateContent(side);
      element.style.transition = 'transform 0s';
      element.style.transform = 'translateY(0)';
    }, 500);
  },

  scheduleRolling(side, delay) {
    this.timerIds[side] = setTimeout(() => {
      this.startRolling(side);
      this.scheduleRolling(side, intervalTime);
      this.nextTimes[side] = Date.now() + intervalTime;
    }, delay);
  },

  syncAndResume(mySide) {
    const otherSide = mySide === 'left' ? 'right' : 'left';
    const otherNextTime = this.nextTimes[otherSide];

    if (!otherNextTime) {
      this.scheduleRolling(mySide, 0);
      return;
    }

    const targetTime = otherNextTime + delayTime;

    let delay = targetTime - Date.now();

    if (delay > intervalTime) {
      delay -= intervalTime;
    } else if (delay < 0) {
      delay += intervalTime;
    }

    this.scheduleRolling(mySide, delay);
  },
};

export const renderRollingNews = () => {
  const leftPanel = createPanel('left');
  const rightPanel = createPanel('right');

  element.append(leftPanel, rightPanel);

  controlPanel.eventListenerInit('left');
  controlPanel.eventListenerInit('right');
};
