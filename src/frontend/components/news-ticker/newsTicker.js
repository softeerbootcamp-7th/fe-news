export function renderNewsTicker(container, newsList = []) {
  const containerElement = document.querySelector(container)

  const defaultNewsList = [
    {
      pressName: '연합뉴스',
      title: "[속보] 도심 공원 '조용한 독서존' 시범 운영... 시민 호응 이어져",
      url: '#',
    },
    {
      pressName: '서울경제',
      title: '착한 소비 캠페인, 지역 상권 회복에 긍정적 영향',
      url: '#',
    },
  ];

  const allNewsItems = newsList.length > 0 ? newsList : defaultNewsList;
  
  // 뉴스 리스트를 2로 나누기
  const midPoint = Math.ceil(allNewsItems.length / 2);
  const leftList = allNewsItems.slice(0, midPoint);
  const rightList = allNewsItems.slice(midPoint);

  // 뉴스 박스 렌더링 (두 개의 rolling-box만 생성)
  const renderNewsBoxes = (items) => {
    const currentNews = items[0] || defaultNewsList[0];
    const nextNews = items[1] || items[0] || defaultNewsList[0];
    
    return `
      <div class="rolling-box">
        <a href="${currentNews.url}" class="news-link">
          <strong class="press-name">${currentNews.pressName}</strong>
          <span class="news-title">${currentNews.title}</span>
        </a>
      </div>
      <div class="rolling-box">
        <a href="${nextNews.url}" class="news-link">
          <strong class="press-name">${nextNews.pressName}</strong>
          <span class="news-title">${nextNews.title}</span>
        </a>
      </div>
    `;
  };

  const tickerHtml = `
    <section class="news-ticker" aria-label="최신 뉴스">
      <ul>
        <li class="news-item news-item-left">
          <div class="rolling-wrapper">
            ${renderNewsBoxes(leftList)}
          </div>
          <div class="timer-badge">0.00s</div>
        </li>
        <li class="news-item news-item-right">
          <div class="rolling-wrapper">
            ${renderNewsBoxes(rightList)}
          </div>
          <div class="timer-badge">0.00s</div>
        </li>
      </ul>
    </section>
  `;

  containerElement.innerHTML = tickerHtml;

  // 마스터-슬레이브 단방향 롤링 초기화
  initMasterSlaveRolling({
    containerSelector: container,
    masterSelector: '.news-item-left',
    slaveSelector: '.news-item-right',
    masterList: leftList,
    slaveList: rightList,
    loopDuration: 5000, // 5초마다 마스터 롤링
    slaveLag: 1000,     // 마스터 후 1초 뒤 슬레이브 롤링
  });
}

