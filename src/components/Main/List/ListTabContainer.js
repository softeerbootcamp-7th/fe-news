import { ListTab } from "./ListTab";
import "./ListSection.css";
import { makeNode } from "../../../utils/utils";

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
  const $el = makeNode(`<div class="list-tab-container"></div>`);
  tabNames.forEach((t) => $el.appendChild(ListTab(t, t == "IT")));
  return $el;
}
