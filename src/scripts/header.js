import { formatKoreanDate } from "../utils/formatKoreanDate";

export default function initHeader() {
  const dateEL = document.querySelector("#todays-date");
  dateEL.textContent = formatKoreanDate(new Date());

  const logo = document.querySelector("#title-and-logo");
  logo.addEventListener("click", (e) => {
    location.reload();
  });
}
