import { getNewspaperForRolling } from '@/models';
import { setIntervalForRolling } from '@/utils';
import { rollingItemTemplate } from '@/constants';
/**
 * @typedef {import('../../types').Newspaper} Newspaper
 */
export const RollingSection = async () => {
  /**
   * @type {{ newspaperList: Newspaper[] }}
   */
  const { newspaperList } = await getNewspaperForRolling();
  const leftSectionNewspaperList = newspaperList.slice(0, 5);
  const rightSectionNewspaperList = newspaperList.slice(5, 10);

  const [$firstNewspaperItem, $secondNewspaperItem] = document.querySelectorAll(
    '.rolling-section__item',
  );

  let leftSectionNewspaperIndex = 0;
  let rightSectionNewspaperIndex = 0;

  let leftCleanup = () => {};
  let rightCleanup = () => {};
  let timeoutId = null;

  const startRolling = () => {
    const { cleanup: firstCleanup } = setIntervalForRolling({
      initialIndex: leftSectionNewspaperIndex,
      newspaperList: leftSectionNewspaperList,
      $newspaperItem: $firstNewspaperItem,
      isRolling: true,
    });
    leftCleanup = firstCleanup;

    timeoutId = setTimeout(() => {
      const { cleanup: secondCleanup } = setIntervalForRolling({
        initialIndex: rightSectionNewspaperIndex,
        newspaperList: rightSectionNewspaperList,
        $newspaperItem: $secondNewspaperItem,
        isRolling: true,
      });
      rightCleanup = secondCleanup;
    }, 1000);
  };

  const stopRolling = () => {
    leftCleanup();
    rightCleanup();
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  $firstNewspaperItem.addEventListener('mouseenter', () => {
    stopRolling();
  });

  $secondNewspaperItem.addEventListener('mouseenter', () => {
    stopRolling();
  });

  $firstNewspaperItem.addEventListener('mouseleave', () => {
    stopRolling();
    startRolling();
  });

  $secondNewspaperItem.addEventListener('mouseleave', () => {
    stopRolling();
    startRolling();
  });

  $firstNewspaperItem.innerHTML = rollingItemTemplate({
    shownNewspaperPress:
      leftSectionNewspaperList[leftSectionNewspaperIndex].press,
    shownNewspaperTitle:
      leftSectionNewspaperList[leftSectionNewspaperIndex].mainTitle,
    hiddenNewspaperPress:
      leftSectionNewspaperList[leftSectionNewspaperIndex + 1].press,
    hiddenNewspaperTitle:
      leftSectionNewspaperList[leftSectionNewspaperIndex + 1].mainTitle,
  });

  $secondNewspaperItem.innerHTML = rollingItemTemplate({
    shownNewspaperPress:
      rightSectionNewspaperList[rightSectionNewspaperIndex].press,
    shownNewspaperTitle:
      rightSectionNewspaperList[rightSectionNewspaperIndex].mainTitle,
    hiddenNewspaperPress:
      rightSectionNewspaperList[rightSectionNewspaperIndex + 1].press,
    hiddenNewspaperTitle:
      rightSectionNewspaperList[rightSectionNewspaperIndex + 1].mainTitle,
  });

  startRolling();
};
