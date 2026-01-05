/**
 * 
 * 클래스 "date"를 가진 DOM 요소를 찾아 현재 날짜와 요일을 한국어 형식 (YYYY. MM. DD. DAY요일)으로 채우는 함수
 * 
 * @function updateDate
 * @returns {void}
 */
export function updateDate() {
  const dateEl = document.querySelector(".date");
  if (!dateEl) return;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const day = now.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  dateEl.textContent = `${yyyy}. ${mm}. ${dd}. ${days[day]}요일`;
}
