import { NEWS_SECTION_STATE } from '@/constants';
import { newsSectionStore } from '@/models';
export const NewsSectionHeader = () => {
  const $newsSectionHeader = document.querySelector('.news-section__header');

  const toggleTypeButton = () => {
    const $totalButton = $newsSectionHeader.querySelector(
      '[data-type="total"]',
    );
    const $subscribedButton = $newsSectionHeader.querySelector(
      '[data-type="subscribed"]',
    );
    $totalButton.classList.toggle(
      'news-section__header__buttons__item--total--selected',
    );
    $subscribedButton.classList.toggle(
      'news-section__header__buttons__item--subscribed--selected',
    );
  };

  const toggleViewButton = () => {
    const $viewButtonList = $newsSectionHeader.querySelectorAll('[data-view]');

    $viewButtonList.forEach((button) => {
      button.classList.toggle(
        'news-section__header__view-toggle-group__item--selected',
      );
    });
  };

  const handleClick = (event) => {
    const $button = event.target.closest('[data-type], [data-view]');
    if (!$button) {
      return;
    }
    const type = $button.dataset.type;
    const view = $button.dataset.view;
    if (type) {
      const currentType = newsSectionStore.getState().type;
      const newType =
        type === NEWS_SECTION_STATE.TYPE.TOTAL
          ? NEWS_SECTION_STATE.TYPE.TOTAL
          : NEWS_SECTION_STATE.TYPE.SUBSCRIBED;
      if (currentType === newType) {
        return;
      }
      newsSectionStore.setType(newType);
      toggleTypeButton();
    }

    if (view) {
      const currentView = newsSectionStore.getState().view;
      const newView =
        view === NEWS_SECTION_STATE.VIEW.GRID
          ? NEWS_SECTION_STATE.VIEW.GRID
          : NEWS_SECTION_STATE.VIEW.LIST;
      if (currentView === newView) {
        return;
      }
      newsSectionStore.setView(newView);
      toggleViewButton();
    }
  };

  $newsSectionHeader.addEventListener('click', handleClick);
  return {
    cleanup: () => {
      $newsSectionHeader.removeEventListener('click', handleClick);
    },
  };
};
