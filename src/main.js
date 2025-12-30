import { formatKoreanDate } from "./utils/formatKoreanDate";
const dateEL = document.querySelector("#todays-date");
dateEL.textContent = formatKoreanDate(new Date());
console.log(dateEL.textContent);
