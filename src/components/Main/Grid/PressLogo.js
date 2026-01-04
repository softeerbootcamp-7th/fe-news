import { subsStore } from "../../../store";
import { CloseIcon } from "../../icons/CloseIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import "./PressLogo.css";

export function PressLogo(press) {
  if (!press) return `<div class="press-logo-item placeholder"></div>`;

  const { subscribedIds } = subsStore.state;
  const is_subscribed = subscribedIds.has(press.id);
  return `
    <div class="press-logo-item">
      <img src=${press.logo} alt="언론사 로고" class="press-logo-image" />
      <div class="press-logo-overlay">
        <button class="subscribe-button" data-id=${press.id} data-name=${
    press.name
  }>${
    is_subscribed ? `${CloseIcon()} 구독해제` : `${PlusIcon()} 구독하기`
  }</button>
      </div>
    </div>
  `;
}
