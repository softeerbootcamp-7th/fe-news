import "./GridSection.css";
import { PressLogo } from "./PressLogo";
import { Prev } from "../../icons/Previous";
import { Next } from "../../icons/Next";
import {
  pageStore,
  pressStore,
  subsStore,
  viewStore,
} from "../../../store/index";
import { Alert } from "../../Shared/Alert";

export function GridSection() {
  const { currentPage } = pageStore.state;
  const { shuffledPressList } = pressStore.state;
  const { subscribedIds } = subsStore.state;
  const { viewOnlySubs } = viewStore.state;

  const finalPressList = viewOnlySubs
    ? [...shuffledPressList].filter((p) => subscribedIds.has(p.id))
    : [...shuffledPressList];
  const maxPage = parseInt(finalPressList.length / 24);
  const blankCount = 24 - (finalPressList.length % 24);

  return `
    <div class="grid-contents">
        ${Alert()}
        <button class="nav-button prev ${currentPage === 0 && "disabled"}">
        ${Prev()}
        </button>
        <div class="press-logo-grid">
          ${finalPressList
            .slice(currentPage * 24, (currentPage + 1) * 24)
            .map((press) => PressLogo(press))
            .join("")}
            ${
              currentPage == maxPage
                ? Array.from({
                    length: blankCount,
                  })
                    .map(() => PressLogo()) // placeholder
                    .join("")
                : ""
            }
        </div>
        <button class="nav-button next ${
          currentPage === maxPage && "disabled"
        }">
        ${Next()}
        </button>
    </div>`;
}
