import { rollingItemTemplate } from '@/constants';

/**
 * @typedef {Object} SetIntervalForRollingParams
 * @property {number} startIndex
 * @property {Newspaper[]} newspaperList
 * @property {HTMLElement} $newspaperItem
 * @property {boolean} isRolling
 * @property {number} interval
 */
export const setIntervalForRolling = ({
  initialIndex,
  newspaperList,
  $newspaperItem,
  isRolling = false,
  interval = 5000,
}) => {
  let startIndex = initialIndex;
  let intervalId = null;
  let timeoutId = null;

  intervalId = setInterval(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    let shownIndex = startIndex;
    let hiddenIndex = (startIndex + 1) % newspaperList.length;

    $newspaperItem.innerHTML = rollingItemTemplate({
      shownNewspaperPress: newspaperList[shownIndex].press,
      shownNewspaperTitle: newspaperList[shownIndex].mainTitle,
      hiddenNewspaperPress: newspaperList[hiddenIndex].press,
      hiddenNewspaperTitle: newspaperList[hiddenIndex].mainTitle,
      isRolling,
    });

    shownIndex = hiddenIndex;
    hiddenIndex = (startIndex + 2) % newspaperList.length;

    timeoutId = setTimeout(() => {
      $newspaperItem.innerHTML = rollingItemTemplate({
        shownNewspaperPress: newspaperList[shownIndex].press,
        shownNewspaperTitle: newspaperList[shownIndex].mainTitle,
        hiddenNewspaperPress: newspaperList[hiddenIndex].press,
        hiddenNewspaperTitle: newspaperList[hiddenIndex].mainTitle,
      });
    }, 500);
    startIndex = shownIndex;
  }, interval);
  return {
    cleanup: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
};
