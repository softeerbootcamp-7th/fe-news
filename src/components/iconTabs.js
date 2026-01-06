export function initIconTabs(onChange) {
    let currentView = 'grid';

    const tabs = document.querySelectorAll('.icon-tab');

    function setView(view) {
        if (view === currentView) return;

        currentView = view;
        updateActiveView();
        onChange(view);
    }

    function updateActiveView() {
        tabs.forEach(tabEl => {
            const view = tabEl.dataset.view;
            tabEl.classList.toggle('icon-tab--active', view === currentView);
        });
    }

    tabs.forEach(tabEl => {
        tabEl.addEventListener('click', () => {
            setView(tabEl.dataset.view);
        });
    });
}
