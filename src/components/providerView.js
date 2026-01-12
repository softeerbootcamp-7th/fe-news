export function initProviderView() {
  const gridView = document.querySelector('.provider-grid');
  const listView = document.querySelector('.provider-list');

  function setView(view) {
    gridView.classList.toggle('view--active', view === 'grid');
    listView.classList.toggle('view--active', view === 'list');
  }

  return { setView };
}
