import { getCategories, getNewsByCategory } from "../../store/newsStore.js";

let categories = null;

export function initListContent() {
    categories = getCategories();
    return createItem(getNewsByCategory(categories[0])[0]);
}

export function updateListContent({ data, page}) {
    return createItem(data[page]);
}

function createItem(item) {
    const content_container = document.createElement('div');
    content_container.className = 'list-content-container';
    content_container.id = 'list-content-container';
    content_container.style.overflow = 'hidden';

    const new_time = `2026.${item.time.slice(0,2)}.${item.time.slice(4,6)}. ${item.time.slice(8,14)} 편집`;
    content_container.innerHTML = `
        <header class="list-content-header">
            <img id="list-content-header-logo" src=${item.logo}>
            <span id="list-content-header-time" class="display-medium12" style="color:var(--text-default)">${new_time}</span>
            <button>
                <img src="./logos/plus.svg" style="width:12px; height:12px;">
                <span class="available-medium12" style="color:var(--text-weak);">구독하기</span>
            </button>
        </header>
        <section class="list-content-body">
            <div class="list-main-news">
                <div class="list-main-news-image-wrapper">
                    <img id="list-main-news-image" src=${item.mainImg}>
                </div>
                <span id="list-main-news-title" class="available-medium16" style="color:var(--text-strong);">${item.mainTitle}</span>
            </div>
            <ul id="list-related-news" class="list-related-news" style="whiteSpace: nowrap; overflow: hidden"></ul>
        </section>
    `;

    const ul = content_container.querySelector('.list-related-news');
    ul.appendChild(relatedArticle(item));

    return content_container;
}

function relatedArticle(item) {
    const fragment = document.createDocumentFragment();

    item.relatedArticles.forEach(e => {
        const related_article = document.createElement('li');
        related_article.className = "tab available-medium16";
        related_article.innerHTML = e.title;
        related_article.style.whiteSpace = 'nowrap';
        fragment.appendChild(related_article);
    })

    const foot = document.createElement('li');
    foot.className = "foot display-medium14";
    foot.innerHTML = `${item.press} 언론사에서 직접 편집한 뉴스입니다.`
    fragment.appendChild(foot);
    return fragment;
}