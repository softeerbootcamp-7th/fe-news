/**
 * @description 뉴스 기사 가져오기
 * @param {string} query 쿼리 param, json server 쿼리 param 사용
 * @returns {Promise<Array>} 뉴스 기사 데이터
 */
export const fetchNewspaper = async (query = '') => {
  const path = query ? `/newspapers?${query}` : '/newspapers';
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`);
  const data = await response.json();
  return data;
};
