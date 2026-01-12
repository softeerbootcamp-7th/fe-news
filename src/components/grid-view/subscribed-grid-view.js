import { GRID_VIEW, NEWS_SECTION_STATE } from '@/constants';
import { Observer } from '@/libs';
import {
  createGridCardListHTML,
  getArrowButtonPosition,
  gridViewEventHandler,
  gridViewStore,
  insertArrowButtons,
  newsSectionStore,
  subscribedGridViewEventHandler,
  subscribedNewspaperStore,
} from '@/models';

/**
 * @returns {{cleanup: () => void}}
 */
export const SubscribedGridView = () => {
  const { PAGE_SIZE, LEFT_BUTTON_CLASS_NAME, RIGHT_BUTTON_CLASS_NAME } =
    GRID_VIEW;

  const $gridView = document.querySelector('.news-grid-view');

  const { handleMouseOver, handleMouseOut, handleClick } = gridViewEventHandler(
    {
      newspaperList: subscribedNewspaperStore.getSubscribedNewspaperList(),
      initialPage: gridViewStore.getSubscribedGridViewPageIndex(),
      isSubscribed: true,
    },
  );

  const { handleClick: handleSubscribedButtonClick } =
    subscribedGridViewEventHandler();

  $gridView.addEventListener('mouseover', handleMouseOver);
  $gridView.addEventListener('mouseout', handleMouseOut);
  $gridView.addEventListener('click', handleClick);
  $gridView.addEventListener('click', handleSubscribedButtonClick);

  const cleanupEventListener = () => {
    $gridView.removeEventListener('mouseover', handleMouseOver);
    $gridView.removeEventListener('mouseout', handleMouseOut);
    $gridView.removeEventListener('click', handleClick);
    $gridView.removeEventListener('click', handleSubscribedButtonClick);
  };

  const renderSubscribedGridView = ({ $gridView }) => {
    const currentNewspaperList =
      subscribedNewspaperStore.getSubscribedNewspaperList();
    const totalPage = Math.ceil(currentNewspaperList.length / PAGE_SIZE) - 1;
    let currentPage = gridViewStore.getSubscribedGridViewPageIndex();
    const gridCardListHTML = createGridCardListHTML({
      newspaperList: currentNewspaperList,
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
  };

  const updateSubscribedGridView = () => {
    const { type } = newsSectionStore.getState();
    if (type !== NEWS_SECTION_STATE.TYPE.SUBSCRIBED) {
      return;
    }
    renderSubscribedGridView({
      $gridView,
    });
  };
  const observer = new Observer(updateSubscribedGridView);
  subscribedNewspaperStore.subscribe(observer);

  renderSubscribedGridView({ $gridView });

  return {
    cleanup: () => {
      cleanupEventListener();
      subscribedNewspaperStore.unsubscribe(observer);
    },
  };
};
