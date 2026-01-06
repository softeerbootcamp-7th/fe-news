export function initProviderView() {
    const gridView = document.querySelector('.view--grid');
    const listView = document.querySelector('.view--list');

    function setView(view) {
        gridView.classList.toggle('view--active', view === 'grid');
        listView.classList.toggle('view--active', view === 'list');
    }

    return { setView };
}
