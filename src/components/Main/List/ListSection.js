import { Next } from "../../icons/Next";
import { Prev } from "../../icons/Previous";
import "./ListSection.css";
import { ListTabContainer } from "./ListTabContainer";
import { PressDashboard } from "./PressDashboard";

export function ListSection() {
  return `
    <section class="list-section">
        ${Prev()}
        <div class="list-container">
          ${ListTabContainer()}
          ${PressDashboard()}
        </div>
        ${Next()}
    </section>`;
}
