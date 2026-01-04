import "./GridSection.css";
import { GridSectionHeader } from "./GridSectionHeader";
import { PressLogo } from "./PressLogo";
import { Prev } from "../../icons/Previous";
import { Next } from "../../icons/Next";
import { pageStore, pressStore } from "../../../store/index";
import { Alert } from "../../Shared/Alert";

export function GridSection() {
  const { currentPage, maxPage } = pageStore.state;

  const { shuffledPressList } = pressStore.state;

  return `
    <section class="grid-section">
        ${GridSectionHeader(false, 8)}
        <div class="main-contents">
            ${Alert("우리언론", false)}
            <button class="nav-button prev ${currentPage === 0 && "disabled"}">
            ${Prev()}
            </button>
            <div class="press-logo-grid">
              ${shuffledPressList
                .slice(currentPage * 24, (currentPage + 1) * 24)
                .map((press) => PressLogo(press.logo))
                .join("")}
            </div>
            <button class="nav-button next ${
              currentPage === maxPage && "disabled"
            }">
            ${Next()}
            </button>
        </div>
    </section>`;
}
