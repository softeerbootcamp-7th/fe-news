/**
 * 언론사 데이터 API
 */
export async function fetchPressData(count) {
  try {
    const res = await fetch('/data/pressData.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return count ? data.slice(0, count) : data;
  } catch (error) {
    console.error('언론사 데이터 로드 실패:', error);
    return [];
  }
}
