import {
  listViewCategoryTabPageIndicatorTemplate,
  listViewCategoryTabsTemplate,
  listViewNewsSectionAdditionalArticlesListTemplate,
  listViewNewsSectionAdditionalArticleTemplate,
  listViewNewsSectionHeaderTemplate,
  listViewNewsSectionMainArticleTemplate,
  listViewNewsSectionMainTemplate,
  listViewNewsSectionTemplate,
  listViewTemplate,
  subscribeButtonTemplate,
  unsubscribeButtonTemplate,
} from '@/templates';

import { insertArrowButtons } from './insert-arrow-buttons';
import { subscribedNewspaperStore } from './stores';

export const createListViewFactory = () => {
  /**
   * @description list view wrapper와 list view를 생성하고 list view를 반환합니다.
   * @returns {HTMLDivElement}
   */
  const createListView = () => {
    const $newsSection = document.querySelector('.news-section');
    $newsSection.insertAdjacentHTML('beforeend', listViewTemplate());

    return $newsSection.querySelector('.news-list-view');
  };

  /**
   * @description list view category tabs를 list view에 삽입합니다.
   * @returns {HTMLUListElement}
   */
  const insertListViewCategoryTabs = ({ $listView }) => {
    $listView.insertAdjacentHTML('beforeend', listViewCategoryTabsTemplate());
  };

  /**
   * @description 선택된 카테고리 버튼을 초기화합니다.
   * @typedef {Object} InitializeSelectedCategoryButtonParams
   * @property {HTMLDivElement} params.$listView
   * @property {Newspaper['category']} params.category
   * @property {ListViewStore['pageIndex']} params.pageIndex
   * @property {number} params.totalPage
   *
   * @param {InitializeSelectedCategoryButtonParams} initializeSelectedCategoryButtonParams
   */
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

  /**
   * @description list view news section을 생성하고 list view news section을 반환합니다.
   *
   * @typedef {Object} InsertListViewNewsSectionParams
   * @property {HTMLDivElement} $listView
   *
   * @param {InsertListViewNewsSectionParams} insertListViewNewsSectionParams
   * @returns {HTMLSectionElement}
   */
  const insertListViewNewsSection = ({ $listView }) => {
    $listView.insertAdjacentHTML('beforeend', listViewNewsSectionTemplate());
    return $listView.querySelector('.news-list-view__newspaper-section');
  };

  /**
   * @typedef {Object} InsertListViewNewsSectionHeaderParams
   * @property {HTMLSectionElement} $listViewNewsSection
   * @property {Newspaper} newspaper
   *
   * @param {InsertListViewNewsSectionHeaderParams} insertListViewNewsSectionHeaderParams
   * @returns {void}
   */
  const insertListViewNewsSectionHeader = ({
    $listViewNewsSection,
    newspaper,
  }) => {
    $listViewNewsSection.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionHeaderTemplate({
        logo: newspaper.logo,
        press: newspaper.press,
        time: newspaper.time,
      }),
    );
  };

  /**
   *
   * @typedef {Object} InsertListViewNewsSubscribeButtonParams
   * @property {HTMLSectionElement} $listViewNewsSection
   * @property {Newspaper} newspaper
   *
   * @param {InsertListViewNewsSubscribeButtonParams} insertListViewNewsSubscribeButtonParams
   * @returns {void}
   * @param {*} param0
   */
  const insertListViewNewsSubscribeButton = ({
    $listViewNewsSection,
    newspaper,
  }) => {
    const isSubscribed = subscribedNewspaperStore.isSubscribed(newspaper.press);
    const subscribeButton = isSubscribed
      ? unsubscribeButtonTemplate({ hasText: false })
      : subscribeButtonTemplate();
    const $listViewHeader = $listViewNewsSection.querySelector(
      '.news-list-view__newspaper-section__header',
    );
    $listViewHeader.insertAdjacentHTML('beforeend', subscribeButton);
  };

  /**
   *
   * @typedef {Object} InsertListViewNewsSectionMainParams
   * @property {HTMLSectionElement} $listViewNewsSection
   *
   * @param {InsertListViewNewsSectionMainParams} insertListViewNewsSectionMainParams
   * @returns {HTMLDivElement}
   */
  const insertListViewNewsSectionMain = ({ $listViewNewsSection }) => {
    $listViewNewsSection.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionMainTemplate(),
    );

    return $listViewNewsSection.querySelector(
      '.news-list-view__newspaper-section__main',
    );
  };

  /**
   *
   * @typedef {Object} InsertListViewNewsSectionMainArticleParams
   * @property {HTMLDivElement} $listViewNewsSectionMain
   * @property {Newspaper} newspaper
   *
   * @param {InsertListViewNewsSectionMainArticleParams} insertListViewNewsSectionMainArticleParams
   * @returns {void}
   */
  const insertListViewNewsSectionMainArticle = ({
    $listViewNewsSectionMain,
    newspaper,
  }) => {
    $listViewNewsSectionMain.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionMainArticleTemplate({
        mainTitle: newspaper.mainTitle,
        mainLink: newspaper.mainLink,
        mainImg: newspaper.mainImg,
      }),
    );
  };

  /**
   *
   * @typedef {Object} InsertListViewNewsSectionAdditionalArticlesListParams
   * @property {HTMLDivElement} $listViewNewsSectionMain
   * @property {Newspaper} newspaper
   *
   * @param {InsertListViewNewsSectionAdditionalArticlesListParams} insertListViewNewsSectionAdditionalArticlesListParams
   * @returns {HTMLUListElement}
   */
  const insertListViewNewsSectionAdditionalArticlesList = ({
    $listViewNewsSectionMain,
    newspaper,
  }) => {
    $listViewNewsSectionMain.insertAdjacentHTML(
      'beforeend',
      listViewNewsSectionAdditionalArticlesListTemplate({
        press: newspaper.press,
      }),
    );

    return $listViewNewsSectionMain.querySelector('ul');
  };

  /**
   *
   * @typedef {Object} InsertListViewNewsSectionAdditionalArticleListParams
   * @property {HTMLUListElement} $listViewNewsSectionAdditionalArticlesList
   * @property {Newspaper} newspaper
   *
   * @param {InsertListViewNewsSectionAdditionalArticleListParams} insertListViewNewsSectionAdditionalArticleListParams
   * @returns {void}
   */
  const insertListViewNewsSectionAdditionalArticleList = ({
    $listViewNewsSectionAdditionalArticlesList,
    newspaper,
  }) => {
    const listViewNewsSectionAdditionalArticleList = newspaper.relatedArticles
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

  /**
   * @typedef {Object} InitializeListViewParams
   * @property {HTMLDivElement} $listView
   * @property {Newspaper['category']} category
   * @property {ListViewStore['pageIndex']} pageIndex
   * @property {number} totalPage
   * @property {Newspaper[]} newspaperList
   *
   * @param {InitializeListViewParams} initializeListViewParams
   *
   */
  const initializeListView = ({
    $listView,
    category,
    pageIndex,
    totalPage,
    newspaperList,
  }) => {
    insertListViewCategoryTabs({ $listView });

    initializeSelectedCategoryButton({
      $listView,
      category,
      pageIndex,
      totalPage,
    });

    const $listViewNewsSection = insertListViewNewsSection({ $listView });

    insertListViewNewsSectionHeader({
      $listViewNewsSection,
      newspaper: newspaperList[pageIndex],
    });
    insertListViewNewsSubscribeButton({
      $listViewNewsSection,
      newspaper: newspaperList[pageIndex],
    });
    const $listViewNewsSectionMain = insertListViewNewsSectionMain({
      $listViewNewsSection,
    });

    insertListViewNewsSectionMainArticle({
      $listViewNewsSectionMain,
      newspaper: newspaperList[pageIndex],
    });
    const $listViewNewsSectionAdditionalArticlesList =
      insertListViewNewsSectionAdditionalArticlesList({
        $listViewNewsSectionMain,
        newspaper: newspaperList[pageIndex],
      });

    insertListViewNewsSectionAdditionalArticleList({
      $listViewNewsSectionAdditionalArticlesList,
      newspaper: newspaperList[pageIndex],
    });

    insertArrowButtons({
      parentElement: $listView,
      position: 'both',
      leftButtonClassName: 'news-list-view__left-arrow',
      rightButtonClassName: 'news-list-view__right-arrow',
    });
  };

  return {
    createListView,
    insertListViewCategoryTabs,
    initializeSelectedCategoryButton,
    insertListViewNewsSection,
    insertListViewNewsSectionHeader,
    insertListViewNewsSubscribeButton,
    insertListViewNewsSectionMain,
    insertListViewNewsSectionMainArticle,
    insertListViewNewsSectionAdditionalArticlesList,
    insertListViewNewsSectionAdditionalArticleList,
    initializeListView,
  };
};
