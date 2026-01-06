import { pressLogos, PER_PAGE } from '../data/pressLogo.js';
import { createSubButton } from './subButton.js';
import { isSubscribed } from '../state/subscription.js';
import { shuffle } from '../utils/utils.js';

export function initPressGrid() {
    const grid = document.querySelector('.provider-grid');

    let currentTab = 'all';
    let currentPage = 0;

    const shuffledPressLogos = shuffle(pressLogos);

    function getGridData() {
        return currentTab === 'all' ? shuffledPressLogos : shuffledPressLogos.filter(({ id }) => isSubscribed(id));
    }

    function render() {
        grid.innerHTML = '';

        const data = getGridData();
        const lastPage = Math.max(0, Math.ceil(data.length / PER_PAGE) - 1);

        const start = currentPage * PER_PAGE;
        const items = data.slice(start, start + PER_PAGE);

        items.forEach(({ id, src, name }) => {
            const li = document.createElement('li');
            li.className = 'provider-item';

            const wrapper = document.createElement('div');
            wrapper.className = 'provider-logo-wrapper';

            const logo = document.createElement('img');
            logo.src = src;
            logo.alt = name ?? '';
            logo.className = 'provider-logo';

            const subButton = createSubButton(id);

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

    return {
        render,
        setTab,
        goPrev,
        goNext,
    };
}
