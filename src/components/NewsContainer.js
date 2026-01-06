import { TextTab } from "./tab/TextTab.js";
import { IconTab } from "./tab/IconTab.js";
import { Button } from "./Button.js";
import {
  PRESS_MODE_TABS,
  VIEW_MODE_TABS,
  VIEW_MODE_ICONS,
  STORE_KEY,
  BUTTON_ICONS,
} from "../../src/constants.js";

export function NewsContainer() {
  const pressModeTab = TextTab({
    tabItems: PRESS_MODE_TABS,
    groupName: STORE_KEY.PRESS_MODE,
  });
  const viewModeTab = IconTab({
    tabItems: VIEW_MODE_TABS,
    tabIcons: VIEW_MODE_ICONS,
    groupName: STORE_KEY.VIEW_MODE,
  });
  const button = Button({
    label: "구독하기",
    iconType: BUTTON_ICONS[0],
    isWhiteMode: false,
  });
  return `
    <main class="mt-8">
      <div class="flex flex-col gap-4 relative">
        <div class="flex justify-between">
          ${pressModeTab}
          ${viewModeTab}
        </div>
        <div id="news-content-area"></div>
        ${button}
        <button class="absolute top-1/2 left-neg-18 border-none bg-transparent">
          <svg width="24" height="40" viewBox="0 0 24 40">
            <use href="/assets/icons/left-button.svg"/>
           </svg>
        </button>
        <button class="absolute top-1/2 right-neg-18 border-none bg-transparent">
          <svg width="24" height="40" viewBox="0 0 24 40">
            <use href="/assets/icons/right-button.svg"/>
           </svg>
        </button>
      </div>
      
    </main>
  `;
}
