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
  const maxPressIndex = isThisCategoryTab
    ? category.pressNames.length - 1
    : Array.from(subscribedIds).length - 1;

  const repeatTime = 500;

  const pressName = isThisCategoryTab
    ? ""
    : pressList.find((p) => p.id === pressId).name;

  const $el = makeNode(`
        <div class="list-tab">
            ${isThisCategoryTab ? category.category : pressName}
        </div>
    `);
  $el.onclick = () => {
    store.setCurrentTabIndex(tabIndex);
  };
  const $numberBox = makeNode(`<span id="listTab-${tabIndex}"> </span>`);

  /**
   * 자동으로 넘기는 타이머 관리함수
   */

  const startTimer = () => {
    const { timerId } = store.state;
    // 중복 실행 방지: 이미 타이머가 있다면 먼저 죽이고 새로 시작
    if (timerId) store.clearTimerId();

    const repeat = () => {
      const { currentPressNumber } = store.state;

      // 1. 상태 업데이트 (다음 언론사 번호로)
      // 현재 번호를 가져와서 +1 하는 로직이 store에 있으면 좋습니다.
      if (isThisCategoryTab) {
        if (currentPressNumber === maxPressIndex)
          //카테고리 탭일 땐 언론사 늘리다가 마지막에 다음 탭
          store.setCurrentTabIndex(tabIndex + 1);
        else {
          store.setCurrentPressNumber(1);
          store.setTimerId(setTimeout(repeat, repeatTime));
        }
      }
      //구독한 언론사 탭일땐 바로바로 다음 탭
      else store.setCurrentTabIndex(tabIndex + 1);

      // 2. 재귀 호출: 다시 2초 뒤에 repeat을 실행
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
    const { currentPage, currentPressNumber } = store.state;
    const newActivated = tabIndex === currentPage;

    if (!newActivated && newActivated === prevActivated) return;

    if (newActivated) {
      $el.appendChild($numberBox);
      $el.classList.add("active");
      startTimer();

      if (isThisCategoryTab)
        $numberBox.textContent = `${currentPressNumber + 1}/${
          category.pressNames.length
        }`;
      else $numberBox.innerHTML = RightIcon();
    } else {
      if (prevActivated === true) {
        $el.classList.remove("active");
        stopTimer();
        $el.innerHTML = isThisCategoryTab ? category.category : pressName;
      }
    }
    prevActivated = newActivated;
  };

  window.addEventListener("pageChange", render);
  window.addEventListener("currentPressNumberChange", render);
  window.addEventListener("viewOnlySubsChange", stopTimer);
  window.addEventListener("viewGridChange", stopTimer);

  render();
  return $el;
}
