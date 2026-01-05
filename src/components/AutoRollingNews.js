// src/components/AutoRollingNews.js
export const AutoRollingNews = (
  newsLists = [
    [
      {
        title: "연합뉴스1",
        content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
      },
      {
        title: "연합뉴스2",
        content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
      },
      // {
      //   title: "연합뉴스3",
      //   content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
      // },
      // {
      //   title: "연합뉴스4",
      //   content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
      // },
      // {
      //   title: "연합뉴스5",
      //   content: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
      // },
    ],
    [
      {
        title: "서울경제1",
        content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
      },
      {
        title: "서울경제2",
        content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
      },
      // {
      //   title: "서울경제3",
      //   content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
      // },
      // {
      //   title: "서울경제4",
      //   content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
      // },
      // {
      //   title: "서울경제5",
      //   content: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
      // },
    ],
  ]
) => {
  const newsAreasHtml = newsLists
    .map(
      (list, index) => `
      <div class="flex-1 bg-surface-alt relative overflow-hidden" data-rolling-area data-area-index="${index}" data-original-count="${
        list.length
      }">
        <div class="transition-transform" data-rolling-wrapper>
          ${list
            .concat(list)
            .map(
              (news, newsIndex) => `
            <div class="h-20 flex flex-col justify-center" data-rolling-item data-item-index="${newsIndex}">
              <strong class="text-sm font-bold text-strong block mb-1">${news.title}</strong>
              <p class="text-sm text-default m-0 leading-medium">${news.content}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");

  return `
    <section class="flex gap-2 mb-8">
      ${newsAreasHtml}
    </section>
  `;
};

// 롤링 초기화 함수
export const initAutoRolling = () => {
  const areas = document.querySelectorAll("[data-rolling-area]");

  areas.forEach((area, areaIndex) => {
    const wrapper = area.querySelector("[data-rolling-wrapper]");
    const items = area.querySelectorAll("[data-rolling-item]");
    const originalCount = parseInt(area.dataset.originalCount);
    let currentIndex = 0;

    // 각 영역마다 1초 차이를 두고 시작
    setTimeout(() => {
      setInterval(() => {
        currentIndex++;

        // 현재 아이템 높이 계산
        const itemHeight = items[0].offsetHeight;

        // wrapper를 위로 이동시켜 스크롤 효과
        wrapper.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

        // 원본 리스트의 마지막에 도달하면 애니메이션 없이 처음으로 리셋
        if (currentIndex === originalCount) {
          setTimeout(() => {
            wrapper.style.transition = "none";
            currentIndex = 0;
            wrapper.style.transform = "translateY(0)";

            // 다음 프레임에서 transition 다시 활성화
            setTimeout(() => {
              wrapper.style.transition = "transform 0.6s ease-in-out";
            }, 50);
          }, 600); // 애니메이션 완료 후
        }
      }, 2000); // 2초마다 롤링
    }, areaIndex * 1000); // 각 영역마다 1초 차이
  });
};
