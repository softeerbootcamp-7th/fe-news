export function createLayout() {
  return `
    <header class="ns-header">
      <h1 class="ns-logo" aria-label="뉴스스탠드">뉴스스탠드</h1>
      <div class="ns-date">
        <time datetime="2026-01-14">2026. 01. 14. 수요일</time>
      </div>
    </header>

    <main class="ns-main">
      <!-- 최신 뉴스 롤링 섹션 -->

      <section class="ns-controls" aria-label="언론사 목록 보기 설정">
        <!-- 전체/구독 탭 -->
        <div class="ns-controls__left">
          <h2 class="ns-controls__title">전체 언론사</h2>

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
              <span class="ns-tab__badge" aria-label="구독한 언론사 수">8</span>
            </button>
          </div>
        </div>

        <!-- 그리드/리스트 뷰 전환 -->
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
            아이콘
          </button>
        </div>
      </section>

      <!-- 그리드 섹션 -->
      <section class="ns-grid-section" aria-label="전체 언론사 목록">
        <div class="ns-grid" role="list" data-role="publisher-grid"></div>
      </section>
    </main>
  `;
}
