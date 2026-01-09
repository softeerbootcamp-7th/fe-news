import { cleanupEventListenerMap } from "../../infrastructure/domObserver";
import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import { CloseIcon } from "../icons/CloseIcon";
import { PlusIcon } from "../icons/PlusIcon";
import "./SubscribeBtn.css";

export function SubscribeBtn(pressId, whiteBg = false) {
  const $el = makeNode(
    `<button class="subscribe-button
    }"></button>`
  );

  const render = () => {
    const { subscribedIds } = store.state;
    const is_subscribed = subscribedIds.has(pressId);

    $el.innerHTML = is_subscribed
      ? whiteBg
        ? CloseIcon()
        : `${CloseIcon()} 구독해제`
      : `${PlusIcon()} 구독하기`;

    $el.classList.toggle(
      "gray-bg",
      (!whiteBg & is_subscribed) | (whiteBg & !is_subscribed)
    );
  };

  $el.onclick = () => store.setTargetPressId(pressId);

  window.addEventListener("subsListChange", render);
  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("subsListChange", render);
  });

  render();
  return $el;
}
