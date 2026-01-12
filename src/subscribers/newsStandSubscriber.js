import { PRESS_LIST } from "@/dummy.js";
import { PressCard } from "@/components/PressCard.js";
import { Badge } from "@/components/Badge.js";
import { PRESS_MODE_TABS } from "@/constants.js";

// 전체/구독 탭의 배지 업데이트
const updateSubscribedPressCount = ({ subscribedPressIds }) => {
  const tabElement = document.querySelector(
    `[data-tab-item="${PRESS_MODE_TABS[1]}"]`
  );
  if (!tabElement) return;

  // 기존 배지 제거
  const existingBadge = tabElement.querySelector("span");
  if (existingBadge) {
    existingBadge.remove();
  }

  // Badge HTML을 직접 삽입
  tabElement.insertAdjacentHTML(
    "beforeend",
    Badge({ count: subscribedPressIds.length })
  );
};

// 구독정보가 바뀌었다고 알림 받았을 떄 -> 구독한 언론사 카드들 업데이트
const updateSubscribedPressCards = ({ subscribedPressIds }) => {
  const subscribedContainer = document.getElementById(
    "subscribed-press-container"
  );
  if (!subscribedContainer) return;

  // 구독한 언론사 카드들만 필터링
  const subscribedPressList = PRESS_LIST.filter((press) =>
    subscribedPressIds.includes(press.id)
  );

  // 기존 카드들 제거
  subscribedContainer.innerHTML = "";

  // 24개 그리드를 항상 유지 (6x4)
  const totalSlots = 24;

  for (let i = 0; i < totalSlots; i++) {
    const press = subscribedPressList[i];

    if (press) {
      const card = PressCard({ press, isSubscribed: true });
      subscribedContainer.appendChild(card);
    } else {
      // 빈 카드 추가 (경계선만 표시)
      const emptyCard = document.createElement("div");
      emptyCard.className =
        "press-card flex items-center justify-center border-b-r";
      subscribedContainer.appendChild(emptyCard);
    }
  }
};

const updatePressMode = ({ pressMode, subscribedPressIds, pageIdx }) => {
  const allContainer = document.getElementById("all-press-container");
  const subscribedContainer = document.getElementById(
    "subscribed-press-container"
  );
  if (!allContainer || !subscribedContainer) return;

  if (pressMode === PRESS_MODE_TABS[0]) {
    // 전체 언론사 탭
    allContainer.style.display = "grid";
    subscribedContainer.style.display = "none";

    // 전체 언론사 카드가 없으면 초기 렌더링
    if (allContainer.children.length === 0) {
      renderAllPressCards(allContainer, subscribedPressIds, pageIdx);
    }
  } else {
    // 구독 언론사 탭
    allContainer.style.display = "none";
    subscribedContainer.style.display = "grid";
  }
};

// 전체 언론사 카드 초기 렌더링
const renderAllPressCards = (container, subscribedPressIds, pageIdx) => {
  container.innerHTML = "";
  // 24개 그리드를 항상 유지 (6x4)
  const totalSlots = 24;
  const startIdx = pageIdx * 24;
  const endIdx = startIdx + 24;
  const pagePressList = PRESS_LIST.slice(startIdx, endIdx);

  for (let i = 0; i < totalSlots; i++) {
    const press = pagePressList[i];

    if (press) {
      const isSubscribed = subscribedPressIds.includes(press.id);
      const card = PressCard({ press, isSubscribed });
      // 구독한 언론사는 활성화 표시
      if (isSubscribed) {
        card.classList.add("subscribed");
      }
      container.appendChild(card);
    } else {
      // 빈 카드 추가 (경계선만 표시)
      const emptyCard = document.createElement("div");
      emptyCard.className =
        "press-card flex items-center justify-center border-b-r";
      container.appendChild(emptyCard);
    }
  }
};

// 전체 언론사 탭의 구독 상태 업데이트
const updateAllPressSubscriptionState = ({ subscribedPressIds }) => {
  const allContainer = document.getElementById("all-press-container");
  if (!allContainer) return;

  // 모든 카드의 구독 상태 업데이트
  const cards = allContainer.querySelectorAll(".press-card");
  cards.forEach((card) => {
    const pressId = Number(card.dataset.pressId);
    if (subscribedPressIds.includes(pressId)) {
      card.classList.add("subscribed");
    } else {
      card.classList.remove("subscribed");
    }
  });
};

// 페이지 변경 시 전체 언론사 카드 다시 렌더링
const updatePageIdx = ({ pageIdx, subscribedPressIds, pressMode }) => {
  // 전체 언론사 탭일 때만 렌더링
  if (pressMode !== PRESS_MODE_TABS[0]) return;

  const allContainer = document.getElementById("all-press-container");
  if (!allContainer) return;

  renderAllPressCards(allContainer, subscribedPressIds, pageIdx);
  updateNavigationButtons(pageIdx);
};

// 화살표 버튼 표시/숨김 업데이트
const updateNavigationButtons = (pageIdx) => {
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");
  if (!prevBtn || !nextBtn) return;

  const totalPages = Math.ceil(PRESS_LIST.length / 24);

  // 첫 페이지(0)에서는 이전 버튼 숨김
  prevBtn.style.display = pageIdx === 0 ? "none" : "block";

  // 마지막 페이지에서는 다음 버튼 숨김
  nextBtn.style.display = pageIdx === totalPages - 1 ? "none" : "block";
};

export {
  updateSubscribedPressCount,
  updateSubscribedPressCards,
  updatePressMode,
  updateAllPressSubscriptionState,
  updatePageIdx,
};
