import { renderCurrentDate } from './utils/date.js';
import { initSubscriptionBadge } from './utils/subscription/subscriptionController.js';
import { initSubscriptionTabs } from './utils/subscription/subscriptionTabController.js';
import { initSubscriptionStore } from './utils/subscription/subscriptionStore.js';
import { initViewTabs } from './utils/viewTabController.js';

import { initGridEvents } from './utils/grid/gridController.js';

import { initRollingTabs } from './rolling/rolling.js';

import { initPageController } from './utils/page/pageController.js';

import { loadNews } from './store/newsStore.js';

function initApp() {
    loadNews().then(() => {
        // 구독 언론사 저장
        initSubscriptionStore();

        // 날짜 렌더링
        renderCurrentDate('current-date');

        // 구독 언론사 수 뱃지 개수
        initSubscriptionBadge({
            badgeSelector: '.badge'
        });

        // 전체 언론사 & 구독 언론사 전환
        initSubscriptionTabs(); // 따라가면 setGridData? 그거때문에 그리드로 생성됨 > 거기서 전달 파라미터를 추가해서 수정하면 됨

        // 리스트 & 그리드 전환
        initViewTabs({
            listId: 'list-view',
            gridId: 'grid-view'
        });

        // 초기 그리드 상태
        initGridEvents({
            viewId: 'newsGrid',
            prevBtnId: 'prevBtn', // 이전 페이지 버튼
            nextBtnId: 'nextBtn'  // 다음 페이지 버튼
        });
        
        // 페이지 컨트롤러
        initPageController({
            prevBtnId: 'prevBtn',
            nextBtnId: 'nextBtn'
        });

        // 최신 기사 롤링 탭
        initRollingTabs();
    });
}

initApp();