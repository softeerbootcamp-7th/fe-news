import {
  bindDialogBackdropClose,
  getUnsubscribeDialog,
  setUnsubscribePressName,
} from "../ui/unsubscribeDialogUI.js";

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
      pressNameSelector ??
      selectors.unsubscribePressName ??
      '[data-role="press-name"]';
  }

  confirm({ pressName } = {}) {
    const $dialog = getUnsubscribeDialog(this.document, this.dialogSelector);
    if (!($dialog instanceof this.window.HTMLDialogElement)) {
      return Promise.resolve(
        this.window.confirm(
          `${pressName || "선택한 언론사"}을(를) 구독해지하시겠습니까?`
        )
      );
    }

    setUnsubscribePressName($dialog, this.pressNameSelector, pressName);

    // backdrop click => cancel (bind once)
    bindDialogBackdropClose($dialog);

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
