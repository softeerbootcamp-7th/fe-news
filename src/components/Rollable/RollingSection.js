import "./RollingSection.css";

import { rollingArticles } from "../../store/index.js";
import { makeNode } from "../../utils/utils.js";

export function RollingSection() {
  const rollCycle = 5000;
  const rollGap = 1000;
  const num = 5; //article numbers per side

  let pausedNewsIndex = null;
  const setPNI = (idx) => {
    pausedNewsIndex = idx;
  };

  let leftIdx = 0;
  let rightIdx = 0;

  const $el = makeNode(`
    <section class="auto-rolling-news-section">
      <div class="auto-rolling-news left-box">
        <div class="visible-region">
          <div class="moving-region left">
          </div>
        </div>
      </div>
      <div class="auto-rolling-news right-box">
        <div class="visible-region">
          <div class="moving-region right">
          </div>
        </div>
      </div>
    </section>
  `);
  const $leftBox = $el.querySelector(".left-box");
  const $rightBox = $el.querySelector(".right-box");
  const $leftNewsWrapper = $el.querySelector(".left");
  const $rightNewsWrapper = $el.querySelector(".right");

  // 왼쪽 롤링 바
  $leftBox.addEventListener("mouseenter", () => setPNI(1));
  $leftBox.addEventListener("mouseleave", () => setPNI(null));
  // 오른쪽 롤링 바
  $rightBox.addEventListener("mouseenter", () => setPNI(2));
  $rightBox.addEventListener("mouseleave", () => setPNI(null));

  /** 여기서부터 롤링 애니메이션/전환 등 함수 */
  const startRolling = () => {
    setInterval(() => {
      if (pausedNewsIndex !== 1) {
        roll("left");
      }
      setTimeout(() => {
        if (pausedNewsIndex !== 2) {
          roll("right");
        }
      }, rollGap);
    }, rollCycle);
  };
  startRolling();

  const roll = (direction) => {
    const $targetWrapper =
      direction === "left" ? $leftNewsWrapper : $rightNewsWrapper;

    // 1. 애니메이션 클래스 추가 (위로 올라감)
    $targetWrapper.classList.add("is-rolling");

    // 2. 애니메이션 시간(0.5초)이 지난 후 데이터 교체 및 리셋
    setTimeout(() => {
      // 3. 트랜지션 잠시 끄기 (몰래 위치 복구)
      $targetWrapper.style.transition = "none";
      $targetWrapper.classList.remove("is-rolling");

      // 4. 데이터를 다음 것으로 교체
      alterNews(direction);

      // 5. 다시 트랜지션 활성화 (다음 롤링을 위해)
      setTimeout(() => {
        $targetWrapper.style.transition = "";
      }, 50);
    }, 500); // CSS transition 시간
  };
  const alterNews = (isLeft) => {
    /** 왼쪽 뉴스 목록 대체 */
    if (isLeft === "left") {
      $leftNewsWrapper.innerHTML = "";
      const $leftPrevNews = makeNode(`
        <article class="news-wrapper">
            <a class="press-company">${rollingArticles[leftIdx].press}</a>
            <a class="news-title">${rollingArticles[leftIdx].newsTitle}</a>
        </article>`);
      const $leftNextNews = makeNode(`
        <article class="news-wrapper">
            <a class="press-company">${
              rollingArticles[(leftIdx + 1) % num].press
            }</a>
            <a class="news-title">${
              rollingArticles[(leftIdx + 1) % num].newsTitle
            }</a>
        </article>`);
      leftIdx = (leftIdx + 1) % 5;

      $leftNewsWrapper.append($leftPrevNews, $leftNextNews);
    } else {
      /** 오른쪽 뉴스 목록 대체 */
      $rightNewsWrapper.innerHTML = "";

      const $rightPrevNews = makeNode(`
        <article class="news-wrapper">
            <a class="press-company">${
              rollingArticles[rightIdx + num].press
            }</a>
            <a class="news-title">${
              rollingArticles[rightIdx + num].newsTitle
            }</a>
        </article>`);
      const $rightNextNews = makeNode(`
        <article class="news-wrapper">
            <a class="press-company">${
              rollingArticles[((rightIdx + 1) % num) + num].press
            }</a>
            <a class="news-title">${
              rollingArticles[((rightIdx + 1) % num) + num].newsTitle
            }</a>
        </article>`);
      rightIdx = (rightIdx + 1) % num;
      $rightNewsWrapper.append($rightPrevNews, $rightNextNews);
    }
  };

  alterNews("left");
  alterNews("right");
  return $el;
}