function initMasterSlaveRolling({
  containerSelector,
  masterSelector,
  slaveSelector,
  masterList,
  slaveList,
  loopDuration = 5000,
  slaveLag = 1000,
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const masterItem = container.querySelector(masterSelector);
  const slaveItem = container.querySelector(slaveSelector);
  if (!masterItem || !slaveItem) return;

  const masterWrapper = masterItem.querySelector('.rolling-wrapper');
  const slaveWrapper = slaveItem.querySelector('.rolling-wrapper');
  const masterBoxes = masterWrapper?.querySelectorAll('.rolling-box') || [];
  const slaveBoxes = slaveWrapper?.querySelectorAll('.rolling-box') || [];
  const masterBadge = masterItem.querySelector('.timer-badge');
  const slaveBadge = slaveItem.querySelector('.timer-badge');

  if (masterBoxes.length < 2 || slaveBoxes.length < 2) return;
  if (masterList.length <= 1 && slaveList.length <= 1) return;

  // 상태
  const masterIdxRef = { value: 0 };
  const slaveIdxRef = { value: 0 };
  let cycleTimer = null;
  let slaveTimer = null;
  let rafId = null;
  let masterStart = performance.now();
  let slaveStart = performance.now();
  let masterWaiting = true;
  let slaveWaiting = true;

  // 공통: 박스 내용 업데이트
  const updateBox = (box, list, idx) => {
    const news = list[idx % list.length];
    if (!news) return;
    const link = box.querySelector('.news-link');
    const title = box.querySelector('.news-title');
    const press = box.querySelector('.press-name');
    if (link) link.href = news.url;
    if (title) title.textContent = news.title;
    if (press) press.textContent = news.pressName;
  };

  // 공통: 박스 쌍 초기 세팅
  const setPair = (boxes, list, idx) => {
    updateBox(boxes[0], list, idx);
    updateBox(boxes[1], list, (idx + 1) % list.length);
  };

  // hover 여부
  const isWrapperHovered = (wrapper) => {
    const item = wrapper?.closest('.news-item');
    return item ? item.matches(':hover') : false;
  };

  // 실시간 타이머 표시
  const updateBadges = () => {
    const now = performance.now();
    if (masterWaiting && masterBadge) {
      masterBadge.textContent = `${((now - masterStart) / 1000).toFixed(2)}s`;
    }
    if (slaveWaiting && slaveBadge) {
      slaveBadge.textContent = `${((now - slaveStart) / 1000).toFixed(2)}s`;
    }
    rafId = requestAnimationFrame(updateBadges);
  };

  // 공통 롤 애니메이션
  const roll = (wrapper, boxes, list, idxRef, markWaiting, badge) => {
    if (isWrapperHovered(wrapper)) {
      if (badge) badge.textContent = 'Skipped (Hover)';
      // 롤링은 건너뛰되, 타이머는 계속 진행되도록 대기 상태로만 전환
      markWaiting(true, performance.now());
      return;
    }
    markWaiting(false);
    if (badge) badge.textContent = 'Rolling...';

    boxes.forEach((box) => {
      box.style.transition = 'transform 0.5s ease-in-out';
      box.style.transform = 'translateY(-100%)';
    });

    const handle = () => {
      boxes.forEach((box) => {
        box.style.transition = 'none';
        box.style.transform = 'translateY(0)';
      });
      idxRef.value = (idxRef.value + 1) % list.length;
      setPair(boxes, list, idxRef.value);
      markWaiting(true, performance.now());
      boxes[0].removeEventListener('transitionend', handle);
    };
    boxes[0].addEventListener('transitionend', handle);
  };

  const markMaster = (waiting, ts) => {
    masterWaiting = waiting;
    if (waiting && ts) masterStart = ts;
  };
  const markSlave = (waiting, ts) => {
    slaveWaiting = waiting;
    if (waiting && ts) slaveStart = ts;
  };

  // 컨트롤러 사이클
  const runCycle = () => {
    if (cycleTimer) clearTimeout(cycleTimer);
    if (slaveTimer) clearTimeout(slaveTimer);

    // 마스터 즉시 롤링
    roll(masterWrapper, masterBoxes, masterList, masterIdxRef, markMaster, masterBadge);

    // 슬레이브는 1초 지연 롤링 (단방향 신호)
    slaveTimer = setTimeout(() => {
      roll(slaveWrapper, slaveBoxes, slaveList, slaveIdxRef, markSlave, slaveBadge);
    }, slaveLag);

    // 다음 사이클 예약
    cycleTimer = setTimeout(runCycle, loopDuration);
  };

  // 초기 세팅
  setPair(masterBoxes, masterList, masterIdxRef.value);
  setPair(slaveBoxes, slaveList, slaveIdxRef.value);
  masterStart = performance.now();
  slaveStart = performance.now();
  masterWaiting = true;
  slaveWaiting = true;

  // 타이머 표시 루프 시작
  rafId = requestAnimationFrame(updateBadges);

  // 최초 시작: 5초 대기 후 첫 롤링
  cycleTimer = setTimeout(runCycle, loopDuration);
}
