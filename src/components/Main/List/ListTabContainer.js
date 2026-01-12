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

  let isMouseDown = false;
  let startX = 0;
  let scrollLeftPos = 0;
  $el.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    // 클릭한 지점의 마우스 좌표에서 요소의 왼쪽 여백을 뺍니다.
    startX = e.pageX - $el.offsetLeft;
    scrollLeftPos = $el.scrollLeft;
  });

  const endDrag = (e) => {
    e.stopPropagation();
    isMouseDown = false;
  };
  $el.addEventListener("mouseleave", endDrag);
  $el.addEventListener("mouseup", endDrag);
  $el.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();

    // 현재 마우스 위치
    const x = e.pageX - $el.offsetLeft;

    // 이동 거리 계산 (현재 위치 - 시작 위치)
    // 곱하기 4는 감도(속도) 조절입니다.
    const walk = (x - startX) * 1;

    // 핵심: "처음 스크롤 위치"에서 "움직인 거리"를 뺍니다.
    // 마우스를 오른쪽으로 밀면(walk가 양수), 스크롤은 왼쪽으로 가야 하므로 뺍니다.
    $el.scrollLeft = scrollLeftPos - walk;
  });

  const getPositionOfActivatedTab = () => {
    const { viewOnlySubs, currentTabIndex, listViewPage } = store.state;
    const targetTab = viewOnlySubs ? listViewPage : currentTabIndex;

    const childRectArr = $el.querySelectorAll(`.list-tab`);
    const activeChild = childRectArr[targetTab];

    if (!activeChild) return;

    const thisRect = $el.getBoundingClientRect();
    const childRect = activeChild.getBoundingClientRect();

    // 1. 컨테이너 왼쪽 끝에서 자식 왼쪽 끝까지의 상대적 거리 (현재 뷰포트 기준)
    const relativeLeft = childRect.left - thisRect.left;
    // 2. 컨테이너 왼쪽 끝에서 자식 오른쪽 끝까지의 상대적 거리
    const relativeRight = childRect.right - thisRect.left;

    // 오른쪽이 잘리는 경우
    if (relativeRight > thisRect.width) {
      // 현재 스크롤 위치에서 모자란 만큼 더 이동 (+ 여유분 30px)
      $el.scrollTo({
        left: $el.scrollLeft + (relativeRight - thisRect.width) + 30,
        behavior: "smooth",
      });
    }
    // 왼쪽으로 가려진 경우 (스크롤로 이미 넘어가버린 경우)
    else if (relativeLeft < 0) {
      // 현재 스크롤 위치에서 가려진 만큼 왼쪽으로 이동 (- 여유분 30px)
      $el.scrollTo({
        left: $el.scrollLeft + relativeLeft - 30,
        behavior: "smooth",
      });
    }
  };

  window.addEventListener("tabIndexChange", getPositionOfActivatedTab);
  window.addEventListener("listViewPageChange", getPositionOfActivatedTab);

  window.addEventListener("viewOnlySubsChange", render);
  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("viewOnlySubsChange", render);
  });
  render();

  return $el;
}
