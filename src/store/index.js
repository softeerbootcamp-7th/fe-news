import { loadSavedSubs, saveSubscribedIds, shuffle } from "../utils/utils";

function notify(storeName) {
  window.dispatchEvent(new CustomEvent(`${storeName}Change`));
}

export const viewStore = {
  state: {
    viewOnlySubs: false,
    viewGrid: true,
  },
  setViewOnlySubs(bool) {
    this.state.viewOnlySubs = bool;
    pageStore.state.currentPage = 0;
    notify("viewStore");
  },
  setViewGrid(bool) {
    this.state.viewGrid = bool;
    pageStore.state.currentPage = 0;
    notify("viewStore");
  },
};

export const rollingArticles = [
  {
    press: "연합뉴스",
    newsTitle: "[속보] 도심 공원 ‘조용한 독서존’ 시범 운영… 시민 호응 이어져",
  },
  {
    press: "서울경제",
    newsTitle: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
  },
  {
    press: "조선일보",
    newsTitle: "청년 주거 지원 확대… 공공임대 공급 속도 낸다",
  },
  {
    press: "중앙일보",
    newsTitle: "출퇴근 시간 단축 실험, 직장인 만족도 높아",
  },
  {
    press: "한겨레",
    newsTitle: "생활 폐기물 감축 정책, 참여 시민 늘며 성과",
  },
  {
    press: "동아일보",
    newsTitle: "초등 돌봄교실 운영 시간 연장… 맞벌이 가정 부담 완화",
  },
  {
    press: "국민일보",
    newsTitle: "지역 축제 재개에 관광객 발길 회복 조짐",
  },
  {
    press: "한국일보",
    newsTitle: "공공 자전거 이용 증가… 친환경 교통수단 자리잡나",
  },
  {
    press: "머니투데이",
    newsTitle: "소상공인 디지털 전환 지원, 매출 개선 효과",
  },
  {
    press: "매일경제",
    newsTitle: "AI 기반 민원 처리 도입… 행정 효율성 높아져",
  },
];

const imageModules = import.meta.glob("../../assets/*.png", {
  eager: true,
});

const pressNames = [
  "그린포스트코리아",
  "낚시춘추",
  "뉴스토마토",
  "뉴스핌",
  "데일리한국",
  "데일리NK",
  "디디넷",
  "디자인정글",
  "디지털투데이",
  "마이데일리",
  "매일노동뉴스",
  "맥스무비",
  "미디어펜",
  "미주한국일보",
  "보안뉴스",
  "비즈한국",
  "산업일보",
  "소비자가만드는신문",
  "스포츠경향",
  "스포츠동아",
  "스포츠월드",
  "스포츠조선",
  "스포츠Q",
  "시사위크",
  "씨네21",
  "아리랑",
  "아시아투데이",
  "약사공론",
  "에너지경제",
  "연합뉴스",
  "위키리크스한국",
  "이뉴스투데이",
  "이로운넷",
  "이코노미조선",
  "이투데이",
  "인민망",
  "일요신문",
  "전기신문",
  "정신의학신문",
  "조이뉴스",
  "철강금속신문",
  "초이스경제",
  "컴퓨터월드",
  "텐아시아",
  "티브이데일리",
  "한국금융",
  "한국대학신문",
  "BBS News",
  "BUSINESS POST",
  "BylineNetwork",
  "CEO스코어데일리",
  "cnbNEWS",
  "DataNews",
  "EBN",
  "ELLE",
  "GameMeca",
  "HUFFPOST",
  "Insight",
  "IT Chosun",
  "IT dongA",
  "JIJI",
  "KBS WORLD",
  "MK스포츠",
  "Newsen",
  "NextDaily",
  "OBS",
  "Pd Journal",
  "ShippingGazette",
  "sportal korea",
  "TBC",
  "TBS",
  "TheKoreaTimes",
  "TheScienceTimes",
];

// 3. 파일명을 매칭하여 데이터 배열 생성

export const pressList = pressNames.map((name, i) => {
  const path = `../../assets/${name}.png`;
  return {
    id: i,
    logo: imageModules[path]?.default || imageModules[path], // Vite 버전에 따른 처리
    name: name,
  };
});
export const pressStore = {
  state: {
    shuffledPressList: shuffle(pressList),
  },

  reshuffle() {
    this.state.shuffledPressList = shuffle(pressList);
    window.dispatchEvent(new Event("pressStoreChange"));
  },
};

export const pageStore = {
  state: {
    currentPage: 0,
    maxPage: parseInt(pressList.length / 24),
  },
  setPage(page) {
    if (page < 0 || page > this.state.maxPage) return;
    this.state.currentPage = page;
    notify("pageStore");
  },
};

export const subsStore = {
  state: {
    targetPressId: null,
    targetPressName: "",
    subscribedIds: loadSavedSubs(), // 구독한 언론사의 ID를 저장하는 Sets
  },
  setTargetPressId(id, name) {
    if (this.state.targetPressId === id) {
      this.state.targetPressId = null;
      this.state.targetPressName = "";
    } else {
      this.state.targetPressId = id;
      this.state.targetPressName = name;
    }
    notify("subsStore");
  },
  toggleSub() {
    const { targetPressId, subscribedIds } = this.state;

    if (subscribedIds.has(targetPressId)) subscribedIds.delete(targetPressId);
    else subscribedIds.add(targetPressId);

    saveSubscribedIds(subscribedIds);
    this.state.targetPressId = null;
    this.state.targetPressName = "";
    notify("subsStore");
  },
};
