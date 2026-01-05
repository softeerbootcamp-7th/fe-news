import { ListTab } from "./ListTab";
import "./ListSection.css";

export function ListTabContainer() {
  const tabNames = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
  ];
  return `
    <div class="list-tab-container">
        ${tabNames.map((t) => ListTab(t, t == "IT")).join("")}
    </div>
    `;
}
