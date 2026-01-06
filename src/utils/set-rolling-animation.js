import { ROLLING_ANIMATION } from '@/constants';
/**
 * @typedef {import('../types').Newspaper} Newspaper
 * @typedef {Object} SetRollingAnimationParams
 *
 * @property {number} shownIndex
 * @property {Newspaper[]} newspaperList
 * @property {HTMLDivElement} $rollingItem
 * @property {number} duration
 *
 * @param {SetRollingAnimationParams} setRollingAnimationParams
 * @returns {{ animation: function, cleanup: function, currentShownIndex: number }}
 */
export const setRollingAnimation = ({
  shownIndex,
  newspaperList,
  $rollingItem,
  duration = ROLLING_ANIMATION.DURATION,
}) => {
  let start;
  let rAFId = null;
  let currentShownIndex = shownIndex;

  const cb = (timestamp) => {
    if (!start) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    if (elapsed > duration) {
      start = null;

      const nextHiddenIndex = (currentShownIndex + 2) % newspaperList.length;
      const $rollingContentWrapper = $rollingItem.querySelector(
        '.rolling-section__item--content-wrapper',
      );
      const $firstItem = $rollingContentWrapper.querySelector('li:first-child');

      const { press, mainTitle } = newspaperList[nextHiddenIndex];

      $firstItem.innerHTML = `
      <h1 class="rolling-section__item--newspaper">${press}</h1>
      <p class="rolling-section__item--title">${mainTitle}</p>
    `;

      $rollingContentWrapper.appendChild($firstItem);
      $rollingContentWrapper.style.transform = 'translateY(0)';
      currentShownIndex = (currentShownIndex + 1) % newspaperList.length;
      rAFId = requestAnimationFrame(cb);
    } else if (elapsed >= duration - ROLLING_ANIMATION.TIME) {
      const progress =
        (elapsed - (duration - ROLLING_ANIMATION.TIME)) /
        ROLLING_ANIMATION.TIME;
      const translateY = progress * -49;
      const $rollingContentWrapper = $rollingItem.querySelector(
        '.rolling-section__item--content-wrapper',
      );
      $rollingContentWrapper.style.transform = `translateY(${translateY}px)`;
      rAFId = requestAnimationFrame(cb);
    } else {
      rAFId = requestAnimationFrame(cb);
    }
  };

  return {
    animation: cb,
    cleanup: () => {
      if (rAFId) {
        cancelAnimationFrame(rAFId);
        rAFId = null;
      }
      if (start) {
        start = null;
      }
    },
    get currentShownIndex() {
      return currentShownIndex;
    },
  };
};
