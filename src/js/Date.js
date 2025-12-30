export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  
  return `${year}. ${month}. ${day}. ${days[dayOfWeek - 1]}`;
}