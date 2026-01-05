import { subsStore } from "../../../store";
import { CloseIcon } from "../../icons/CloseIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { SubscribeBtn } from "../../Shared/SubscribeBtn";
import "./PressLogo.css";

export function PressLogo(press) {
  if (!press) return `<div class="press-logo-item placeholder"></div>`;

  const { subscribedIds } = subsStore.state;
  const is_subscribed = subscribedIds.has(press.id);
  return `
    <div class="press-logo-item">
      <img src=${press.logo} alt="언론사 로고" class="press-logo-image" />
      <div class="press-logo-overlay">
        ${SubscribeBtn(press, is_subscribed)}
      </div>
    </div>
  `;
}
