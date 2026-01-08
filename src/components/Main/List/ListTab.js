import { pressList, store } from "../../../store";
import { makeNode } from "../../../utils/utils";
import { RightIcon } from "../../icons/RightIcon";

/**
 * 
 * @param category: {
 *          name: "종합/경제"
 *          pressNum: 10
 *         },
          subscribedPress: pressName
          }
 * @returns element
 */
export function ListTab({ tabIndex = 0, category = {}, pressId = null }) {
  const isThisCategoryTab = pressId === null;
  let prevActivated = false;

  const repeatTime = 20000;

  const pressName = isThisCategoryTab
    ? ""
    : pressList.find((p) => p.id === pressId).name;

  const $el = makeNode(`
        <div class="list-tab" id="${pressId}">
          <div class="list-tab-contents">${
            isThisCategoryTab ? category.category : pressName
          }</div>
        </div>
    `);
  $el.onclick = () => {
    if (prevActivated) return;
    isThisCategoryTab
      ? store.setCurrentTabIndex(tabIndex) //카테고리 탭이라면 따로 관리하는 currentTabIndex를 바꾸자.
      : store.jumpPressId(tabIndex); // 언론사 탭이라면 페이지를 바꿔야함. 로직이 그럼
  };

  const $contentRegion = $el.querySelector(".list-tab-contents");
  const $numberBox = makeNode(`<span id="listTab-${tabIndex}"> </span>`);

  const $progressBar = makeNode(`
          <div class="list-tab-progress-bar"> </div>`);

  /**
   * 자동으로 넘기는 타이머 관리함수
   */

  const startTimer = () => {
    const repeat = () => {
      // 1. 상태 업데이트 (다음 언론사 번호로)
      const { listViewPage } = store.state;
      store.setListViewPageAfterCheck(listViewPage, 1);

      // 2. 재귀 호출: 다시 n초 뒤에 repeat을 실행
      store.setTimerId(setTimeout(repeat, repeatTime));
    };

    // 최초 실행
    store.setTimerId(setTimeout(repeat, repeatTime));
  };

  const stopTimer = () => {
    const { timerId } = store.state;
    if (timerId) {
      store.clearTimerId();
      store.setTimerId(null); // ID 초기화
    }
  };

  /**
   * 렌더링 함수
   */
  const render = () => {
    const { currentTabIndex, listViewPage } = store.state;
    // 카태고리 탭인 경우, store의 currentTabIndex와 이 컴포넌트의 index가 같으면,
    // 언론사 탭인 경우, store의 현재 페이지와 이 컴포넌트의 index가 같으면 활성화.
    const newActivated = isThisCategoryTab
      ? currentTabIndex === tabIndex
      : listViewPage === tabIndex;

    if (newActivated === false && newActivated === prevActivated) return; //상태 변화가 없으면 그만.

    if (newActivated) {
      $contentRegion.appendChild($numberBox);
      $el.appendChild($progressBar);
      $el.classList.add("active");

      if (isThisCategoryTab) {
        $numberBox.textContent = `${listViewPage + 1}/${
          category.pressIdList.length
        }`;
        store.setCurrentPressId(category.pressIdList[listViewPage]);
      } else {
        $numberBox.innerHTML = RightIcon();
        store.setCurrentPressId(pressId);
      }
      startTimer();
    } else {
      if (prevActivated === true) {
        $el.classList.remove("active");
        $contentRegion.innerHTML = isThisCategoryTab
          ? category.category
          : pressName;
        $el.removeChild($progressBar);
      }
    }
    prevActivated = newActivated;
  };

  const stopTimerOnGrid = () => {
    const { viewGrid } = store.state;
    if (viewGrid) stopTimer();
  };
  window.addEventListener("viewGridChange", stopTimerOnGrid);
  window.addEventListener("listViewPageChange", render);

  render();
  return $el;
}
