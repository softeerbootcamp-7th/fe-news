import { subscribePressStore } from "../stores/subscribePressStore";
import { loadSVG, LOGO_COUNT_PER_PAGE } from "../utils/assetUtils";
import { waitForAlert } from "./alert";
import { createBtn } from "./createBtn";

export const renderGrid = async (container) => {
  const pressData = await getPressData()
  
  const newsGridContainer = document.createElement('ul');
  newsGridContainer.className = 'news-grid-container';
  container.appendChild(newsGridContainer);

  renderAllPress('.news-grid-container', pressData);

  const allPressBtn = document.querySelector('.all-press-container');
  const subscribedPressBtn = document.querySelector('.subscribed-press-container');

  // '내가 구독한 언론사' 메뉴에서, subscribedPressIdList가 변경될 때마다 다시 렌더링
  subscribePressStore.subscribe(() => {
    const subscribedTab = document.querySelector('.subscribed-press-container');
    if (subscribedTab && subscribedTab.classList.contains('selected')) {
      renderSubscribedPress('.news-grid-container', pressData);
    }
  });

  allPressBtn.addEventListener('click', () => {
    allPressBtn.classList.add('selected');
    allPressBtn.classList.remove('unselected');
    subscribedPressBtn.classList.remove('selected');
    subscribedPressBtn.classList.add('unselected');

    renderAllPress('.news-grid-container', pressData);
    loadSVG();
  });

  subscribedPressBtn.addEventListener('click', () => {
    subscribedPressBtn.classList.add('selected');
    subscribedPressBtn.classList.remove('unselected');
    allPressBtn.classList.remove('selected');
    allPressBtn.classList.add('unselected');

    renderSubscribedPress('.news-grid-container', pressData);
    loadSVG();
  });

  loadSVG();
}

/**
 * 컨테이너에 li, img, button 요소를 생성하여 언론사 로고를 렌더링합니다.
 *
 * @param {string} containerSelector 
 * @param {Array} pressData - Array of Objects
 */
const renderAllPress = (containerSelector, pressData) => {
  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pressData.forEach((press, pressId) => {
    if (pressId < LOGO_COUNT_PER_PAGE) {
      fragment.appendChild(createListItem(press, pressId, pressData));
    }
  });
  
  container.appendChild(fragment);
}

const renderSubscribedPress = (containerSelector, pressData) => {
  const { subscribedPressIdList } = subscribePressStore.getState();

  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pressData.forEach((press, pressId) => {
    const isSubscribed = subscribedPressIdList.includes(pressId);

    if (isSubscribed) {
      fragment.appendChild(createListItem(press, pressId, pressData));
    }
  });

  // LOGO_COUNT_PER_PAGE - subscribeCount 만큼 빈 공간 채우기
  const subscribeCount = subscribedPressIdList.length;
  for (let i = subscribeCount; i < LOGO_COUNT_PER_PAGE; i++) {
    const li = document.createElement('li');
    fragment.appendChild(li);
  }
  
  container.appendChild(fragment);
}

const createListItem = (press, pressId, pressData) => {
    const liEl = document.createElement('li');

    const img = document.createElement('img');
    img.className = 'press-logo-img';
    img.src = press.logo;
    img.alt = `${press.press} 로고`;
    liEl.appendChild(img);

    const subscribeBtn = createSubscribeBtn(pressId, pressData);
    liEl.appendChild(subscribeBtn);

    handleHoverPressItem(liEl, img, subscribeBtn);

    return liEl;
}

const createSubscribeBtn = (pressId, pressData) => {
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
      () => handleClickSubscribeBtn(pressId, pressData)
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

const handleClickSubscribeBtn = async (pressId, pressData) => {
  const { subscribedPressIdList: currentList } = subscribePressStore.getState();
  const actionType = currentList.includes(pressId) ? 'UNSUBSCRIBE' : 'SUBSCRIBE';

  if (actionType === 'UNSUBSCRIBE') {
    const pressNameEl = document.querySelector('.alert-press-name');
    pressNameEl.textContent = pressData[pressId].press;
    
    const isConfirmed = await waitForAlert();
    if (!isConfirmed) return;
  }
  
  subscribePressStore.dispatch({ type: actionType, payload: pressId });
};

async function getPressData() {
  const response = await fetch("./data/pressData.json", {
    headers: {
	    Accept: "application / json",
	  },
  });
  const jsonData = await response.json()

  return jsonData
}