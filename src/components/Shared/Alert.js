import { cleanupEventListenerMap } from "../../infrastructure/domObserver";
import { store } from "../../store";
import { makeNode } from "../../utils/utils";
import "./Alert.css";

export function Alert() {
  const $el = makeNode(`
    <div class="alert-modal hidden">
      <div class="alert-content">
        <div class="alert-message">
            <div>
              <strong id="alert-target"></strong>을(를)
            </div>
            <div id="alert-order"></div>
        </div>
      </div>
      <div class="alert-actions">
        <button class="alert-btn confirm-btn"></button>
        <button class="alert-btn cancel-btn">아니오</button>
      </div>
    </div>`);

  // 업데이트할 요소들 미리 참조
  const $targetName = $el.querySelector("#alert-target");
  const $orderText = $el.querySelector("#alert-order");
  const $confirmBtn = $el.querySelector(".confirm-btn");
  const $cancelBtn = $el.querySelector(".cancel-btn");

  const reRender = () => {
    const { targetPressId, targetPressName, subscribedIds } = store.state;

    if (targetPressId === null) {
      $el.classList.add("hidden");
      return;
    }
    const isSubscribed = subscribedIds.has(targetPressId);

    $el.classList.remove("hidden");
    $targetName.textContent = targetPressName;
    $orderText.textContent = isSubscribed
      ? "구독해지 하시겠습니까?"
      : "구독 하시겠습니까?";
    $confirmBtn.textContent = `예, ${isSubscribed ? "해지" : "구독"}합니다`;
  };

  // '예' 버튼 클릭 시
  $confirmBtn.onclick = () => store.toggleSub();
  // '아니오' 버튼 클릭 시
  $cancelBtn.onclick = () => store.setTargetPressId(null, "");

  window.addEventListener("subscribeTargetChange", reRender);
  window.addEventListener("subsListChange", reRender);

  cleanupEventListenerMap.set($el, () => {
    window.removeEventListener("subscribeTargetChange", reRender);
    window.removeEventListener("subsListChange", reRender);
  });

  return $el;
}
