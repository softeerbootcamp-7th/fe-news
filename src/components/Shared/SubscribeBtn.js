import { cleanupEventListenerMap } from "../../infrastructure/domObserver";
import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import { CloseIcon } from "../icons/CloseIcon";
import { LoadingAltLoopIcon } from "../icons/LoadingAltLoopIcon";
import { PlusIcon } from "../icons/PlusIcon";
import "./SubscribeBtn.css";

export function SubscribeBtn(pressId, whiteBg = false) {
  const $el = makeNode(
    `<button class="subscribe-button
    }"></button>`
  );

  let isLoading = false;

  const render = () => {
    const { subscribedIds } = store.state;
    const is_subscribed = subscribedIds.has(pressId);

    $el.innerHTML = is_subscribed
      ? whiteBg
        ? CloseIcon()
        : `${CloseIcon()} <span class="subscribe-label">구독해제</span>`
      : `${PlusIcon()} <span class="subscribe-label">구독하기</span>`;

    $el.classList.toggle(
      "gray-bg",
      (!whiteBg & is_subscribed) | (whiteBg & !is_subscribed)
    );
  };

  const delayAndSubscribe = () => {
    $el.innerHTML = LoadingAltLoopIcon();
    $el.classList.add("loading");
    isLoading = true;
    setTimeout(() => {
      store.subscribePress(pressId);
      $el.classList.remove("loading");
      isLoading = false;
    }, 500);
  };
  const onConfirmClick = () => {
    if (isLoading) return;
    const { subscribedIds } = store.state;
    const is_subscribed = subscribedIds.has(pressId);

    if (is_subscribed) store.setTargetPressId(pressId);
    else delayAndSubscribe();
    //구독하기
  };

  $el.onclick = () => onConfirmClick();

  window.addEventListener("subsListChange", render);
  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("subsListChange", render);
  });
  render();

  return $el;
}
