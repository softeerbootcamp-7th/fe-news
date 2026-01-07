import { NEWS_SECTION_STATE } from '@/constants';
import { Observer } from '@/libs';
import { getNewspaperForGrid } from '@/models';
import { newsSectionStore } from '@/stores';

import { GridView } from '../grid-view';
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
      if (gridViewCleanupFunctions) {
        gridViewCleanupFunctions();
      }
      return;
    }

    GridView({ newspaperList: totalNewspaperList }).then(
      ({ cleanup: cleanupGridView }) => {
        gridViewCleanupFunctions = cleanupGridView;
      },
    );
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
