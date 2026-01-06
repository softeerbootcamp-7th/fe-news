import { initRollingNews } from './components/rollingNews.js';
import { initSubscriptionBadge } from './components/subBadge.js';
import { initPressGrid } from './components/pressGrid.js';
import { initNavigation } from './components/navigation.js';
import { initTextTabs } from './components/textTabs.js';
import { initIconTabs } from './components/iconTabs.js';
import { initProviderView } from './components/providerView.js';

initRollingNews();
initSubscriptionBadge();

const grid = initPressGrid();

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

initTextTabs(tab => {
    const state = grid.setTab(tab);
    navigation.update(state);
});

const providerView = initProviderView();

initIconTabs(view => {
    providerView.setView(view);
});
