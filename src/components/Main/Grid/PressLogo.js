import { CloseIcon } from "../../icons/CloseIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import "./PressLogo.css";

export function PressLogo(logo, is_subscribed = false) {
  const displayLogo = logo
    ? logo
    : "https://dummyimage.com/80x30/f4f4f4/000&text=Logo";

  return `
    <div class="press-logo-item">
      <img src="${displayLogo}" alt="언론사 로고" class="press-logo-image" />
      <div class="press-logo-overlay">
        <button class="subscribe-button">${
          is_subscribed ? `${CloseIcon()} 구독해제` : `${PlusIcon()} 구독하기`
        }</button>
      </div>
    </div>
  `;
}
