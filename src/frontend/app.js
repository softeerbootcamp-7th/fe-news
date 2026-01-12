import { renderPressToDOM } from './utils/pressRenderer.js';
import { renderNewsGrid } from './components/news-grid/newsGrid.js';
import { renderNewsstandHeader } from './components/newsstand-header/newsstandHeader.js';
import { renderNewsTicker } from './components/news-ticker/newsTicker.js';
import { renderPressHeader } from './components/press-header/pressHeader.js';
import { observeStore } from './store/observeStore.js';
import { shallowEqual } from './utils/compare.js';
import { selectors as gridSelectors } from './store/modules/grid.js';
import { selectors as rollingSelectors } from './store/modules/rolling.js';

// 정적 요소 렌더링
renderNewsstandHeader('#newsstand-header-container');

// 동적 요소 렌더링
observeStore(
  (state) => rollingSelectors.getNewsList(state.rolling || {}),
  (newsList) => {
    renderNewsTicker('#news-ticker-container', newsList);
  },
  shallowEqual
);

observeStore(
  (state) => ({ 
    currentTab: state.grid?.currentTab || 'all', 
    subscribedCount: (state.grid?.subscribedIds || []).length 
  }),
  (selectedState) => {
    renderPressHeader('#press-header-container', selectedState);
  },
  shallowEqual
);

observeStore(
  (state) => gridSelectors.getFilteredPress(state.grid || {}),
  (filteredPress) => { 
    renderPressToDOM(filteredPress, '.press-content');
    renderNewsGrid('.press-content', 'auto');
  },
  shallowEqual
);
