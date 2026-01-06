import { makeNode } from "../../../utils/utils";
import { SubscribeBtn } from "../../Shared/SubscribeBtn";
import "./PressLogo.css";

export function PressLogo(press) {
  const $el = makeNode(`<div class="press-logo-item"></div>`);
  if (!press) return $el;

  const $logo =
    makeNode(`<img src=${press.logo} alt="언론사 로고" class="press-logo-image" />
      `);
  $el.appendChild($logo);

  const $containerOnHover = makeNode(`<div class="press-logo-overlay"></div>`);
  $containerOnHover.appendChild(SubscribeBtn(press));

  $el.appendChild($containerOnHover);
  return $el;
}
