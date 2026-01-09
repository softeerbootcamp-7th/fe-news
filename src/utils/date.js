import { DATE_CONSTANTS } from '@/constants';

export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  return `${year}. ${month}. ${day}. ${DATE_CONSTANTS.DAYS[dayOfWeek]}`;
}