import "./MainSectionHeader.css";
import { Badge } from "../Shared/Badge";
import { ListViewIcon } from "../icons/ListViewIcon";
import { GridViewIcon } from "../icons/GridViewIcon";
import { subsStore, viewStore } from "../../store";

export function MainSectionHeader() {
  const { viewOnlySubs, viewGrid } = viewStore.state;
  const { subscribedIds } = subsStore.state;
  return `
          <header class="grid-section-header">
            <div class="subscribe-toggle-buttons">
              <a class="subscribe-toggle ${!viewOnlySubs ? "is-active" : ""}"
              data-view=all>전체 언론사</a>
              <div class="subscribe-toggle-wrapper">
                <a class="subscribe-toggle ${
                  viewOnlySubs ? "is-active" : ""
                }" data-view=subs>
                  내가 구독한 언론사
                </a>
                ${Badge(Array.from(subscribedIds).length, viewOnlySubs)}
              </div>
            </div>
            <div class="view-toggle-buttons">
              <a class="view-toggle ${
                !viewGrid ? "is-active" : ""
              }" data-view=list>${ListViewIcon()}</a>
              <a class="view-toggle ${
                viewGrid ? "is-active" : ""
              }" data-view=grid>${GridViewIcon()}</a>
            </div>
          </header>
    `;
}
