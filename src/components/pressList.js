import pressData from '../data/pressData.json';
import { groupByCategory } from '../data/pressCategory.js';
import { createSubButton } from './subButton.js';
import { isSubscribed, subscribe } from '../store/subscription.js';

let currentTab = 'all';

const categorizedData = groupByCategory(pressData);
console.log(categorizedData);

export function initPressList() {
  const list = document.querySelector('.provider-list');

  let currentTab = 'all';
  let currentIndex = 0;

  function getListData() {
    return currentTab === 'all'
      ? pressData
      : pressData.filter(({ press }) => isSubscribed(press));
  }

  function renderCategory({ index, lastIndex }) {
    const category = document.createElement('div');
    category.className = 'provider-list-category';

    CATEGORIES.forEach((name, i) => {
      const item = document.createElement('div');
      item.className = 'provider-list-category-item';

      if (i === 0) {
        item.classList.add('active');

        const page = document.createElement('span');
        page.className = 'page-indicator';
        page.textContent = `${index} / ${lastIndex}`;

        item.textContent = name;
        item.appendChild(page);
      } else {
        item.textContent = name;
      }

      category.appendChild(item);
    });

    return category;
  }

  function render() {
    list.innerHTML = '';

    const data = getListData();
    const item = data[currentIndex];
    if (!item) return null;

    const category = renderCategory({
      index: currentIndex + 1,
      lastIndex: data.length,
    });
    list.appendChild(category);

    const li = document.createElement('div');
    li.className = 'provider-list-item';

    const header = document.createElement('header');
    header.className = 'provider-list-header';

    const pressInfo = document.createElement('div');
    pressInfo.className = 'press-info';

    const logo = document.createElement('img');
    logo.className = 'press-logo';
    logo.src = item.logo;
    logo.alt = item.press;

    const time = document.createElement('span');
    time.className = 'press-time';
    time.textContent = item.time;

    const subButton = createSubButton(item.press);

    pressInfo.append(logo, time, subButton);
    header.appendChild(pressInfo);

    const body = document.createElement('div');
    body.className = 'provider-list-body';

    const mainArticle = document.createElement('a');
    mainArticle.className = 'main-article';
    mainArticle.href = item.mainLink;
    mainArticle.target = '_blank';

    const mainImg = document.createElement('img');
    mainImg.className = 'main-image';
    mainImg.src = item.mainImg;
    mainImg.alt = item.mainTitle;

    const mainTitle = document.createElement('h3');
    mainTitle.className = 'main-title';
    mainTitle.textContent = item.mainTitle;

    mainArticle.append(mainImg, mainTitle);

    const relatedList = document.createElement('ul');
    relatedList.className = 'related-articles';

    item.relatedArticles.forEach(({ title, link }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link;
      a.target = '_blank';
      a.textContent = title;
      li.appendChild(a);
      relatedList.appendChild(li);
    });

    body.append(mainArticle, relatedList);

    li.append(header, body);
    list.appendChild(li);

    return {
      page: currentIndex,
      lastPage: data.length,
    };
  }

  function setTab(tab) {
    currentTab = tab;
    currentIndex = 0;
    return render();
  }

  function goPrev() {
    if (currentIndex === 0) return null;
    currentIndex--;
    return render();
  }

  function goNext() {
    const data = getListData();
    if (currentIndex >= data.length - 1) return null;
    currentIndex++;
    return render();
  }

  const unsubscribe = subscribe(render);

  return {
    render,
    setTab,
    goPrev,
    goNext,
    destroy() {
      unsubscribe();
    },
  };
}
