import { formatKoreanDate } from "./utils/formatKoreanDate";

const dateEL = document.querySelector("#todays-date");
dateEL.textContent = formatKoreanDate(new Date());

const logo = document.querySelector("#title-and-logo");
logo.addEventListener("click", (e) => {
  location.reload();
});
