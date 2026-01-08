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
  const { subscribedIds } = store.state;
  const isThisCategoryTab = pressId === null;
  let prevActivated = false;

  const repeatTime = 3000;

  const pressName = isThisCategoryTab
    ? ""
    : pressList.find((p) => p.id === pressId).name;

  const $el = makeNode(`
        <div class="list-tab">
            ${isThisCategoryTab ? category.category : pressName}
        </div>
    `);
  $el.onclick = () => {
    isThisCategoryTab
      ? store.setCurrentTabIndex(tabIndex) //카테고리 탭이라면 따로 관리하는 currentTabIndex를 바꾸자.
      : store.jumpPressId(tabIndex); // 언론사 탭이라면 페이지를 바꿔야함. 로직이 그럼
  };
  const $numberBox = makeNode(`<span id="listTab-${tabIndex}"> </span>`);

  /**
   * 자동으로 넘기는 타이머 관리함수
   */

  const startTimer = () => {
    const repeat = () => {
      // 1. 상태 업데이트 (다음 언론사 번호로)
      const { currentPressId } = store.state;
      store.setCurrentPressIdAfterCheck(currentPressId, 1);

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
    const { currentTabIndex, currentPressId } = store.state;
    // 카태고리 탭인 경우, store의 currentTabIndex와 이 컴포넌트의 index가 같으면,
    // 언론사 탭인 경우, store의 현재 페이지와 이 컴포넌트의 index가 같으면 활성화.
    const newActivated = isThisCategoryTab
      ? currentTabIndex === tabIndex
      : currentPressId === tabIndex;

    if (newActivated === false && newActivated === prevActivated) return; //상태 변화가 없으면 그만.

    if (newActivated) {
      $el.appendChild($numberBox);
      $el.classList.add("active");
      startTimer();

      if (isThisCategoryTab)
        $numberBox.textContent = `${currentPressId + 1}/${
          category.pressIdList.length
        }`;
      else $numberBox.innerHTML = RightIcon();
    } else {
      if (prevActivated === true) {
        $el.classList.remove("active");
        $el.innerHTML = isThisCategoryTab ? category.category : pressName;
      }
    }
    prevActivated = newActivated;
  };

  const stopTimerOnGrid = () => {
    const { viewGrid } = store.state;
    if (viewGrid) stopTimer();
  };
  window.addEventListener("viewGridChange", stopTimerOnGrid);
  window.addEventListener("currentPressIdChange", render);

  render();
  return $el;
}
