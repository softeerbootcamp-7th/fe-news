export function renderRollingNews(columnId, curIndex, rollingData) {
  const column = document.getElementById(columnId);
  if (!column) return curIndex;

  const wrapper = column.querySelector(".rolling-wrapper");
  const itemLen = rollingData?.length;
  if (!wrapper || !itemLen) return curIndex;

  const rows = wrapper.querySelectorAll("div > div");

  const idx = curIndex;
  const nextIdx = idx + 1 < itemLen ? idx + 1 : 0;
  const nextNextIdx = nextIdx + 1 < itemLen ? nextIdx + 1 : 0;

  // 1. 뉴스 한 세트 내용 업데이트
  setRow(rows[0], rollingData[idx]);
  setRow(rows[1], rollingData[nextIdx]);

  // 2. 롤링 애니메이션 시작
  wrapper.style.animation = "rolling-slide-up 0.5s ease";

  // 3. 애니메이션 종료 후 다음 뉴스 세트 내용 업데이트
  wrapper.addEventListener(
    "animationend",
    () => {
      setRow(rows[0], items[nextIdx]);
      setRow(rows[1], items[nextNextIdx]);
      wrapper.style.animation = "none";
    },
    { once: true }
  );
}

function setRow(rowEl, item = {}) {
  const pressEl = rowEl.querySelector("span");
  const titleEl = rowEl.querySelector("p");
  if (pressEl) pressEl.textContent = item.press ?? "";
  if (titleEl) titleEl.textContent = item.mainTitle ?? "";
}
