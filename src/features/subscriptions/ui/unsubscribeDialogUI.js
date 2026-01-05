export function getUnsubscribeDialog(documentRef, selector) {
  return documentRef.querySelector(selector);
}

export function setUnsubscribePressName($dialog, selector, pressName) {
  if (!$dialog) return;
  const $name = $dialog.querySelector(selector);
  if ($name) $name.textContent = pressName || "언론사";
}

export function bindDialogBackdropClose($dialog) {
  if (!$dialog || $dialog.dataset.backdropBound) return;
  $dialog.addEventListener("click", (e) => {
    if (e.target === $dialog) $dialog.close("cancel");
  });
  $dialog.dataset.backdropBound = "1";
}
