import { updateLatestNewsCard } from '../components/LatestNewsCard.js';

/**
 * 초기 카드 렌더링
 */
export function renderInitialCards(initialNews) {
  updateLatestNewsCard(1, initialNews[0]);
  updateLatestNewsCard(2, initialNews[1]);
}
