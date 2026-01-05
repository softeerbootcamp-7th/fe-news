import { getDayOfWeek } from '@/utils';

export const TodayDate = () => {
  const $date = document.querySelector('.header__date');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  $date.innerHTML = `${year}. ${month}. ${day}. ${getDayOfWeek(today)}`;
};
