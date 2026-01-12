import { renderList } from "./renderListView";
import { renderGrid } from "./renderPress";

export const selectViewType = () => {
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = ''

    renderGrid(newsContainer);

    const listViewBtn = document.querySelector('.list-view');
    const gridViewBtn = document.querySelector('.grid-view');

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('selected');
        gridViewBtn.classList.remove('selected');

        newsContainer.innerHTML = ''

        renderList(newsContainer);
    })

    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('selected');
        listViewBtn.classList.remove('selected');

        newsContainer.innerHTML = '';

        renderGrid(newsContainer);
    })
}