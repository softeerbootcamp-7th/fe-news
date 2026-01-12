import { $ } from "../../../shared/lib/index.js";

export function renderNewsListView({ documentRef, selector } = {}) {
  const $logos = $(selector, documentRef);
  if (!$logos) return;

  const template = $("#news-list-template", documentRef);
  if (!template) return;

  $logos.classList.add("is-newslist");
  $logos.innerHTML = "";
  $logos.appendChild(template.content.cloneNode(true));
}

export function renderTabs({
  documentRef,
  activeTab,
  subscribedModel,
  categoryModel,
} = {}) {
  const $tabs = $('[data-role="newslist-tabs"]', documentRef);
  if (!$tabs) return;

  if (activeTab === "subscribed") {
    const entries = subscribedModel?.entries ?? [];
    const activeIndex = subscribedModel?.activeIndex ?? 0;
    const duration = `${(subscribedModel?.durationMs ?? 0) / 1000}s`;
    $tabs.innerHTML = entries.length
      ? entries
          .map((entry, index) => {
            const isActive = index === activeIndex;
            return `
              <button
                class="newslist__tab ${isActive ? "is-active" : ""}"
                type="button"
                data-action="newslist-tab"
                data-key="${entry.key}"
                data-press="${entry.press}"
                ${isActive ? `style="--progress-duration: ${duration};"` : ""}
              >
                <span class="newslist__label">${entry.press}</span>
                <img class="newslist__chevron" src="./icons/chevron-right.svg" alt="" />
              </button>
            `;
          })
          .join("")
      : `<div class="newslist__empty-tab">구독한 언론사가 없습니다.</div>`;
  } else {
    const categoryOrder = categoryModel?.categoryOrder ?? [];
    const activeCategory = categoryModel?.activeCategory ?? null;
    const activeCount = categoryModel?.activeCount ?? null;
    const duration = `${(categoryModel?.durationMs ?? 0) / 1000}s`;
    $tabs.innerHTML = categoryOrder
      .map((category) => {
        const isActive = category === activeCategory;
        const countText =
          isActive && activeCount
            ? `${activeCount.currentIndex}/${activeCount.total}`
            : "";
        return `
          <button
            class="newslist__tab ${isActive ? "is-active" : ""}"
            type="button"
            data-action="newslist-tab"
            data-category="${category}"
            ${isActive ? `style="--progress-duration: ${duration};"` : ""}
          >
            <span class="newslist__label">${category}</span>
            ${isActive && countText ? `<span class="newslist__count">${countText}</span>` : ""}
          </button>
        `;
      })
      .join("");
  }

  enableTabsDrag($tabs);
  scrollActiveTabIntoView($tabs);
}

export function renderNewsPanel({ documentRef, panelModel } = {}) {
  const root = $(".newslist", documentRef);
  if (!root) return;

  const $panel = $(".newslist__panel", root);
  if (!$panel) return;

  const item = panelModel?.item ?? null;
  if (!item) {
    $panel.innerHTML = `
      <div class="newslist__empty">
        아직 표시할 뉴스가 없습니다.
      </div>
    `;
    return;
  }

  const isSubscribed = panelModel?.isSubscribed ?? false;
  const related = panelModel?.related ?? [];
  const pressName = panelModel?.pressName ?? "";
  const logoUrl = panelModel?.logoUrl ?? "";
  const mainImg = item.mainImg ?? "";
  const mainTitle = item.mainTitle ?? "";
  const subButtonText = isSubscribed ? "구독중" : "구독하기";

  $panel.innerHTML = `
    <div class="newslist__header">
      <div class="newslist__press">
        <img class="newslist__logo" src="${logoUrl}" alt="${pressName}" />

      </div>
      <div class="newslist__meta">
        <time class="newslist__time">${item.time ?? ""}</time>
        <button
          class="newslist__sub ${isSubscribed ? "is-subscribed" : ""}"
          type="button"
          ${isSubscribed ? "disabled" : ""}
          data-action="newslist-subscribe"
          data-press="${pressName}"
        >
          <span class="newslist__sub-text">${subButtonText}</span>
        </button>
      </div>
    </div>
    <div class="newslist__body">
      <a class="newslist__main" href="${
        item.mainLink
      }" target="_blank" rel="noreferrer">
        <img class="newslist__thumb" src="${mainImg}" alt="${mainTitle}" />
        <div class="newslist__main-text">
          <strong class="newslist__main-title">${mainTitle}</strong>
        </div>
      </a>
      <ul class="newslist__subs">
        ${related
          .map(
            (rel) => `
            <li>
              <a href="${
                rel.link
              }" target="_blank" rel="noreferrer" class="newslist__sub-link">
                ${rel.title ?? ""}
              </a>
            </li>
          `
          )
          .join("")}
          <p class="newslist__notice">
            ${pressName} 언론사에서 직접 편집한 뉴스입니다.
          </p>
      </ul>
    </div>
  `;
}

function scrollActiveTabIntoView($tabs) {
  const $active = $(".newslist__tab.is-active", $tabs);
  if (!$active) return;

  requestAnimationFrame(() => {
    const padding = 16;
    const tabs = [...$tabs.querySelectorAll(".newslist__tab")];
    const activeIndex = tabs.indexOf($active);
    if (activeIndex < 0) return;

    const visibleLeft = $tabs.scrollLeft + padding;
    const visibleRight = $tabs.scrollLeft + $tabs.clientWidth - padding;
    const leftEdge = $active.offsetLeft;
    const rightEdge = leftEdge + $active.offsetWidth;
    const isVisible = leftEdge >= visibleLeft && rightEdge <= visibleRight;
    if (isVisible) return;

    const maxScroll = Math.max(0, $tabs.scrollWidth - $tabs.clientWidth);
    let target = $tabs.scrollLeft;
    if (leftEdge < visibleLeft) {
      target = $active.offsetLeft - padding;
    } else if (rightEdge > visibleRight) {
      target =
        $active.offsetLeft -
        ($tabs.clientWidth - $active.offsetWidth) +
        padding;
    }

    const nextScroll = Math.max(0, Math.min(target, maxScroll));
    if (nextScroll === $tabs.scrollLeft) return;
    $tabs.scrollTo({ left: nextScroll });
  });
}

function enableTabsDrag($tabs) {
  if (!$tabs || $tabs.dataset.dragReady === "true") return;
  $tabs.dataset.dragReady = "true";

  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let suppressClickUntil = 0;
  const dragThreshold = 6;

  const onPointerDown = (event) => {
    if (event.button && event.button !== 0) return;
    startX = event.clientX;
    startScroll = $tabs.scrollLeft;
    isDragging = false;

    const onPointerMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      if (!isDragging) {
        if (Math.abs(delta) < dragThreshold) return;
        isDragging = true;
      }
      moveEvent.preventDefault();
      $tabs.scrollLeft = startScroll - delta;
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (isDragging) {
        suppressClickUntil = Date.now() + 200;
      }
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const onClick = (event) => {
    if (Date.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  $tabs.addEventListener("pointerdown", onPointerDown);
  $tabs.addEventListener("click", onClick, true);
}
