export class LatestNewsView {
  static ROLL_INTERVAL_MS = 5000;
  static ROLL_OFFSET_MS = 1000;

  constructor(newsData) {
    this.data = newsData;
    this.leftIndex = 0;
    this.rightIndex = 1;
    this.lastIndex = 1;

    const newsContainer = document.querySelector(".latest-news");
    this.leftNewsContainer = newsContainer.children[0];
    this.rightNewsContainer = newsContainer.children[1];

    this.leftLastRoll = performance.now();
    this.rightLastRoll = performance.now() + this.ROLL_OFFSET_MS; // 오른쪽 1초 시간차
    this.leftPaused = false;
    this.rightPaused = false;
    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }

  loop(timestamp) {
    if (!this.leftPaused && this.shouldRoll(timestamp, "left")) {
      this.leftRoll();
      this.leftLastRoll = timestamp;
    }

    if (!this.rightPaused && this.shouldRoll(timestamp, "right")) {
      this.rightRoll();
      this.rightLastRoll = timestamp;
    }

    this.rafId = requestAnimationFrame(this.loop.bind(this)); // raf로 넘어가면 this가 window 객체로 바뀌므로 바인딩 필요
  }
  shouldRoll(timestamp, side) {
    const lastRoll = side === "left" ? this.leftLastRoll : this.rightLastRoll;
    return timestamp - lastRoll >= this.ROLL_INTERVAL_MS;
  }

  leftRoll() {
    // new news 추가
    this.lastIndex++;
    this.lastIndex %= this.data.length;
    this.leftIndex = this.lastIndex;

    const newNews = this.appendLeftNewsElement();
    const oldNews = this.leftNewsContainer.firstElementChild;

    this.roll(newNews, oldNews);
  }

  rightRoll() {
    // new news 추가
    this.lastIndex++;
    this.lastIndex %= this.data.length;
    this.rightIndex = this.lastIndex;

    const newNews = this.appendRightNewsElement();
    const oldNews = this.rightNewsContainer.firstElementChild;

    this.roll(newNews, oldNews);
  }

  roll(newNews, oldNews) {
    // 애니메이션
    requestAnimationFrame(() => {
      newNews.style.transform = "translateY(0)";
      oldNews.style.transform = "translateY(-50px)";
    });

    // old new 제거
    oldNews.addEventListener("transitionend", () => {
      oldNews.remove();
    });
    // setTimeout(() => oldNews.remove(), 500);
  }

  render() {
    // 첫 2개의 뉴스 추가
    const leftNews = this.appendLeftNewsElement();
    const rightNews = this.appendRightNewsElement();
    leftNews.style.transform = "translateY(0)";
    rightNews.style.transform = "translateY(0)";
  }

  appendLeftNewsElement() {
    const leftNews = this.createNewsElement(this.leftIndex);

    leftNews.addEventListener("mouseenter", () => this.pause("left"));
    leftNews.addEventListener("mouseleave", () => this.resume("left"));

    this.leftNewsContainer.appendChild(leftNews);

    return leftNews;
  }

  appendRightNewsElement() {
    const rightNews = this.createNewsElement(this.rightIndex);

    rightNews.addEventListener("mouseenter", () => this.pause("right"));
    rightNews.addEventListener("mouseleave", () => this.resume("right"));

    this.rightNewsContainer.appendChild(rightNews);

    return rightNews;
  }

  pause(side) {
    const container =
      side === "left" ? this.leftNewsContainer : this.rightNewsContainer;

    if (side === "left") this.leftPaused = true;
    else this.rightPaused = true;

    const titleElement = container.firstElementChild.children[1];
    titleElement.classList.add("underline");
    container.style.cursor = "pointer";
  }

  resume(side) {
    if (side === "left") {
      this.leftPaused = false;
      this.leftLastRoll = performance.now();
      if (!this.rightPaused)
        this.rightLastRoll = this.leftLastRoll + this.ROLL_OFFSET_MS; // 시간차 유지
      const titleElement = this.leftNewsContainer.firstElementChild.children[1];
      titleElement.classList.remove("underline");
    } else {
      this.rightPaused = false;
      this.rightLastRoll = this.leftLastRoll + this.ROLL_OFFSET_MS; // 시간차 유지
      const titleElement =
        this.rightNewsContainer.firstElementChild.children[1];
      titleElement.classList.remove("underline");
    }
  }

  createNewsElement(dataIndex) {
    // 특정 데이터로 뉴스 요소 생성
    const news = document.createElement("news");
    const press = document.createElement("p");
    press.textContent = this.data[dataIndex].press;
    const title = document.createElement("h3");
    title.textContent = this.data[dataIndex].mainTitle;
    news.appendChild(press);
    news.appendChild(title);

    return news;
  }
}
