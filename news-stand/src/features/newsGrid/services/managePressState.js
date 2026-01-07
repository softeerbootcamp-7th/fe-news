/**
 * 언론사 그리드 상태 관리
 * - 전체 언론사 데이터 저장
 * - 현재 페이지 관리
 * - 페이지당 24개(4x6) 언론사 반환
 * - 최대 페이지까지만 표시
 */
export const managePressState = {
  allPress: [],
  currentPage: 0,
  itemsPerPage: 24,
  maxPages: 4,
  listeners: [],

  init(pressData) {
    this.allPress = pressData;
    this.currentPage = 0;
  },

  getCurrentPageData() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allPress.slice(start, end);
  },

  getTotalPages() {
    const calculatedPages = Math.ceil(this.allPress.length / this.itemsPerPage);
    return Math.min(calculatedPages, this.maxPages);
  },

  hasNextPage() {
    return this.currentPage < this.getTotalPages() - 1;
  },

  hasPrevPage() {
    return this.currentPage > 0;
  },

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.notifyListeners();
    }
  },

  prevPage() {
    if (this.hasPrevPage()) {
      this.currentPage--;
      this.notifyListeners();
    }
  },

  subscribe(listener) {
    this.listeners.push(listener);
  },

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getCurrentPageData()));
  },
};
