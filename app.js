import { renderCurrentDate } from './utils/date.js';
import { initGrid } from './utils/gridController.js';
import { initSubscriptionBadge } from './utils/subscriptionController.js';
import { initSubscriptionTabs } from './utils/subscriptionTabController.js';
import { initSubscriptionStore } from './utils/subscriptionStore.js';
import { initViewTabs } from './utils/viewTabController.js';
import { initRollingTabs } from './rolling/rolling.js';

function initApp() {
  // 구독 언론사 저장
  initSubscriptionStore();

  // 날짜 렌더링
  renderCurrentDate('current-date');

  // 그리드 렌더링
  initGrid({
    gridId: 'newsGrid',   // 그리드
    prevBtnId: 'prevBtn', // 이전 페이지 버튼
    nextBtnId: 'nextBtn'  // 다음 페이지 버튼
  });

  // 구독 언론사 수 뱃지 개수
  initSubscriptionBadge({
    badgeSelector: '.badge'
  });

  // 전체 언론사 & 구독 언론사 전환
  initSubscriptionTabs();

  // 리스트 & 그리드 전환(리스트 구현 X)
  initViewTabs();

  // 최신 기사 롤링 탭
  initRollingTabs();
}

initApp();