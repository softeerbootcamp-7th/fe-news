import "./Header.css";
import { Logo } from "../icons/Logo";

export function Header() {
  const today = new Date();

  // 자동 포맷 설정
  const dateString = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full", // "2025년 12월 30일 화요일" 형식 출력
  })
    .format(today)
    .replace(/년 |월 /g, ". ") // "년", "월"을 "."으로 치환
    .replace("일", "."); // "일"을 "."으로 치환

  return `<header class="titleHeader">
        <a class="title">${Logo()}뉴스스탠드</a>
        <span class="data">${dateString}</span>
    </header>`;
}
