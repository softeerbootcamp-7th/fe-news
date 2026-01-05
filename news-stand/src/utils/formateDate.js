import { WEEKDAYS } from '../constants/date.js';

export function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = WEEKDAYS[date.getDay()];

  return `${year}년. ${month}월. ${day}일. ${weekday}`;
}
