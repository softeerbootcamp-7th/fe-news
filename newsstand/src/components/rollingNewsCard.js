export const rollingNewsCard = ({ title = "연합뉴스", text = "dummy" }) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.id = "rolling-card-wrapper";
  cardWrapper.classList.add("border-default");
  cardWrapper.classList.add("surface-alt");

  const newsTitle = document.createElement("h1");
  newsTitle.classList.add("typo-display-bold14");
  newsTitle.innerText = title;

  const newsContent = document.createElement("p");
  newsContent.classList.add("typo-available-medium14");
  newsContent.innerText = text;

  cardWrapper.append(newsTitle);
  cardWrapper.append(newsContent);

  return cardWrapper;
};
