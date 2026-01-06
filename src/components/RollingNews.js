const ROLLING_INTERVAL = 5000;
const ROLLING_DELAY = 1000;

export function RollingNews({ newsLists }) {
  const firstArea = RollingArea({ newsList: newsLists[0] });
  const secondArea = RollingArea({ newsList: newsLists[1] });

  // DOM에 삽입된 후 자동으로 초기화 - 각 영역마다 다른 시작 시간
  setTimeout(() => {
    initAutoRollingForArea(0); // 첫 번째 영역 즉시 시작
  }, 0);

  setTimeout(() => {
    initAutoRollingForArea(1); // 두 번째 영역 1초 후 시작
  }, ROLLING_DELAY);

  return `
    <section class="flex gap-2 mt-8">
      ${firstArea}
      ${secondArea}
    </section>
  `;
}

function RollingArea({ newsList }) {
  const newsAreaHtml = newsList
    .map(
      (news) => `
            <div class="rolling-item flex gap-4 p-4">
              <span class="display-bold14 text-strong single-line">${news.press}</span>
              <span class="available-medium14 text-default truncate">${news.title}</span>
            </div>
          `
    )
    .join("");

  return `
          <div class="rolling-area flex-1 bg-surface-alt overflow-hidden h-12 border-default ">
            <div class="rolling-wrapper">
              ${newsAreaHtml}
            </div>
          </div>
        `;
}

const initAutoRollingForArea = (areaIndex) => {
  const rollingAreas = document.querySelectorAll(".rolling-area");
  const area = rollingAreas[areaIndex];
  if (!area) return;

  const wrapper = area.querySelector(".rolling-wrapper");
  const items = wrapper.querySelectorAll(".rolling-item");
  if (items.length <= 1) return;

  // 1. 첫 번째 아이템 복사하여 끝에 붙이기 (무한 루프용)
  const firstClone = items[0].cloneNode(true);
  wrapper.appendChild(firstClone);

  let currentIndex = 0;
  const itemHeight = items[0].getBoundingClientRect().height;
  const totalItems = items.length;

  setInterval(() => {
    currentIndex++;

    // 부드러운 이동 활성화
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

    // 마지막 클론 아이템에 도달했을 때
    if (currentIndex === totalItems) {
      setTimeout(() => {
        // 애니메이션을 끄고 순식간에 0번 인덱스로 복귀
        wrapper.style.transition = "none";
        wrapper.style.transform = `translateY(0)`;
        currentIndex = 0;
      }, 500); // transition 시간(0.5s)이 끝난 뒤 실행
    }
  }, ROLLING_INTERVAL);
};
