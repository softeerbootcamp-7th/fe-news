import { presses } from '../../data/presses.js';                   // 가공한 언론사 데이터(이름, 로고)
import { getSubscribedPresses } from './subscriptionStore.js';  // 전체 언론사 중 구독한 언론사만 필터링
import { setGridData } from '../grid/gridController.js';           
import { getPageMode } from '../page/pageController.js';   

// 전체 그리드, 구독 그리드 전환
export function initSubscriptionTabs() {
  // 전체 언론사, 구독 언론사, 뱃지 스타일 수정용
  const allTab = document.querySelector('.container-nav-left > span');
  const subscribedTab = document.querySelector('.container-subscribed .subscribed-presses');
  const badge = document.querySelector('.badge');

  // 전체 언론사 탭 클릭
  allTab.addEventListener('click', () => {
    setActive(allTab);  // 전체 언론사 active
    // 스타일 지정
    allTab.classList.add('selected-bold16');
    allTab.classList.remove('available-medium16');
    subscribedTab.classList.remove('selected-bold16');
    subscribedTab.classList.add('available-medium16');
    if (getPageMode() === 'GRID') {
      setGridData(presses); // 전체 언론사를 그리드에 배치
    }
    else if (getPageMode() === 'LIST') {
      console.log('list-all');
    }
  });

  subscribedTab.addEventListener('click', () => {
    setActive(subscribedTab);       // 구독한 언론사 active
    badge.classList.add('active');  // badge active
    // 스타일 지정
    subscribedTab.classList.add('selected-bold16');
    subscribedTab.classList.remove('available-medium16');
    allTab.classList.remove('selected-bold16');
    allTab.classList.add('available-medium16');
    if (getPageMode() === 'GRID') {
      setGridData(getSubscribedPresses());  // 구독한 언론사만 그리드에 배치
    }
    else if (getPageMode() === 'LIST') {
      console.log('list-subscribed');
    }
  });
}

// DOM요소 active
function setActive(target) {
  document
    .querySelectorAll('.container-nav-left > span, .container-subscribed .subscribed-presses, .badge')
    .forEach(el => el.classList.remove('active'));  // 해당 DOM의 클래스에서 active 삭제

  target.classList.add('active'); // 지정한 target DOM의 클래스에만 active 부여
}
