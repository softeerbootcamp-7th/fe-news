import { GRID_VIEW } from '@/constants';
import {
  gridViewEventHandler,
  createGridCardListHTML,
  getArrowButtonPosition,
  insertArrowButtons,
  totalGridViewEventHandler,
} from '@/models';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @param {Newspaper[]} newspaperList
 * @returns {{cleanup: () => void}}
 */
export const TotalGridView = ({ newspaperList }) => {
  const {
    PAGE_SIZE,
    INITIAL_PAGE,
    LEFT_BUTTON_CLASS_NAME,
    RIGHT_BUTTON_CLASS_NAME,
  } = GRID_VIEW;

  const totalPage = Math.ceil(newspaperList.length / PAGE_SIZE) - 1;
  const currentPage = INITIAL_PAGE;

  const $gridView = document.querySelector('.news-grid-view');

  const { handleMouseOver, handleMouseOut, handleClick } = gridViewEventHandler(
    {
      newspaperList,
      initialPage: currentPage,
    },
  );
  const { handleClick: handleTotalSubscribeButtonClick } =
    totalGridViewEventHandler({ newspaperList });

  $gridView.addEventListener('mouseover', handleMouseOver);
  $gridView.addEventListener('mouseout', handleMouseOut);
  $gridView.addEventListener('click', handleClick);
  $gridView.addEventListener('click', handleTotalSubscribeButtonClick);

  const gridCardListHTML = createGridCardListHTML({
    newspaperList,
    currentPage,
    pageSize: PAGE_SIZE,
  });
  $gridView.innerHTML = gridCardListHTML;
  insertArrowButtons({
    parentElement: $gridView,
    position: getArrowButtonPosition(currentPage, totalPage),
    leftButtonClassName: LEFT_BUTTON_CLASS_NAME,
    rightButtonClassName: RIGHT_BUTTON_CLASS_NAME,
  });

  return {
    cleanup: () => {
      $gridView.removeEventListener('mouseover', handleMouseOver);
      $gridView.removeEventListener('mouseout', handleMouseOut);
      $gridView.removeEventListener('click', handleClick);
      $gridView.removeEventListener('click', handleTotalSubscribeButtonClick);
    },
  };
};
