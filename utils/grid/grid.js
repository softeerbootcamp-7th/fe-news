import { isSubscribed, toggleSubscribe } from '../subscription/subscriptionStore.js'; // 구독한 언론사
import { openUnsubscribeModal } from '../modalController.js';            // 구독 해지시 모달

const ITEMS_PER_PAGE = 24;  // 그리드 한 페이지 당 언론사 24개 (6 x 4)

export function renderGrid({ container, data, page }) {
  container.innerHTML = '';                           // 그리드 생성 및 업데이트 시 내부 요소 초기화
  const fragment = document.createDocumentFragment(); // 가상 DOM을 생성해 1번만 렌더링

  const start = page * ITEMS_PER_PAGE;
  const pageItems = data.slice(start, start + ITEMS_PER_PAGE);

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const cell = document.createElement('div');
    cell.className = 'news-item';

    const press = pageItems[i];
    if (press) {
      const img = document.createElement('img');
      img.src = press.logo;
      img.alt = press.name;

      // 구독 버튼
      const btn = document.createElement('button');
      btn.className = 'subscribe-btn';

      const icon = document.createElement('img');
      icon.className = 'subscribe-icon';
      icon.alt = '';

      const text = document.createElement('span');
      text.className = 'subscribe-text available-medium12';

      btn.append(icon, text);

      // 초기 UI 세팅
      updateSubscribeButton(btn, press.name);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isSubscribed(press.name)) {
          // 구독 중 > 해지 확인 모달
          openUnsubscribeModal({
            pressName: press.name,
            onConfirmCallback: () => {
              toggleSubscribe(press.name);
              updateSubscribeButton(btn, press.name);
              document.dispatchEvent(new CustomEvent('subscription-change'));
            }
          });
        } else {
          // 구독
          toggleSubscribe(press.name);
          updateSubscribeButton(btn, press.name);
          document.dispatchEvent(new CustomEvent('subscription-change'));
        }
      });

      cell.appendChild(img);
      cell.appendChild(btn);
    }

    fragment.appendChild(cell);
  }

  container.appendChild(fragment);
}


function updateSubscribeButton(button, pressName) {
  const subscribed = isSubscribed(pressName);

  const icon = button.querySelector('.subscribe-icon');
  const text = button.querySelector('.subscribe-text');

  if (subscribed) {
    icon.src = "./logos/closed.svg";
    text.textContent = '해지하기';
  } else {
    icon.src = './logos/plus.svg';
    text.textContent = '구독하기';
  }

  button.classList.toggle('subscribed', subscribed);
}