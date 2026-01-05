export function PressListView({
  categoryList,
  category,
  totalPressNum,
  currentPressNum,
  pressData,
}) {
  return `
    <nav class="press-tabs" aria-label="언론사 카테고리">
      <button
        class="press-tabs__item active"
        style="--progress: 20%"
        aria-current="true"
      >
        <p class="display-bold-14">종합/경제</p>
        <p class="display-bold-12">
          1
          <span> / 81 </span>
        </p>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.48329 10.5L4.66663 9.68333L7.34996 7L4.66663 4.31667L5.48329 3.5L8.98329 7L5.48329 10.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button class="press-tabs__item">
        <p class="press-tabs__title medium-14">방송/통신</p>
      </button>
      <button class="press-tabs__item">
        <p class="press-tabs__title medium-14">IT</p>
      </button>
      <button class="press-tabs__item">
        <p class="press-tabs__title medium-14">영자지</p>
      </button>
    </nav>
    <section class="press-feed">
      <!-- 언론사 정보 -->
      <header class="press-feed__header">
        <img src="" alt="서울경제 로고" class="press-feed__logo" />

        <time
          datetime="2026-01-14T18:27"
          class="press-feed__time medium-12"
        >
          2026.01.14. 18:27 편집
        </time>

        <button class="button-label bg-gray press-feed__subscribe">
          <svg aria-hidden="true" viewBox="0 0 12 12">
            <path
              d="M9.5 6.5H6.5V9.5H5.5V6.5H2.5V5.5H5.5V2.5H6.5V5.5H9.5V6.5Z"
              fill="currentColor"
            />
          </svg>
          <p>구독하기</p>
        </button>
      </header>
      <div class="press-feed__container">
        <!-- 메인 뉴스 -->
        <article class="press-feed__lead">
          <img
            src=""
            alt="메인 뉴스 썸네일"
            class="press-feed__thumbnail"
          />
          <h3 class="press-feed__headline medium-16">
            동네 빵집 '작은 선물 포장 서비스' 도입... 재방문율 상승
          </h3>
        </article>

        <!-- 서브 뉴스 -->
        <ul class="press-feed__list medium-16">
          <li>반려동물 수제 간식 시장 확대... 소규모 창업도 증가세</li>
          <li>반려동물 수제 간식 시장 확대... 소규모 창업도 증가세</li>
          <li>반려동물 수제 간식 시장 확대... 소규모 창업도 증가세</li>
          <p class="press-feed__note medium-14">
            서울경제 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </ul>
      </div>
    </section>`;
}
