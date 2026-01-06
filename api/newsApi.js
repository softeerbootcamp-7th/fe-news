export function fetchNews() {
    return fetch('./data/news.json')    // fetch로 news.json의 데이터 불러오기
        .then(response => {
            if (!response.ok) {         // 에러처리
                throw new Error('Network error');
            }
            return response.json();     // 성공 시 json파싱
        })
        .then(data => data.news);       // json 파싱 후 뉴스 데이터 반환
}