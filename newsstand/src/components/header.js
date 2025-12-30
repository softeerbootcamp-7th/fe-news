export const header = () => {
  const header = document.createElement("header");
  header.classList.add("ns-header");

  const logo = document.createElement("h1");
  logo.classList.add("ns-logo");
  logo.setAttribute("aria-label", "뉴스스탠드");
  logo.textContent = "뉴스스탠드";

  const dateWrap = document.createElement("div");
  dateWrap.classList.add("ns-date");

  const dateDiv = document.createElement("div");
  dateDiv.id = "date";
  dateDiv.innerText = getDate();

  dateWrap.appendChild(dateDiv);
  header.appendChild(logo);
  header.appendChild(dateWrap);

  return header;
};
