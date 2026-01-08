import { NEWS_SECTION_STATE } from '@/constants';
import { Observer } from '@/libs';
import { getNewspaperForGrid, newsSectionStore } from '@/models';

import { GridView } from '../grid-view';
import { ListView } from '../list-view';
import { NewsSectionHeader } from '../news-section-header';
import { RollingSection } from '../rolling-section';
import { SubscribedNewsNumber } from '../subscribed-news-number';

export const Main = async () => {
  let currentView = newsSectionStore.getState().view;
  let gridViewCleanupFunctions = null;
  const { newspaperList: totalNewspaperList } = await getNewspaperForGrid();

  const updateMain = () => {
    const newView = newsSectionStore.getState().view;
    if (currentView === newView) {
      return;
    }

    currentView = newView;

    if (newView === NEWS_SECTION_STATE.VIEW.LIST) {
      gridViewCleanupFunctions?.();
      gridViewCleanupFunctions = null;
      ListView();
      return;
    }

    if (newView === NEWS_SECTION_STATE.VIEW.GRID) {
      const $listViewWrapper = document.querySelector(
        '.news-list-view__wrapper',
      );
      $listViewWrapper?.remove();
      GridView({ newspaperList: totalNewspaperList }).then(
        ({ cleanup: cleanupGridView }) => {
          gridViewCleanupFunctions = cleanupGridView;
        },
      );
    }
  };

  const observer = new Observer(updateMain);
  newsSectionStore.subscribe(observer);

  RollingSection();
  NewsSectionHeader();
  SubscribedNewsNumber();
  GridView({ newspaperList: totalNewspaperList }).then(
    ({ cleanup: cleanupGridView }) => {
      gridViewCleanupFunctions = cleanupGridView;
    },
  );
};
