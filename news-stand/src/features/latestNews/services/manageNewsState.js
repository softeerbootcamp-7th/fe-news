/**
 * 뉴스 상태 관리
 */
class NewsStateManager {
  constructor() {
    this.newsData = [];
    this.currentIndex = 0;
    this.startTime = null;
  }

  init(newsData) {
    this.newsData = newsData;
    this.currentIndex = 1;
    this.startTime = Date.now();
  }

  getInitialNews() {
    return [this.newsData[0], this.newsData[1]];
  }

  getNextNews() {
    const oldIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.newsData.length;

    const elapsed = this.getElapsedTime();
    return this.newsData[this.currentIndex];
  }

  getElapsedTime() {
    if (!this.startTime) return '0.000';
    return ((Date.now() - this.startTime) / 1000).toFixed(3);
  }
}

export const manageNewsState = new NewsStateManager();
