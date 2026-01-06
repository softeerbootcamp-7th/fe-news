import { makeNode } from "../../../utils/utils";
import "./ListSection.css";
import { ListTabContainer } from "./ListTabContainer";
import { PressDashboard } from "./PressDashboard";

export function ListSection() {
  const $el = makeNode(`
        <div class="list-section">
          ${ListTabContainer()}
          ${PressDashboard()}
        </div>`);
  return $el;
}
