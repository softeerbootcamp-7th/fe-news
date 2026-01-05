import { getPressListTemplate } from "@/template/ListView";

const listContainer = document.querySelector(".press-section");

export function initListView() {
  // 첫 list 레이아웃 그리기
  listContainer.innerHTML = getPressListTemplate({});
}
