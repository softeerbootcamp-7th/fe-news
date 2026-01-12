import { PRESS_MODE_TABS, TAB_GROUP } from "@/constants.js";
import { ConfirmModal } from "@/components/ConfirmModal.js";
import { PRESS_LIST } from "@/dummy.js";

/**
 * 앱의 이벤트 리스너를 설정하는 함수
 * @param {Object} params
 * @param {NewsStandObservable} params.newsStandObservable
 */
export const setupEventListeners = ({ newsStandObservable }) => {
  document.getElementById("app").addEventListener("click", (e) => {
    // 탭 클릭 처리
    const tabTarget = e.target.closest("[data-tab-group]");
    if (tabTarget) {
      const { tabItem, tabGroup } = tabTarget.dataset;

      // press mode 탭
      if (tabGroup === TAB_GROUP.PRESS_MODE) {
        newsStandObservable.setPressMode(tabItem);
      }
    }

    // 언론사 클릭 처리
    const pressTarget = e.target.closest("[data-press-id]");
    if (pressTarget) {
      const { pressId } = pressTarget.dataset;
      const id = Number(pressId);
      const currentIds = newsStandObservable.state.subscribedPressIds;

      // 구독한 언론사 클릭 시 모달 표시 (전체/구독 탭 모두)
      if (currentIds.includes(id)) {
        const press = PRESS_LIST.find((p) => p.id === id);
        const modal = ConfirmModal({
          pressName: press?.name || "언론사",
          onConfirm: () => {
            newsStandObservable.removePressId(id);
          },
          onCancel: () => {
            // 아무것도 하지 않음
          },
        });
        document.body.appendChild(modal);
        return;
      }

      // 미구독 언론사 클릭 시 구독 추가
      newsStandObservable.addPressId(id);
    }

    // 이전 페이지 버튼 클릭
    if (e.target.closest("#prev-page-btn")) {
      const currentIdx = newsStandObservable.state.pageIdx;
      if (currentIdx > 0) {
        newsStandObservable.setPageIdx(currentIdx - 1);
      }
    }

    // 다음 페이지 버튼 클릭
    if (e.target.closest("#next-page-btn")) {
      const currentIdx = newsStandObservable.state.pageIdx;
      const totalPages = Math.ceil(96 / 24); // 96개 언론사, 24개씩
      if (currentIdx < totalPages - 1) {
        newsStandObservable.setPageIdx(currentIdx + 1);
      }
    }
  });
};
