import { createEl } from "../lib/dom";

export const createControls = () => {
  const html = `
      <div class="ns-controls__left">
        <div class="ns-tabs" role="tablist" aria-label="언론사 범위 선택">
          <button
            class="ns-tab ns-tab--active"
            type="button"
            role="tab"
            aria-selected="true"
          >
            전체 언론사
          </button>

          <button
            class="ns-tab"
            type="button"
            role="tab"
            aria-selected="false"
          >
            내가 구독한 언론사
            <span
              class="ns-tab__badge"
              aria-label="구독한 언론사 수"
            >
              8
            </span>
          </button>
        </div>
      </div>

      <div class="ns-controls__right" aria-label="보기 방식 선택">
        <button
          class="ns-view-toggle ns-view-toggle--active"
          type="button"
          aria-pressed="true"
          aria-label="그리드로 보기"
        >
          그리드
        </button>

        <button
          class="ns-view-toggle"
          type="button"
          aria-pressed="false"
          aria-label="리스트로 보기"
        >
          리스트
        </button>
      </div>
  `;

  const controlsWrapper = createEl("section", "ns-controls", html);
  controlsWrapper.setAttribute("aria-label", "언론사 목록 보기 설정");

  return controlsWrapper;
};
