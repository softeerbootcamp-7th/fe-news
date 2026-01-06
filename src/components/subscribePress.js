import { subscribePressStore } from "../stores/subscribePressStore";
import { loadSVG } from "../utils/assetUtils";

/**
 * 구독 버튼의 상태를 토글하고 UI를 업데이트합니다.
 */
export function handleSubscribe() {
    const { subscribedPressIdList } = subscribePressStore.getState();
    const buttons = document.querySelectorAll('.subscribe-btn');

    buttons.forEach(btn => {
        const pressId = parseInt(btn.dataset.pressId, 10);
        const isSubscribed = subscribedPressIdList.includes(pressId);

        applySubscribedStyle(isSubscribed, btn);
    })

  loadSVG();
}

const applySubscribedStyle = (isSubscribed, btn) => {
    const icon = btn.querySelector('.btn-icon');
    const text = btn.querySelector('.btn-text');

    if (isSubscribed) {
        // 구독 상태로 변경
        btn.classList.add('subscribed');
        btn.classList.remove('btn-white');
        btn.classList.add('btn-grey');

        text.textContent = '해지하기';
        icon.dataset.svg = './public/assets/icons/closed.svg';
    } else {
        // 구독 해제
        btn.classList.remove('subscribed');
        btn.classList.remove('btn-grey');
        btn.classList.add('btn-white');

        text.textContent = '구독하기';
        icon.dataset.svg = './public/assets/icons/plus.svg';
    }
}

function updateCount() {
    const { subscribedPressIdList } = subscribePressStore.getState();
    const countElement = document.querySelector('.published-press-num');
    
    if (countElement) {
        countElement.textContent = subscribedPressIdList.length; 
    }
}

subscribePressStore.subscribe(handleSubscribe);
subscribePressStore.subscribe(updateCount);