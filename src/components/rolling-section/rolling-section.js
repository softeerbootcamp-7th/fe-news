import { getNewspaperForRolling } from '@/models';
import { setRollingAnimation } from '@/utils';
import { ROLLING_ANIMATION } from '@/constants';
import { rollingItemTemplate } from '@/templates';

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

  let leftFrameId = null;
  let leftAnimation = null;
  let leftCurrentShownIndex = leftSectionNewspaperIndex;

  let rightTimeout = null;
  let rightFrameId = null;
  let rightAnimation = null;
  let rightCurrentShownIndex = rightSectionNewspaperIndex;

  leftAnimation = setRollingAnimation({
    shownIndex: leftSectionNewspaperIndex,
    newspaperList: leftSectionNewspaperList,
    $rollingItem: $firstNewspaperItem,
    duration: ROLLING_ANIMATION.DURATION,
  });

  rightAnimation = setRollingAnimation({
    shownIndex: rightSectionNewspaperIndex,
    newspaperList: rightSectionNewspaperList,
    $rollingItem: $secondNewspaperItem,
    duration: ROLLING_ANIMATION.DURATION,
  });

  const $rollingSection = document.querySelector('.rolling-section');

  $rollingSection.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('rolling-section__item--title')) {
      cancelAnimationFrame(leftFrameId);
      leftCurrentShownIndex = leftAnimation.currentShownIndex;
      leftAnimation.cleanup();

      cancelAnimationFrame(rightFrameId);
      rightCurrentShownIndex = rightAnimation.currentShownIndex;
      rightAnimation.cleanup();

      clearTimeout(rightTimeout);
      rightTimeout = null;
    }
  });

  $rollingSection.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('rolling-section__item--title')) {
      leftAnimation = setRollingAnimation({
        shownIndex: leftCurrentShownIndex,
        newspaperList: leftSectionNewspaperList,
        $rollingItem: $firstNewspaperItem,
        duration: ROLLING_ANIMATION.DURATION,
      });
      rightAnimation = setRollingAnimation({
        shownIndex: rightCurrentShownIndex,
        newspaperList: rightSectionNewspaperList,
        $rollingItem: $secondNewspaperItem,
        duration: ROLLING_ANIMATION.DURATION,
      });
      leftFrameId = requestAnimationFrame(leftAnimation.animation);
      rightTimeout = setTimeout(() => {
        rightFrameId = requestAnimationFrame(rightAnimation.animation);
      }, ROLLING_ANIMATION.LFET_RIGHT_DELAY);
    }
  });

  const $rollingContentWrapper = document.createElement('ul');
  $rollingContentWrapper.classList.add(
    'rolling-section__item--content-wrapper',
  );

  let leftStartIndex = leftSectionNewspaperIndex;
  let shownLeftIndex = leftStartIndex;
  let hiddenLeftIndex = (leftStartIndex + 1) % leftSectionNewspaperList.length;

  $firstNewspaperItem.innerHTML = rollingItemTemplate({
    shownNewspaperPress: leftSectionNewspaperList[shownLeftIndex].press,
    shownNewspaperTitle: leftSectionNewspaperList[shownLeftIndex].mainTitle,
    hiddenNewspaperPress: leftSectionNewspaperList[hiddenLeftIndex].press,
    hiddenNewspaperTitle: leftSectionNewspaperList[hiddenLeftIndex].mainTitle,
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

  leftFrameId = requestAnimationFrame(leftAnimation.animation);
  rightTimeout = setTimeout(() => {
    rightFrameId = requestAnimationFrame(rightAnimation.animation);
  }, ROLLING_ANIMATION.LFET_RIGHT_DELAY);
};
