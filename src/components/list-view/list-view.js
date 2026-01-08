import {
  getArrowButtonPosition,
  getNewspaperForList,
  insertArrowButtons,
  listViewStore,
} from '@/models';
import {
  listViewCategoryTabPageIndicatorTemplate,
  listViewNewsSectionAdditionalArticlesListTemplate,
  listViewNewsSectionAdditionalArticleTemplate,
  listViewNewsSectionHeaderTemplate,
  listViewNewsSectionMainArticleTemplate,
  listViewNewsSectionMainTemplate,
  listViewNewsSectionTemplate,
  listViewTemplate,
} from '@/templates';

export const ListView = async () => {
  const createListView = () => {
    const $newsSection = document.querySelector('.news-section');
    $newsSection.insertAdjacentHTML('beforeend', listViewTemplate());

    return $newsSection.querySelector('.news-list-view');
  };

  const initializeSelectedCategoryButton = ({
    $listView,
    category,
    pageIndex,
    totalPage,
  }) => {
    const $selectedCategoryButton = $listView.querySelector(
      `[data-category="${category}"]`,
    );
    $selectedCategoryButton.classList.add(
      'news-list-view__category-tabs__item--selected',
    );

    $selectedCategoryButton.insertAdjacentHTML(
      'beforeend',
      listViewCategoryTabPageIndicatorTemplate({
        pageIndex,
        totalPage,
      }),
    );
  };

  const insertListViewNewsSection = ($listView) => {
    $listView.insertAdjacentHTML('beforeend', listViewNewsSectionTemplate());
    return $listView.querySelector('.news-list-view__newspaper-section');
  };

  const insertListViewNewsSectionHeader = ($listViewNewsSection) => {
    $listViewNewsSection.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionHeaderTemplate({
        logo: newspaperList[pageIndex].logo,
        press: newspaperList[pageIndex].press,
        time: newspaperList[pageIndex].time,
      }),
    );
  };

  const insertListViewNewsSectionMain = ($listViewNewsSection) => {
    $listViewNewsSection.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionMainTemplate(),
    );

    return $listViewNewsSection.querySelector(
      '.news-list-view__newspaper-section__main',
    );
  };

  const insertListViewNewsSectionMainArticle = ($listViewNewsSectionMain) => {
    $listViewNewsSectionMain.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionMainArticleTemplate({
        mainTitle: newspaperList[pageIndex].mainTitle,
        mainLink: newspaperList[pageIndex].mainLink,
        mainImg: newspaperList[pageIndex].mainImg,
      }),
    );
  };

  const insertListViewNewsSectionAdditionalArticlesList = (
    $listViewNewsSectionMain,
  ) => {
    $listViewNewsSectionMain.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionAdditionalArticlesListTemplate({
        press: newspaperList[pageIndex].press,
      }),
    );

    return $listViewNewsSectionMain.querySelector('ul');
  };

  const insertListViewNewsSectionAdditionalArticleList = (
    $listViewNewsSectionAdditionalArticlesList,
  ) => {
    const listViewNewsSectionAdditionalArticleList = newspaperList[
      pageIndex
    ].relatedArticles
      .map((article) =>
        listViewNewsSectionAdditionalArticleTemplate({
          title: article.title,
          link: article.link,
        }),
      )
      .join('');

    $listViewNewsSectionAdditionalArticlesList.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionAdditionalArticleList,
    );
  };

  const { category, pageIndex } = listViewStore.getState();
  const { newspaperList } = await getNewspaperForList({ category });

  const totalPage = newspaperList.length - 1;
  listViewStore.setTotalPage(totalPage);

  const $listView = createListView();

  initializeSelectedCategoryButton({
    $listView,
    category,
    pageIndex,
    totalPage,
  });

  const $listViewNewsSection = insertListViewNewsSection($listView);

  insertListViewNewsSectionHeader($listViewNewsSection);
  const $listViewNewsSectionMain =
    insertListViewNewsSectionMain($listViewNewsSection);

  insertListViewNewsSectionMainArticle($listViewNewsSectionMain);
  const $listViewNewsSectionAdditionalArticlesList =
    insertListViewNewsSectionAdditionalArticlesList($listViewNewsSectionMain);

  insertListViewNewsSectionAdditionalArticleList(
    $listViewNewsSectionAdditionalArticlesList,
  );

  insertArrowButtons({
    parentElement: $listView,
    position: getArrowButtonPosition(pageIndex, totalPage),
    leftButtonClassName: 'news-list-view__left-arrow',
    rightButtonClassName: 'news-list-view__right-arrow',
  });
};
