const ITEMS_PER_PAGE = 24;

export function renderGrid({container, data, page}) {
    container.innerHTML = '';

    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = data.slice(start, end);

    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
        const cell = document.createElement("div");
        cell.className = "news-item";

        const press = pageItems[i];

        if (press) {
            const img = document.createElement("img");
            img.src = press.logo;
            img.alt = press.name;
            cell.appendChild(img);
        }
        container.appendChild(cell);
    }
}