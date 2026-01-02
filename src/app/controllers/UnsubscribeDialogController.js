export class UnsubscribeDialogController {
  constructor({
    documentRef = document,
    windowRef = window,
    dialogId,
    pressNameSelector = '[data-role="press-name"]',
  } = {}) {
    this.document = documentRef;
    this.window = windowRef;
    this.dialogId = dialogId;
    this.pressNameSelector = pressNameSelector;
  }

  confirm({ pressName } = {}) {
    const $dialog = this.document.getElementById(this.dialogId);
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
