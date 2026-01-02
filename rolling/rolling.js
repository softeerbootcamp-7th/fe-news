import { getLatestHeadlines } from '../data/rollingData.js';
import { renderRollingList } from './rollingRender.js';
import { createRollingController } from './rollingLogic.js';

export function initRollingTabs() {
  const tabs = document.querySelectorAll('.rolling-tab');
  const headlines = getLatestHeadlines(10);

  const leftUl = tabs[0].querySelector('.news-list');
  const rightUl = tabs[1].querySelector('.news-list');

  renderRollingList(leftUl, headlines.slice(0, 5));
  renderRollingList(rightUl, headlines.slice(5, 10));

  const leftRolling = createRollingController(leftUl, {
    interval: 5000,
    delay: 0
  });

  const rightRolling = createRollingController(rightUl, {
    interval: 5000,
    delay: 1000
  });

  // hover 제어
  tabs[0].addEventListener('mouseenter', leftRolling.pause);
  tabs[0].addEventListener('mouseleave', leftRolling.resume);

  tabs[1].addEventListener('mouseenter', rightRolling.pause);
  tabs[1].addEventListener('mouseleave', rightRolling.resume);
}