import { TextTab } from "./tab/TextTab.js";
import { IconTab } from "./tab/IconTab.js";
import {
  PRESS_MODE_TABS,
  VIEW_MODE_TABS,
  VIEW_MODE_ICONS,
  STORE_KEY,
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
  return `
    <main class="bg-surface-alt mt-8">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          ${pressModeTab}
          ${viewModeTab}
        </div>
        <div id="news-content-area"></div>
      </div>
      <div class="relative">
        <button class="absolute top-1/2 translate-y-neg-1/2 w-12 h-12 rounded-full border bg-surface-default cursor-pointer flex items-center justify-center text-default transition-all hover:bg-surface-alt hover:border-bold hover:text-strong left-neg-20" aria-label="이전">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button class="absolute top-1/2 translate-y-neg-1/2 w-12 h-12 rounded-full border bg-surface-default cursor-pointer flex items-center justify-center text-default transition-all hover:bg-surface-alt hover:border-bold hover:text-strong right-neg-20" aria-label="다음">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </main>
  `;
}
