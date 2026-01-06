import { makeNode } from "../../../utils/utils";

export function ListTab(tabName, isActive) {
  const currentNum = 1;
  const totalNum = 10;
  const $el = makeNode(`
        <div class="list-tab ${isActive ? "active" : ""}">
            ${tabName}
            ${isActive ? `<span>${currentNum}/${totalNum} </span>` : ""}
        </div>
    `);
  return $el;
}
