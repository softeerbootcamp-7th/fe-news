import { viewStore } from "../../store";
import { GridSection } from "./Grid/GridSection";
import { ListSection } from "./List/ListSection";
import { MainSectionHeader } from "./MainSectionHeader";

import "./MainContent.css";

export function MainContents() {
  const { viewGrid } = viewStore.state;
  return `
        <main class="main-section">
            ${MainSectionHeader(8)}
            ${viewGrid ? GridSection() : ListSection()}
        </main>
    `;
}
