import { DAY_OF_WEEK } from '@/constants';

/**
 * @description 요일 가져오기 
 * @param {Date} date 
 * @returns {string} 요일
 */
export const getDayofweek = (date) => {
  const dayOfWeek = date.getDay();
  return DAY_OF_WEEK[dayOfWeek];
};