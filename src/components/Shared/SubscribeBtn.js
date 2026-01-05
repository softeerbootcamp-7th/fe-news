import { CloseIcon } from "../icons/CloseIcon";
import { PlusIcon } from "../icons/PlusIcon";
import "./SubscribeBtn.css";

export function SubscribeBtn(press, is_subscribed) {
  return `<button class="subscribe-button" data-id=${press.id} data-name=${
    press.name
  }>${
    is_subscribed ? `${CloseIcon()} 구독해제` : `${PlusIcon()} 구독하기`
  }</button>`;
}
