/**
 * 최신 뉴스 데이터 fetch
 */
export async function fetchLatestNews(count = 5) {
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
