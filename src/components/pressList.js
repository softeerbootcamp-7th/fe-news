import pressData from '../data/pressData.json';
import { groupByCategory, CATEGORIES } from '../data/pressCategory.js';
import { createSubButton } from './subButton.js';
import { isSubscribed, subscribe } from '../store/subscription.js';

const categorizedData = groupByCategory(pressData);

export function initPressList() {
  const list = document.querySelector('.provider-list');

  let currentTab = 'all';
  let currentIndex = 0;

  function getListData() {
    return currentTab === 'all' ? pressData : pressData.filter(({ press }) => isSubscribed(press));
  }

  function getCategoryIndexInfo(item) {
    const categoryList = categorizedData[item.category];
    const categoryIndex = categoryList.indexOf(item);

    return {
      index: categoryIndex + 1,
      lastIndex: categoryList.length,
    };
  }

  function renderCategory({ categoryName, index, lastIndex }) {
    const category = document.createElement('div');
    category.className = 'provider-list-category';

    CATEGORIES.forEach((name) => {
      const item = document.createElement('div');
      item.className = 'provider-list-category-item';

      if (name === categoryName) {
        item.classList.add('active');

        const page = document.createElement('span');
        page.className = 'page-indicator';
        page.textContent = `${index} / ${lastIndex}`;

        item.textContent = name;
        item.appendChild(page);
      } else {
        item.textContent = name;
      }

      item.addEventListener('click', () => {
        if (name === categoryName) return;
        moveToCategory(name);
      });

      category.appendChild(item);
    });

    return category;
  }

  function render() {
    list.innerHTML = '';

    const data = getListData();
    const item = data[currentIndex];
    if (!item) return null;

    const { index, lastIndex } = getCategoryIndexInfo(item);

    list.appendChild(
      renderCategory({
        categoryName: item.category,
        index,
        lastIndex,
      }),
    );

    const wrapper = document.createElement('div');
    wrapper.className = 'provider-list-item';

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

    const leftBody = document.createElement('div');
    leftBody.className = 'provider-list-left-body';
    leftBody.appendChild(mainArticle);

    const rightBody = document.createElement('div');
    rightBody.className = 'provider-list-right-body';
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

    const relatedText = document.createElement('p');
    relatedText.className = 'related-text';
    relatedText.textContent = `${item.press} 언론사에서 직접 편집한 뉴스입니다.`;

    rightBody.appendChild(relatedList);
    rightBody.appendChild(relatedText);
    body.append(leftBody, rightBody);

    wrapper.append(header, body);
    list.appendChild(wrapper);

    return {
      page: currentIndex,
      lastPage: data.length - 1,
    };
  }

  function moveToCategory(category) {
    const data = getListData();
    const categoryList = categorizedData[category];
    if (!categoryList || categoryList.length === 0) return;

    const targetItem = categoryList[0];
    const targetIndex = data.indexOf(targetItem);
    if (targetIndex === -1) return;

    currentIndex = targetIndex;
    return render();
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
