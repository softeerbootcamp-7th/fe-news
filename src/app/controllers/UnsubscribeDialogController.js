export class UnsubscribeDialogController {
  constructor({
    context,
    // backward compatible
    documentRef,
    windowRef,
    dialogId,
    dialogSelector,
    pressNameSelector,
  } = {}) {
    const ctx = context ?? {};
    this.document = ctx.document ?? documentRef ?? document;
    this.window = ctx.window ?? windowRef ?? window;
    const selectors = ctx.selectors ?? {};
    const dialogSelectorFromId =
      typeof dialogId === "string" && dialogId
        ? dialogId.startsWith("#")
          ? dialogId
          : `#${dialogId}`
        : null;

    this.dialogSelector =
      dialogSelector ??
      dialogSelectorFromId ??
      selectors.unsubscribeDialog ??
      "#unsubscribe-dialog";
    this.pressNameSelector =
      pressNameSelector ?? selectors.unsubscribePressName ?? '[data-role="press-name"]';
  }

  confirm({ pressName } = {}) {
    const $dialog = this.document.querySelector(this.dialogSelector);
    if (!($dialog instanceof this.window.HTMLDialogElement)) {
      return Promise.resolve(
        this.window.confirm(
          `${pressName || "선택한 언론사"}을(를) 구독해지하시겠습니까?`
        )
      );
    }

    const $name = $dialog.querySelector(this.pressNameSelector);
    if ($name) $name.textContent = pressName || "언론사";

    // backdrop click => cancel (bind once)
    if (!$dialog.dataset.backdropBound) {
      $dialog.addEventListener("click", (e) => {
        if (e.target === $dialog) $dialog.close("cancel");
      });
      $dialog.dataset.backdropBound = "1";
    }

    return new Promise((resolve) => {
      const onClose = () => {
        $dialog.removeEventListener("close", onClose);
        resolve($dialog.returnValue === "confirm");
      };
      $dialog.addEventListener("close", onClose);
      $dialog.showModal();
    });
  }
}
