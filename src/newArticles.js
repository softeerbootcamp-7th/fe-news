export class NewArticlesView {
  constructor(articlesData) {
    this.data = articlesData;
    this.leftIndex = 0;
    this.rightIndex = 1;
    this.lastIndex = 1;

    const articlesContainer = document.querySelector(".new-articles");
    this.leftArticleContainer = articlesContainer.children[0];
    this.rightArticleContainer = articlesContainer.children[1];

    this.leftLastRoll = performance.now();
    this.rightLastRoll = performance.now() + 1000; // 오른쪽 1초 시간차
    this.rollInterval = 5000;
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
    return timestamp - lastRoll >= this.rollInterval;
  }

  leftRoll() {
    // new news 추가
    this.lastIndex++;
    this.lastIndex %= this.data.length;
    this.leftIndex = this.lastIndex;

    const newArticle = this.appendLeftArticleElement();
    const oldArticle = this.leftArticleContainer.firstElementChild;

    this.roll(newArticle, oldArticle);
  }

  rightRoll() {
    // new news 추가
    this.lastIndex++;
    this.lastIndex %= this.data.length;
    this.rightIndex = this.lastIndex;

    const newArticle = this.appendRightArticleElement();
    const oldArticle = this.rightArticleContainer.firstElementChild;

    this.roll(newArticle, oldArticle);
  }

  roll(newArticle, oldArticle) {
    // 애니메이션
    requestAnimationFrame(() => {
      newArticle.style.transform = "translateY(0)";
      oldArticle.style.transform = "translateY(-50px)";
    });

    // old new 제거
    setTimeout(() => oldArticle.remove(), 500);
  }

  render() {
    // 첫 2개의 뉴스 추가
    const leftArticle = this.appendLeftArticleElement();
    const rightArticle = this.appendRightArticleElement();
    leftArticle.style.transform = "translateY(0)";
    rightArticle.style.transform = "translateY(0)";
  }

  appendLeftArticleElement() {
    const leftArticle = this.createArticleElement(this.leftIndex);

    leftArticle.addEventListener("mouseenter", () => this.pause("left"));
    leftArticle.addEventListener("mouseleave", () => this.resume("left"));

    this.leftArticleContainer.appendChild(leftArticle);

    return leftArticle;
  }

  appendRightArticleElement() {
    const rightArticle = this.createArticleElement(this.rightIndex);

    rightArticle.addEventListener("mouseenter", () => this.pause("right"));
    rightArticle.addEventListener("mouseleave", () => this.resume("right"));

    this.rightArticleContainer.appendChild(rightArticle);

    return rightArticle;
  }

  pause(side) {
    const container =
      side === "left" ? this.leftArticleContainer : this.rightArticleContainer;

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
      if (!this.rightPaused) this.rightLastRoll = this.leftLastRoll + 1000; // 시간차 유지
      const titleElement =
        this.leftArticleContainer.firstElementChild.children[1];
      titleElement.classList.remove("underline");
    } else {
      this.rightPaused = false;
      this.rightLastRoll = this.leftLastRoll + 1000; // 시간차 유지
      const titleElement =
        this.rightArticleContainer.firstElementChild.children[1];
      titleElement.classList.remove("underline");
    }
  }

  createArticleElement(dataIndex) {
    // 특정 데이터로 뉴스 요소 생성
    const article = document.createElement("article");
    const press = document.createElement("p");
    press.textContent = this.data[dataIndex].press;
    const title = document.createElement("h3");
    title.textContent = this.data[dataIndex].mainTitle;
    article.appendChild(press);
    article.appendChild(title);

    return article;
  }
}
