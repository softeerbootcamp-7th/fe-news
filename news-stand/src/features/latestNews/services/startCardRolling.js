import { updateLatestNewsCard } from '../components/LatestNewsCard.js';

/**
 * 카드 롤링 시작
 */
export function startCardRolling(stateManager) {
  function updateCard(cardNum) {
    const news = stateManager.getNextNews();

    requestAnimationFrame(() => {
      updateLatestNewsCard(cardNum, news);
    });
  }

  function rollCard1() {
    updateCard(1);
    setTimeout(rollCard1, 5000);
  }

  function rollCard2() {
    updateCard(2);
    setTimeout(rollCard2, 5000);
  }

  setTimeout(() => {
    rollCard1();
    setTimeout(rollCard2, 1000);
  }, 5000);
}
