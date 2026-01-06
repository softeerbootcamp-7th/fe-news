import "./Header.css";
import { Logo } from "../icons/Logo";
import { makeNode, todayString } from "../../utils/utils";

export function Header() {
  const $el = makeNode(`
    <header class="titleHeader">
      <a class="title">
        ${Logo()} 뉴스스탠드 
        <small class="view-status"></small> 
      </a>
      <span class="data">${todayString()}</span>
    </header>`);
  const $title = $el.querySelector(".title");

  $title.onclick = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  return $el;
}
