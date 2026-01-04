import "./Header.css";
import { Logo } from "../icons/Logo";
import { todayString } from "../../utils/utils";

export function Header() {
  return `<header class="titleHeader">
        <a class="title">${Logo()}뉴스스탠드</a>
        <span class="data">${todayString()}</span>
    </header>`;
}
