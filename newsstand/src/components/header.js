import { getDate } from "../lib/utils";
import { logo } from "./logo";

export const header = () => {
  // header container
  const header = document.createElement("header");
  header.classList.add("ns-header");

  // title container
  const titleWrap = document.createElement("div");
  titleWrap.id = "title-wrap";
  const title = document.createElement("h1");
  title.classList.add("ns-title");
  title.classList.add("text-strong");
  title.setAttribute("aria-label", "뉴스스탠드");
  title.textContent = "뉴스스탠드";
  titleWrap.appendChild(logo());
  titleWrap.appendChild(title);

  // date container
  const dateWrap = document.createElement("div");
  dateWrap.classList.add("ns-date");
  dateWrap.classList.add("typo");
  dateWrap.classList.add("typo-display-medium16");

  const dateDiv = document.createElement("div");
  dateDiv.id = "date";
  dateDiv.innerText = getDate();

  dateWrap.appendChild(dateDiv);
  header.appendChild(titleWrap);
  header.appendChild(dateWrap);

  return header;
};
