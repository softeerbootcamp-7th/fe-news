import { fetchNews } from "../api/newsApi.js";

let newsData = [];

export function loadNews() {
    // fetch로 뉴스데이터 로드
    return fetchNews().then(data => {
        // 성공 시 뉴스 배열 반환
        newsData = data;
        return newsData;
    });
}

export function getCategories() {
    // 뉴스 카테고리만 배열로 반환
    return [...new Set(newsData.map(n => n.category))];
}

export function getNewsByCategory(category) {
    // 지정 카테고리 별 뉴스 반환
    return newsData.filter(n => n.category === category);
}

export function getTotalNews() {
    // 전체 뉴스 반환
    return newsData;
}

export function getTotalNewsCount() {
    // 전체 뉴스 개수 반환
    return newsData.length;
}

export function findFirstPage(category) {
    let index = 0;
    let arr = getCategories();

    for (const e of arr) {
        if (e === category) {
            return index;
        }
        index += getNewsByCategory(e).length;
    }
}