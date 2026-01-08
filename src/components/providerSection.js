import { initPressGrid } from './pressGrid';
import { initNavigation } from './navigation';
import { initTextTabs } from './textTabs';
import { initIconTabs } from './iconTabs';
import { initProviderView } from './providerView';

export function initProviderSection() {
  const grid = initPressGrid();
  const providerView = initProviderView();

  const navigation = initNavigation({
    onPrev: () => {
      const state = grid.goPrev();
      if (state) navigation.update(state);
    },
    onNext: () => {
      const state = grid.goNext();
      if (state) navigation.update(state);
    },
  });

  navigation.update(grid.render());

  initTextTabs((tab) => {
    const state = grid.setTab(tab);
    navigation.update(state);
  });

  initIconTabs((view) => {
    providerView.setView(view);
  });
}
