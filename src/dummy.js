export const NEWS_LISTS = [
  [
    {
      press: "연합뉴스1",
      title: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
    {
      press: "연합뉴스2",
      title: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
    {
      press: "연합뉴스3",
      title: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
    {
      press: "연합뉴스4",
      title: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
    {
      press: "연합뉴스5",
      title: '[속보] 尹대통령 "한미동맹, 그 어느 때보다 튼튼"',
    },
  ],
  [
    {
      press: "서울경제1",
      title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
    {
      press: "서울경제2",
      title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
    {
      press: "서울경제3",
      title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
    {
      press: "서울경제4",
      title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
    {
      press: "서울경제5",
      title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    },
  ],
];

export const PRESS_LIST = Array(96)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `언론사 ${i + 1}`,
    lightLogo: `/assets/light_mode_logo/press${i + 1}.png`,
    darkLogo: `/assets/dark_mode_logo/press${i + 1}.png`,
  }));

export const SUBSCRIBED_PRESS_IDS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
