import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import { CloseIcon } from "../icons/CloseIcon";
import { PlusIcon } from "../icons/PlusIcon";
import "./SubscribeBtn.css";

export function SubscribeBtn(press, is_subscribed) {
  const $subscribeBtn = makeNode(`<button class="subscribe-button" data-id=${
    press.id
  } data-name=${press.name}>${PlusIcon()} 구독하기
    </button>`);
  const $cancleBtn = makeNode(
    `<button class="subscribe-button" data-id=${press.id} data-name=${
      press.name
    }>${CloseIcon()} 구독해제</button>`
  );

  const $el = is_subscribed ? $cancleBtn : $subscribeBtn;

  $el.onclick = () => store.setTargetPressId(press.id, press.name);

  return $el;
}
