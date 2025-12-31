/**
 * 최신 뉴스 데이터 서비스
 * pressData.json에서 최신 뉴스를 가져오는 로직
 */

/**
 * 최신 뉴스 가져오기
 * @param {number} count - 가져올 개수 (기본값: 2)
 * @returns {Promise<Array>} 최신순 뉴스 배열
 */
export async function getLatestNews(count = 2) {
  try {
    const res = await fetch('/pressData.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data.slice(0, count);
  } catch (error) {
    console.error('최신 뉴스 로드 실패:', error);
    return [];
  }
}
