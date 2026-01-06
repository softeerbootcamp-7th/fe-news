export function renderRollingItem($el, item, { isSwitching = false } = {}) {
  if (!$el || !item) return;
  const $source = $el.querySelector(".newsbar__source");
  const $title = $el.querySelector(".newsbar__title");
  if ($source) $source.textContent = item.press || "-";
  if ($title) $title.textContent = item.title;
  $el.href = item.link || "#";

  if (isSwitching) {
    $el.classList.remove("is-switching");
    // Two rAFs ensure the removal is committed before re-adding.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        $el.classList.add("is-switching");
      });
    });
  }
}

export function setRollingPaused($el, isPaused) {
  if (!$el) return;
  $el.classList.toggle("is-paused", Boolean(isPaused));
}
