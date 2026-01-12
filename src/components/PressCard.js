import { Button } from "./Button.js";

export const PressCard = ({
  press,
  isDarkMode = false,
  isSubscribed = false,
}) => {
  const div = document.createElement("div");
  div.className =
    "press-card flex items-center justify-center border-b-r relative cursor-pointer";
  div.dataset.pressId = press.id;

  const img = document.createElement("img");
  img.src = isDarkMode ? press.darkLogo : press.lightLogo;
  img.alt = press.name;

  // Hover 시 보여줄 구독/구독해지 버튼 (절대 위치로 이미지 위에 오버레이)
  const subscribeBtn = document.createElement("div");
  subscribeBtn.className =
    "absolute inset-0 hidden items-center justify-center bg-white bg-opacity-95";
  subscribeBtn.innerHTML = Button({
    label: isSubscribed ? "구독해지하기" : "구독하기",
    iconType: isSubscribed ? "closed" : "plus",
    isWhiteMode: true,
  });

  // 마우스 이벤트로 호버 처리
  div.addEventListener("mouseenter", () => {
    subscribeBtn.classList.remove("hidden");
    subscribeBtn.classList.add("flex");
  });

  div.addEventListener("mouseleave", () => {
    subscribeBtn.classList.remove("flex");
    subscribeBtn.classList.add("hidden");
  });

  div.appendChild(img);
  div.appendChild(subscribeBtn);
  return div;
};
