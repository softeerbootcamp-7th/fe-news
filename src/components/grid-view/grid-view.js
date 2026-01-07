import { NEWS_SECTION_STATE } from '@/constants';
import { Observer } from '@/libs';
import { newsSectionStore } from '@/stores';
import { gridViewTemplate } from '@/templates';

import { SubscribedGridView } from './subscribed-grid-view';
import { TotalGridView } from './total-grid-view';

/**
 * @typedef {import('../../types').Newspaper} Newspaper
 *
 * @typedef {Object} GridViewParams
 * @property {Newspaper[]} newspaperList
 *
 * @param {GridViewParams} gridViewParams
 * @returns {{cleanup: () => void}}
 */
export const GridView = async ({ newspaperList }) => {
  let cleanupFunctions = null;

  const createGridView = () => {
    const $newsSection = document.querySelector('.news-section');
    $newsSection.insertAdjacentHTML('beforeend', gridViewTemplate());
  };

  const updateGridView = () => {
    const { type, view } = newsSectionStore.getState();

    cleanupFunctions?.();
    cleanupFunctions = null;

    if (view === NEWS_SECTION_STATE.VIEW.LIST) {
      return;
    }

    if (type === NEWS_SECTION_STATE.TYPE.TOTAL) {
      const { cleanup: cleanupTotalGridView } = TotalGridView({
        newspaperList,
      });
      cleanupFunctions = cleanupTotalGridView;
    } else {
      const { cleanup: cleanupSubscribedGridView } = SubscribedGridView();
      cleanupFunctions = cleanupSubscribedGridView;
    }
  };

  const observer = new Observer(updateGridView);
  newsSectionStore.subscribe(observer);

  createGridView();

  if (newsSectionStore.getState().type === NEWS_SECTION_STATE.TYPE.TOTAL) {
    const { cleanup: cleanupTotalGridView } = TotalGridView({
      newspaperList,
    });
    cleanupFunctions = cleanupTotalGridView;
  } else {
    const { cleanup: cleanupSubscribedGridView } = SubscribedGridView();
    cleanupFunctions = cleanupSubscribedGridView;
  }

  return {
    cleanup: () => {
      cleanupFunctions?.();
      cleanupFunctions = null;
      if (observer) {
        newsSectionStore.unsubscribe(observer);
      }
      const $gridViewWrapper = document.querySelector(
        '.news-grid-view__wrapper',
      );
      if ($gridViewWrapper) {
        $gridViewWrapper.remove();
      }
    },
  };
};
