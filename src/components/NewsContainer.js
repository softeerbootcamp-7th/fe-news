import { TextTab } from "./tab/TextTab.js";
import { IconTab } from "./tab/IconTab.js";
import { Button } from "./Button.js";
import {
  PRESS_MODE_TABS,
  VIEW_MODE_TABS,
  VIEW_MODE_ICONS,
  TAB_GROUP,
  BUTTON_ICONS,
} from "@/constants.js";

export function NewsContainer() {
  const pressModeTab = TextTab({
    tabItems: PRESS_MODE_TABS,
    groupName: TAB_GROUP.PRESS_MODE,
  });
  const viewModeTab = IconTab({
    tabItems: VIEW_MODE_TABS,
    tabIcons: VIEW_MODE_ICONS,
    groupName: TAB_GROUP.VIEW_MODE,
  });

  return `
    <main class="mt-8">
      <div class="flex flex-col gap-4 relative">
        <div class="news-tab-area flex justify-between">
          ${pressModeTab}
          ${viewModeTab}
        </div>
        <div id="news-content-area">
          <div id="all-press-container" class="grid gap-0 grid-cols-6 grid-rows-4 mt-6 w-930 h-97 border-t-l"></div>
          <div id="subscribed-press-container" class="grid gap-0 grid-cols-6 grid-rows-4 mt-6 w-930 h-97 border-t-l" style="display: none;"></div>
        </div>
        <button id="prev-page-btn" class="absolute top-1/2 left-neg-18 border-none bg-transparent" style="display: none;">
          <svg width="24" height="40" viewBox="0 0 24 40">
            <use href="/assets/icons/left-button.svg"/>
           </svg>
        </button>
        <button id="next-page-btn" class="absolute top-1/2 right-neg-18 border-none bg-transparent">
          <svg width="24" height="40" viewBox="0 0 24 40">
            <use href="/assets/icons/right-button.svg"/>
           </svg>
        </button>
      </div>
      
    </main>
  `;
}
