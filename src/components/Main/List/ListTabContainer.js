import { ListTab } from "./ListTab";
import "./ListSection.css";
import { makeNode } from "../../../utils/utils";
import { fetchPressListPerCategory } from "../../../mockServer/mockServer";
import { store } from "../../../store";
import { cleanupEventListenerMap } from "../../../infrastructure/domObserver";

/**
 *
 * @param {*} animationDruation <Integer>
 * @returns
 */
export function ListTabContainer(animationDruation = 5) {
  const $el = makeNode(`<div class="list-tab-container"></div>`);

  const root = document.documentElement;
  root.style.setProperty("--animation-time", `${animationDruation}s`);

  const fetchAndRenderCategoryTabs = () => {
    fetchPressListPerCategory().then((pressListPerCategory) => {
      renderCategoryTabs(pressListPerCategory);
      savePressNumberArray(pressListPerCategory);
    });
  };
  const renderCategoryTabs = (pressListPerCategory) => {
    $el.innerHTML = "";
    pressListPerCategory.forEach((category, index) => {
      const listTabPram = {
        tabIndex: index,
        category: category,
        pressId: null,
        stayDuration: animationDruation,
      };
      $el.appendChild(ListTab(listTabPram));
    });
  };
  const renderSubscribedPressTabs = () => {
    const { subscribedIds } = store.state;
    $el.innerHTML = "";
    Array.from(subscribedIds).forEach((id, index) => {
      const listTabPram = {
        tabIndex: index,
        category: {},
        pressId: id,
        stayDuration: animationDruation,
      };
      $el.appendChild(ListTab(listTabPram));
    });
  };
  const savePressNumberArray = (pressListPerCategory) => {
    const tempArr = pressListPerCategory.map((category) => {
      return category.pressIdList.length;
    });
    store.setPressNumPerTab(tempArr);
  };
  const render = () => {
    const { viewOnlySubs } = store.state;
    viewOnlySubs ? renderSubscribedPressTabs() : fetchAndRenderCategoryTabs();
  };

  window.addEventListener("viewOnlySubsChange", render);
  render();

  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("viewOnlySubsChange", render);
  });

  return $el;
}
