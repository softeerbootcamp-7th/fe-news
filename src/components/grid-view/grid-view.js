import {
  getNewspaperForGrid,
  createGridCardListHTML,
  getArrowButtonPosition,
  insertArrowButtons,
} from '@/models';
import { GRID_VIEW } from '@/constants';
import { gridViewEventHandler } from '@/models';

export const GridView = async () => {
  const { newspaperList } = await getNewspaperForGrid();
  const {
    PAGE_SIZE,
    INITIAL_PAGE,
    LEFT_BUTTON_CLASS_NAME,
    RIGHT_BUTTON_CLASS_NAME,
  } = GRID_VIEW;

  const totalPage = Math.ceil(newspaperList.length / PAGE_SIZE) - 1;
  let currentPage = INITIAL_PAGE;

  const $gridView = document.querySelector('.news-grid-view');

  const { handleMouseOver, handleMouseOut, handleClick } = gridViewEventHandler(
    {
      newspaperList,
      initialPage: currentPage,
    },
  );

  $gridView.addEventListener('mouseover', handleMouseOver);
  $gridView.addEventListener('mouseout', handleMouseOut);
  $gridView.addEventListener('click', handleClick);

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
    },
  };
};
