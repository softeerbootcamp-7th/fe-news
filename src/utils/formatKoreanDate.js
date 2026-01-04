const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
export function formatKoreanDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayName = WEEKDAY[date.getDay()];
  return `${year}. ${month}. ${day}. ${dayName}요일`;
}
