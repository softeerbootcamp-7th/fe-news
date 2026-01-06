export function initTextTabs(onChange) {
    let currentTab = 'all';

    const tabs = document.querySelectorAll('.text-tab');

    function setTab(tab) {
        if (tab === currentTab) return;

        currentTab = tab;
        updateActiveTab();
        onChange(tab);
    }

    function updateActiveTab() {
        tabs.forEach(tabEl => {
            const tab = tabEl.dataset.tab;
            tabEl.classList.toggle('text-tab--active', tab === currentTab);
        });
    }

    tabs.forEach(tabEl => {
        tabEl.addEventListener('click', () => {
            setTab(tabEl.dataset.tab);
        });
    });
}
