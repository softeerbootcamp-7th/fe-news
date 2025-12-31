import "./GridSectionHeader.css";
import { Badge } from "../../Shared/Badge";
import { ListViewIcon } from "../../icons/ListViewIcon";
import { GridViewIcon } from "../../icons/GridViewIcon";

export function GridSectionHeader(
  onlySubscriped = false,
  subscribedCount = 0,
  viewList = false
) {
  return `
          <header class="grid-section-header">
            <div class="subscription-toggle-buttons">
              <a class="subscription-toggle ${
                onlySubscriped ? "" : "is-active"
              }">전체 언론사</a>
              <a class="subscription-toggle ${
                onlySubscriped ? "is-active" : ""
              }">
                내가 구독한 언론사
                ${Badge(subscribedCount, onlySubscriped)}
              </a>
            </div>
            <div class="view-toggle-buttons">
              <a class="view-toggle ${
                viewList ? "is-active" : ""
              }">${ListViewIcon()}</a>
              <a class="view-toggle ${
                !viewList ? "is-active" : ""
              }">${GridViewIcon()}</a>
            </div>
          </header>
    `;
}
