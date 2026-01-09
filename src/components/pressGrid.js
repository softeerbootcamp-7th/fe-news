import { pressLogos, PER_PAGE } from '../data/pressLogo.js';
import { createSubButton } from './subButton.js';
import { isSubscribed, subscribe } from '../store/subscription.js';
import { shuffle } from '../utils/utils.js';

export function initPressGrid() {
  const grid = document.querySelector('.provider-grid');

  let currentTab = 'all';
  let currentPage = 0;

  const shuffledPressLogos = shuffle(pressLogos);

  function getGridData() {
    return currentTab === 'all'
      ? shuffledPressLogos
      : shuffledPressLogos.filter(({ id }) => isSubscribed(id));
  }

  function getLastPage(length) {
    return Math.max(0, Math.ceil(length / PER_PAGE) - 1);
  }

  function render() {
    grid.innerHTML = '';

    const data = getGridData();
    const lastPage = getLastPage(data.length);

    const start = currentPage * PER_PAGE;
    const items = data.slice(start, start + PER_PAGE);

    items.forEach(({ id, src }) => {
      const li = document.createElement('li');
      li.className = 'provider-item';

      const wrapper = document.createElement('div');
      wrapper.className = 'provider-logo-wrapper';

      const logo = document.createElement('img');
      logo.src = src;
      logo.alt = id;
      logo.loading = 'lazy';
      logo.className = 'provider-logo';

      const subButton = createSubButton(id, pressGrid);

      wrapper.append(logo, subButton);
      li.appendChild(wrapper);
      grid.appendChild(li);
    });

    // 빈 칸 채우기
    for (let i = items.length; i < PER_PAGE; i++) {
      const li = document.createElement('li');
      li.className = 'provider-item provider-item--empty';
      grid.appendChild(li);
    }

    return { page: currentPage, lastPage };
  }

  function update() {
    const data = getGridData();
    const lastPage = getLastPage(data.length);
    if (currentPage > lastPage) {
      currentPage = lastPage;
    }
    return render();
  }

  function setTab(tab) {
    currentTab = tab;
    currentPage = 0;
    return render();
  }

  function goPrev() {
    if (currentPage === 0) return null;
    currentPage--;
    return render();
  }

  function goNext() {
    const data = getGridData();
    const lastPage = Math.ceil(data.length / PER_PAGE) - 1;
    if (currentPage >= lastPage) return null;
    currentPage++;
    return render();
  }

  const unsubscribe = subscribe(update);

  const pressGrid = {
    render,
    setTab,
    goPrev,
    goNext,
    update,
    destroy() {
      unsubscribe();
    },
  };

  return pressGrid;
}
