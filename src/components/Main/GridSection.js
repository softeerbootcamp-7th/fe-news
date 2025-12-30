import "./GridSection.css";
import { GridSectionHeader } from "./GridSectionHeader";
import { PressLogo } from "./PressLogo";
import { Prev } from "../icons/Previous";
import { Next } from "../icons/Next";
import { pressList } from "./pressData";
import { Alert } from "../Shared/Alert";

export function GridSection() {
  var isFirstPage = true;
  var isLastPage = false;
  return `
    <section class="grid-section">
        ${GridSectionHeader(false, 8)}
        <div class="main-contents">
            ${Alert("우리언론", false)}
            <button class="nav-button prev ${isFirstPage && "disabled"}">
            ${Prev()}
            </button>
            <div class="press-logo-grid">
              ${pressList.map((press) => PressLogo(press.logo)).join("")}
            </div>
            <button class="nav-button next ${isLastPage && "disabled"}">
            ${Next()}
            </button>
        </div>
    </section>`;
}
