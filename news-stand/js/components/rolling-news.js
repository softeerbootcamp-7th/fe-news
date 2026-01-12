import { ROLLING_NEWS } from '../lib/const';
import { moveY } from '../lib/utils';

const intervalTime = 5000;
const delayTime = 1000;

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

const controlPanel = {
  panels: [],
  timeStamps: [],

  append(element) {
    const time = Date.now();

    this.panels.push(element);
    this.timeStamps.push(time);
  },

  updateTime(side) {
    this.panels.forEach((state, index) => {
      if (state.side === side) {
        this.timeStamps[index] = Date.now();
      }
    });
  },

  alertPause(side) {
    this.panels.forEach((state, index) => {
      if (state.side === side) {
        this.timeStamps[index] = null;
      }
    });
  },

  // 여기서 1초 계산 뒤에 다른 패널에 알려준다. 계산 문제인 거 같습니다.
  alertStart(side) {
    let otherTime;
    let panelIndex;

    this.panels.forEach((state, index) => {
      if (state.side !== side) {
        otherTime = this.timeStamps[index];
      } else if (!this.timeStamps[index]) {
        panelIndex = index;
      }
    });

    const delay = Date.now() - otherTime + delayTime;
    this.panels[panelIndex].scheduleRolling(delay);
  },
};

class Panel {
  constructor(side, handlers) {
    this.side = side;
    this.idx = 1;
    this.timerId = null;
    this.content = ROLLING_NEWS[side];
    this.element = this.createElement(); // 이렇게 돼요?
    this.handlers = handlers;
    this.eventInit();

    // 수정 처음에만 1초 간격 나오도록 구현
    const firstRight = this.side === 'right' ? true : false;
    const delay = firstRight ? delayTime + 1000 : delayTime;

    this.scheduleRolling(delay);
  }

  createElement() {
    const li = document.createElement('li');
    const roller = document.createElement('div');

    li.classList.add('rolling--li', 'border');

    roller.classList.add('roller');

    const firstContent = createInnerContent(this.content[0]);
    const secondContent = createInnerContent(this.content[1]);

    roller.append(firstContent, secondContent);

    li.appendChild(roller);

    return li;
  }

  eventInit() {
    const allA = this.element.querySelectorAll('a'); // 이거 뒤에만 접근해도 되는데 할 수 있는 방법이 없을까?

    allA.forEach((a) => {
      a.addEventListener('mouseenter', () => {
        clearTimeout(this.timerId); // 이게 작동을 안해요.

        this.handlers.onEnter(this.side);
      });

      a.addEventListener('mouseleave', () => {
        this.handlers.onLeave(this.side);
      });
    });
  }

  scheduleRolling(delay) {
    this.timerId = setTimeout(() => {
      this.startRolling();
      this.scheduleRolling(intervalTime);
    }, delay);
  }

  removeChild(parent) {
    const firstDiv = parent.querySelector('div');
    firstDiv.remove();
  }

  appendChildTo(parent) {
    this.idx++;
    if (this.idx === this.content.length - 1) {
      this.idx = 0;
    }

    const secondContent = createInnerContent(this.content[this.idx]);

    secondContent.addEventListener('mouseenter', () => {
      clearTimeout(this.timerId); // 이게 작동을 안해요.

      this.handlers.onEnter(this.side);
    });

    secondContent.addEventListener('mouseleave', () => {
      this.handlers.onLeave(this.side);
    });

    parent.appendChild(secondContent);
  }

  startRolling() {
    const parent = this.element.querySelector('div');

    moveY(parent, 0.5, -49);

    setTimeout(() => {
      this.removeChild(parent);
      moveY(parent);
      this.appendChildTo(parent);
      this.handlers.onReportTime(this.side);
    }, 500);
  }
}

const element = document.getElementById('rolling');

const handlers = {
  onEnter: (side) => controlPanel.alertPause(side),
  onLeave: (side) => controlPanel.alertStart(side),
  onReportTime: (side) => controlPanel.updateTime(side),
};

export const renderRollingNews = () => {
  const leftPanel = new Panel('left', handlers);
  const rightPanel = new Panel('right', handlers);

  element.append(leftPanel.element, rightPanel.element);

  controlPanel.append(leftPanel);
  controlPanel.append(rightPanel);
};
