export function shuffle(array) {
  const tempArr = [...array];
  for (let i = tempArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
  }
  return tempArr;
}

export function todayString() {
  const today = new Date();

  // 자동 포맷 설정
  const dateString = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full", // "2025년 12월 30일 화요일" 형식 출력
  })
    .format(today)
    .replace(/년 |월 /g, ". ") // "년", "월"을 "."으로 치환
    .replace("일", "."); // "일"을 "."으로 치환

  return dateString;
}

const STORAGE_KEY = "FE_news_subscribed_presses";

export function loadSavedSubs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}
export function saveSubscribedIds(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}
