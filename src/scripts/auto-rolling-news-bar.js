import { newsList } from "../assets/data/news.mock";

// 최신 뉴스 헤더라인 목데이터에서 5개씩 가져온다
const leftNewsList = newsList.filter((e) => e.id % 2 == 1);
const rightNewsList = newsList.filter((e) => e.id % 2 !== 1);
console.log(leftNewsList);
console.log(rightNewsList);

// 헤더라인 엘리멘트 잡기
const leftEl = document.querySelector(".auto-rolling-news.left");
const rightEl = document.querySelector(".auto-rolling-news.right");

// 헤더라인 언론사명 텍스트 엘리먼트 잡기
const leftPressEl = leftEl.querySelector("span.press-name");
const rightPressEl = rightEl.querySelector("span.press-name");

// 헤더라인 텍스트 엘리먼트 잡기
const leftHeadlineEl = leftEl.querySelector("span.news-headline");
const rightHeadlineEl = rightEl.querySelector("span.news-headline");

let leftIdx = 0; // 왼쪽에 나올 뉴스헤더라인 들 중 몇번째가 지금 보여질 차례인지
let rightIdx = 0; // 오른쪽에 나올 뉴스헤더라인 들 중 몇번째가 지금 보여질 차례인지
const PERIOD = 2000; // 롤링 간격

// 롤링 기능의 인터벌 id 저장해두는 변수
let leftIntervalId;
let rightIntervalId;

leftEl.addEventListener("mouseenter", () => {
  stopRollingAll(leftIntervalId, rightIntervalId);
});
leftEl.addEventListener("mouseleave", () => {
  startRollingWithGap(PERIOD);
});

rightEl.addEventListener("mouseenter", () => {
  stopRollingAll(leftIntervalId, rightIntervalId);
});
rightEl.addEventListener("mouseleave", () => {
  startRollingWithGap(PERIOD);
});

// 현재 화면에 나와야 할 뉴스 헤드라인 화면에 보여주는 함수
function renderLeft() {
  const item = leftNewsList[leftIdx];
  leftPressEl.textContent = item.press;
  leftHeadlineEl.textContent = item.title;
}

function renderRight() {
  const item = rightNewsList[rightIdx];
  rightPressEl.textContent = item.press;

  rightHeadlineEl.textContent = item.title;
}

// 왼쪽 헤드라인 영역에 다음 뉴스 보여지게
function nextNewsLeft() {
  leftIdx = (leftIdx + 1) % leftNewsList.length;
  renderLeft();
}
// 오른쪽 헤드라인 영역에 다음 뉴스 보여지게
function nextNewsRight() {
  rightIdx = (rightIdx + 1) % rightNewsList.length;
  renderRight();
}

// 양쪽 시간차 1초씩 두면서 롤링 시작
function startRollingWithGap(period) {
  stopRollingAll(leftIntervalId, rightIntervalId);
  // 왼쪽 5초마다 step
  leftIntervalId = setInterval(nextNewsLeft, period);

  // 오른쪽 5초마다 step
  // 오른쪽은 왼쪽보다 1초 늦게 시작 -> 1초 시간차 생긴다
  // rightIntervalId = setInterval(nextNewsRight, period);
  setTimeout(() => {
    rightIntervalId = setInterval(nextNewsRight, period);
  }, 1000);
}

// 한쪽 롤링 멈추기
function stopRolling(intervalId) {
  clearInterval(intervalId);
}

// 양쪽 롤링 멈추기
function stopRollingAll(leftIntervalId, rightIntervalId) {
  console.log(leftIntervalId, rightIntervalId);
  if (leftIntervalId) stopRolling(leftIntervalId);
  if (rightIntervalId) stopRolling(rightIntervalId);
}

// 초기 설정
export default function initAutoRollingNewsBar() {
  renderLeft();
  renderRight();
  startRollingWithGap(PERIOD);
}
