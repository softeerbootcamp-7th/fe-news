import { subscribePressStore } from "../stores/subscribePressStore";
import { createBtn } from "./createBtn";

/**
 * 컨테이너에 li, img, button 요소를 생성하여 언론사 로고를 렌더링합니다.
 *
 * @param {string} containerSelector 
 * @param {Map} pressMapData - Key: ID, Value: { name, logo }
 */
export function renderLogos(containerSelector, pressMapData) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pressMapData.forEach((press, pressId) => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.className = 'press-logo-img';
    img.src = press.logo;
    img.alt = `${press.name} 로고`;
    li.appendChild(img);

    const subscribeBtn = createSubscribeBtn(pressId);
    li.appendChild(subscribeBtn);

    handleHoverPressItem(li, img, subscribeBtn);

    fragment.appendChild(li);
  });
  
  container.appendChild(fragment);
}

const createSubscribeBtn = (pressId) => {
    const { subscribedPressIdList } = subscribePressStore.getState();
    const isSubscribed = subscribedPressIdList.includes(pressId);

    const btnText = isSubscribed ? '해지하기' : '구독하기';
    const btnIcon = isSubscribed ? 'closed' : 'plus'; 
    const btnColor = isSubscribed ? 'grey' : 'white';

    const btn = createBtn(
      btnColor, 
      btnIcon, 
      btnText, 
      'subscribe-btn', 
      () => handleClickSubscribeBtn(pressId)
    );

    btn.dataset.pressId = pressId;
    btn.style.display = 'none';

    return btn;
  }

const handleHoverPressItem = (liEl, imgEl, btnEl) => {
  liEl.addEventListener('mouseover', () => {
    imgEl.style.display = 'none';
    btnEl.style.display = 'flex';
  });
  liEl.addEventListener('mouseleave', () => {
    imgEl.style.display = 'flex';
    btnEl.style.display = 'none';
  });
}

const handleClickSubscribeBtn = (pressId) => {
  const { subscribedPressIdList: currentList } = subscribePressStore.getState();
  const actionType = currentList.includes(pressId) ? 'UNSUBSCRIBE' : 'SUBSCRIBE';
  subscribePressStore.dispatch({ type: actionType, payload: pressId });
}