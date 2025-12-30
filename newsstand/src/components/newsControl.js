export const controls = () => {
  const controlSection = document.createElement("controlSection");
  controlSection.classList.add("ns-controls");
  controlSection.setAttribute("aria-label", "언론사 목록 보기 설정");

  /* ---------- LEFT : 전체/구독 탭 ---------- */
  const left = document.createElement("div");
  left.classList.add("ns-controls__left");

  const tabs = document.createElement("div");
  tabs.classList.add("ns-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "언론사 범위 선택");

  // 전체 언론사 탭
  const tabAll = document.createElement("button");
  tabAll.classList.add("ns-tab", "ns-tab--active");
  tabAll.type = "button";
  tabAll.setAttribute("role", "tab");
  tabAll.setAttribute("aria-selected", "true");
  tabAll.textContent = "전체 언론사";

  // 내가 구독한 언론사 탭
  const tabMy = document.createElement("button");
  tabMy.classList.add("ns-tab");
  tabMy.type = "button";
  tabMy.setAttribute("role", "tab");
  tabMy.setAttribute("aria-selected", "false");
  tabMy.textContent = "내가 구독한 언론사";

  const badge = document.createElement("span");
  badge.classList.add("ns-tab__badge");
  badge.setAttribute("aria-label", "구독한 언론사 수");
  badge.textContent = "8";

  tabMy.appendChild(badge);

  tabs.appendChild(tabAll);
  tabs.appendChild(tabMy);

  left.appendChild(tabs);

  /* ---------- RIGHT : 보기 방식 전환 ---------- */
  const right = document.createElement("div");
  right.classList.add("ns-controls__right");
  right.setAttribute("aria-label", "보기 방식 선택");

  // 그리드 버튼
  const gridBtn = document.createElement("button");
  gridBtn.classList.add("ns-view-toggle", "ns-view-toggle--active");
  gridBtn.type = "button";
  gridBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-label", "그리드로 보기");
  gridBtn.textContent = "그리드";

  // 리스트 버튼
  const listBtn = document.createElement("button");
  listBtn.classList.add("ns-view-toggle");
  listBtn.type = "button";
  listBtn.setAttribute("aria-pressed", "false");
  listBtn.setAttribute("aria-label", "리스트로 보기");
  listBtn.textContent = "리스트";

  right.appendChild(gridBtn);
  right.appendChild(listBtn);

  /* ---------- controlSection 조립 ---------- */
  controlSection.appendChild(left);
  controlSection.appendChild(right);

  return { controlSection };
};
