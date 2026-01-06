import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import { CloseIcon } from "../icons/CloseIcon";
import { PlusIcon } from "../icons/PlusIcon";
import "./SubscribeBtn.css";

export function SubscribeBtn(press, whiteBg = false) {
  const $el = makeNode(
    `<button class="subscribe-button
    }"></button>`
  );

  const render = () => {
    const { subscribedIds } = store.state;
    const is_subscribed = subscribedIds.has(press.id);

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

  window.addEventListener("subsListChange", render);
  render();

  $el.onclick = () => store.setTargetPressId(press.id, press.name);

  return $el;
}
