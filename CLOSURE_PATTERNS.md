# Closure(클로저) 패턴 사용 예시

이 프로젝트에서 클로저(Closure)를 활용한 코드 패턴들을 정리합니다. 클로저는 내부 함수가 외부 함수의 변수에 접근할 수 있는 특성을 활용하여 상태 관리, 이벤트 핸들링, 모듈 패턴 등을 구현합니다.

## 1. observeStore - 상태 구독 패턴

**위치**: `src/frontend/store/observeStore.js`

가장 대표적인 클로저 사용 예시입니다. `lastSelectedState` 변수가 외부 스코프에 있고, 내부 함수 `handleChange`가 이를 참조하여 이전 상태를 기억합니다.

```javascript
export const observeStore = (selector, onChange, equalityFn) => {
  // 외부 스코프 변수 - 클로저를 통해 내부 함수에서 접근 가능
  let lastSelectedState;

  // 내부 함수 - 클로저를 형성하여 외부 변수에 접근
  function handleChange() {
    const nextState = selector(store.getState());
    
    const isEqual = equalityFn 
      ? equalityFn(lastSelectedState, nextState)
      : lastSelectedState === nextState;
    
    if (!isEqual) {
      lastSelectedState = nextState;  // 클로저를 통해 외부 변수 수정
      onChange(lastSelectedState, store.getState());
    }
  }
  
  const unsubscribe = store.subscribe(handleChange);
  handleChange(); 

  return unsubscribe;
};
```

**클로저의 역할**:
- `lastSelectedState` 변수가 `handleChange` 함수 실행 간에도 유지됨
- `selector`, `onChange`, `equalityFn` 파라미터도 클로저로 캡처됨
- React-Redux의 `useSelector` 훅과 유사한 동작 구현

**사용 예시**:
```javascript
// app.js
observeStore(
  (state) => rollingSelectors.getNewsList(state.rolling || {}),
  (newsList) => {
    renderNewsTicker('#news-ticker-container', newsList);
  },
  shallowEqual
);
```

---

## 2. Store.subscribe - 구독 취소 함수

**위치**: `src/frontend/store/store.js`

`subscribe` 메서드가 반환하는 함수가 클로저를 형성하여 `this.subscribers` 배열과 `callback` 함수에 접근합니다.

```javascript
subscribe(callback) {
  this.subscribers.push(callback);
  
  // 반환되는 함수가 클로저를 형성
  // 외부 스코프의 this.subscribers와 callback에 접근 가능
  return () => {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  };
}
```

**클로저의 역할**:
- 반환된 함수가 호출될 때도 `this.subscribers`와 `callback`에 접근 가능
- 구독 해제 시점에 정확한 callback을 제거할 수 있음

**사용 예시**:
```javascript
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// 나중에 구독 해제
unsubscribe();
```

---

## 3. newsGrid.js - 모듈 레벨 변수와 이벤트 핸들러

**위치**: `src/frontend/components/news-grid/newsGrid.js`

모듈 레벨의 변수들이 여러 함수에서 클로저를 통해 공유됩니다.

```javascript
// 모듈 레벨 변수들 - 여러 함수에서 클로저로 접근 가능
let pageContainer = null;
let prevBtn = null;
let nextBtn = null;
let containerElement = null;
let isEventHandlerAttached = false;

export function renderNewsGrid(container, theme = 'auto') {
  containerElement = document.querySelector(container);
  // ...
  
  // 이벤트 리스너 - 클로저를 통해 외부 변수 접근
  if (!isEventHandlerAttached) {
    containerElement.addEventListener('click', (e) => {
      // 클로저: containerElement, store, toggleSubscribe에 접근
      const btn = e.target.closest('.news-grid-subscribe-btn');
      if (btn) {
        e.stopPropagation();
        const pressName = btn.getAttribute('data-press-name');
        if (pressName) {
          store.dispatch(toggleSubscribe(pressName));
        }
      }
    });
    isEventHandlerAttached = true;  // 클로저를 통해 외부 변수 수정
  }
  
  // prevBtn, nextBtn에 이벤트 리스너 추가
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      // 클로저: store, selectors에 접근
      const state = store.getState();
      const gridState = state.grid || {};
      if (selectors.canGoPrev(gridState)) {
        store.dispatch(prevPage());
      }
    });
  }
}
```

**클로저의 역할**:
- 이벤트 리스너가 등록된 후에도 모듈 레벨 변수들에 접근 가능
- 여러 함수 호출 간 상태를 공유 (예: `isEventHandlerAttached`)
- 외부 모듈의 `store`, `selectors` 등을 클로저로 캡처

---

## 4. initNewsGridSubscription - 중첩된 클로저

**위치**: `src/frontend/components/news-grid/newsGrid.js`

`initNewsGridSubscription` 함수 내부에서 `observeStore`를 호출할 때, 콜백 함수들이 여러 외부 변수에 클로저로 접근합니다.

```javascript
let unsubscribePageUpdate = null;
let unsubscribeSubscriptionUpdate = null;

function initNewsGridSubscription() {
  if (unsubscribePageUpdate) {
    unsubscribePageUpdate();  // 클로저로 캡처된 구독 해제 함수
  }
  if (unsubscribeSubscriptionUpdate) {
    unsubscribeSubscriptionUpdate();
  }

  // observeStore의 콜백 함수들이 클로저를 형성
  unsubscribePageUpdate = observeStore(
    (state) => selectors.getCurrentPageItems(state.grid || {}),
    (currentPageItems) => {
      // 클로저: pageContainer, store, selectors에 접근
      if (!pageContainer) return;
      pageContainer.innerHTML = renderPage(currentPageItems, 'auto');
      const currentState = store.getState();
      const gridState = currentState.grid || {};
      updateButtonVisibility(gridState.currentPage || 0, selectors.getTotalPages(gridState));
    },
    shallowEqual 
  );

  unsubscribeSubscriptionUpdate = observeStore(
    (state) => state.grid?.subscribedIds || [],
    (subscribedIds) => {
      // 클로저: updateSubscriptionButtons 함수에 접근
      updateSubscriptionButtons(subscribedIds);
    },
    shallowEqual
  );
}
```

**클로저의 역할**:
- `observeStore`가 반환한 `unsubscribe` 함수를 모듈 레벨 변수에 저장
- 콜백 함수들이 `pageContainer`, `store`, `selectors`, `updateButtonVisibility` 등에 접근
- 상태 변경 시 정확한 DOM 요소를 업데이트할 수 있음

---

## 5. newsTicker.js - initMasterSlaveRolling의 클로저 패턴

**위치**: `src/frontend/components/news-ticker/newsTicker.js`

복잡한 클로저 패턴이 사용되는 부분입니다. 내부 함수들이 외부 함수의 변수와 파라미터에 접근합니다.

```javascript
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
  // ... DOM 요소들 추출
  
  // 외부 함수의 변수들 - 내부 함수에서 클로저로 접근
  const masterIdxRef = { value: 0 };
  const slaveIdxRef = { value: 0 };
  let cycleTimer = null;
  let slaveTimer = null;
  let rafId = null;
  let masterStart = performance.now();
  let slaveStart = performance.now();
  let masterWaiting = true;
  let slaveWaiting = true;

  // 내부 함수 1: 박스 업데이트 - 클로저로 list, box에 접근
  const updateBox = (box, list, idx) => {
    const news = list[idx % list.length];
    // ...
  };

  // 내부 함수 2: 박스 쌍 설정 - 클로저로 list에 접근
  const setPair = (boxes, list, idx) => {
    updateBox(boxes[0], list, idx);
    updateBox(boxes[1], list, (idx + 1) % list.length);
  };

  // 내부 함수 3: 롤링 애니메이션 - 클로저로 외부 변수들 접근
  const roll = (wrapper, boxes, list, idxRef, markWaiting, badge) => {
    if (isWrapperHovered(wrapper)) {
      if (badge) badge.textContent = 'Skipped (Hover)';
      markWaiting(true, performance.now());  // 클로저로 외부 함수 접근
      return;
    }
    // ...
    const handle = () => {
      // 이벤트 핸들러도 클로저를 형성
      boxes.forEach((box) => {
        box.style.transition = 'none';
        box.style.transform = 'translateY(0)';
      });
      idxRef.value = (idxRef.value + 1) % list.length;  // 클로저로 idxRef 수정
      setPair(boxes, list, idxRef.value);  // 클로저로 setPair 접근
      markWaiting(true, performance.now());
      boxes[0].removeEventListener('transitionend', handle);
    };
    boxes[0].addEventListener('transitionend', handle);
  };

  // 내부 함수 4: 마스터/슬레이브 상태 표시 함수들
  const markMaster = (waiting, ts) => {
    masterWaiting = waiting;  // 클로저로 외부 변수 수정
    if (waiting && ts) masterStart = ts;
  };
  const markSlave = (waiting, ts) => {
    slaveWaiting = waiting;  // 클로저로 외부 변수 수정
    if (waiting && ts) slaveStart = ts;
  };

  // 내부 함수 5: 사이클 실행 - 클로저로 모든 외부 변수 접근
  const runCycle = () => {
    if (cycleTimer) clearTimeout(cycleTimer);  // 클로저로 cycleTimer 접근
    if (slaveTimer) clearTimeout(slaveTimer);  // 클로저로 slaveTimer 접근

    roll(masterWrapper, masterBoxes, masterList, masterIdxRef, markMaster, masterBadge);
    
    slaveTimer = setTimeout(() => {
      // setTimeout 콜백도 클로저를 형성
      roll(slaveWrapper, slaveBoxes, slaveList, slaveIdxRef, markSlave, slaveBadge);
    }, slaveLag);

    cycleTimer = setTimeout(runCycle, loopDuration);  // 재귀 호출, 클로저로 cycleTimer 수정
  };

  // 실시간 타이머 업데이트 - 클로저로 badge, waiting 상태 접근
  const updateBadges = () => {
    const now = performance.now();
    if (masterWaiting && masterBadge) {
      masterBadge.textContent = `${((now - masterStart) / 1000).toFixed(2)}s`;
    }
    if (slaveWaiting && slaveBadge) {
      slaveBadge.textContent = `${((now - slaveStart) / 1000).toFixed(2)}s`;
    }
    rafId = requestAnimationFrame(updateBadges);  // 재귀 호출, 클로저로 rafId 수정
  };

  // 초기화
  setPair(masterBoxes, masterList, masterIdxRef.value);
  setPair(slaveBoxes, slaveList, slaveIdxRef.value);
  rafId = requestAnimationFrame(updateBadges);
  cycleTimer = setTimeout(runCycle, loopDuration);
}
```

**클로저의 역할**:
- `masterIdxRef`, `slaveIdxRef`, `cycleTimer`, `slaveTimer` 등의 상태가 내부 함수들 간에 공유됨
- `setTimeout`, `requestAnimationFrame`의 콜백 함수들이 클로저로 외부 변수에 접근
- `markMaster`, `markSlave` 함수가 클로저로 상태 변수를 수정
- `runCycle` 함수가 재귀 호출되면서도 클로저로 변수들에 접근

---

## 6. pressHeader.js - 모듈 패턴과 클로저

**위치**: `src/frontend/components/press-header/pressHeader.js`

모듈 레벨 변수를 사용한 모듈 패턴에서 클로저가 활용됩니다.

```javascript
// 모듈 레벨 변수들 - 프라이빗 변수 역할
let headerContainer = null;
let headerElement = null;
let isEventAttached = false;
let isInitialized = false;

function attachEventHandlers() {
  if (!headerContainer || isEventAttached) return;
  
  // 이벤트 리스너가 클로저로 외부 변수 접근
  headerContainer.addEventListener('click', (e) => {
    // 클로저: headerContainer, store, setTab에 접근
    const tabButton = e.target.closest('.tab-item');
    if (tabButton) {
      e.stopPropagation();
      const tab = tabButton.getAttribute('data-tab');
      if (tab) {
        store.dispatch(setTab(tab));
      }
    }
  });
  
  isEventAttached = true;  // 클로저를 통해 외부 변수 수정
}

export function renderPressHeader(containerSelector, { currentTab, subscribedCount }) {
  const containerElement = document.querySelector(containerSelector);
  headerContainer = containerElement;  // 모듈 레벨 변수 수정
  
  // 초기화 상태를 클로저로 체크
  if (isInitialized) {
    updateTabs(currentTab, subscribedCount);
    return;
  }
  
  // ... HTML 렌더링
  
  headerElement = containerElement.querySelector('.press-header');
  isInitialized = true;  // 클로저를 통해 외부 변수 수정
  
  attachEventHandlers();  // 클로저를 활용하는 함수 호출
}
```

**클로저의 역할**:
- 모듈 레벨 변수가 프라이빗 변수처럼 동작 (외부에서 직접 접근 불가)
- 여러 함수 호출 간 상태를 공유 (`isEventAttached`, `isInitialized`)
- 이벤트 리스너가 등록된 후에도 모듈 변수에 접근 가능

---

## 클로저 패턴의 장점

### 1. 상태 보존
- 함수 실행이 끝난 후에도 외부 변수에 접근하여 상태를 유지할 수 있음
- 예: `observeStore`의 `lastSelectedState`, `newsTicker`의 타이머 변수들

### 2. 데이터 캡슐화
- 모듈 레벨 변수를 사용하여 프라이빗 변수처럼 동작
- 예: `newsGrid.js`, `pressHeader.js`의 모듈 패턴

### 3. 메모리 효율성
- 필요한 변수만 클로저로 캡처하여 메모리 사용 최적화
- 이벤트 리스너 등록 후에도 정확한 변수 참조 가능

### 4. 비동기 처리
- `setTimeout`, `requestAnimationFrame` 콜백에서도 외부 변수 접근 가능
- 예: `initMasterSlaveRolling`의 타이머 로직

---

## 주의사항

### 1. 메모리 누수 방지
```javascript
// 구독 해제 함수를 반환하여 메모리 누수 방지
const unsubscribe = observeStore(selector, onChange);
// 컴포넌트가 제거될 때 구독 해제
unsubscribe();
```

### 2. 순환 참조 주의
- 클로저가 대량의 데이터를 참조하면 메모리 사용량이 증가할 수 있음
- 필요한 최소한의 데이터만 클로저로 캡처

### 3. 타이머 정리
```javascript
// 컴포넌트가 제거될 때 타이머 정리
if (cycleTimer) clearTimeout(cycleTimer);
if (rafId) cancelAnimationFrame(rafId);
```

---

## 관련 파일

- `src/frontend/store/observeStore.js`: 상태 구독 패턴
- `src/frontend/store/store.js`: 구독 취소 함수 패턴
- `src/frontend/components/news-grid/newsGrid.js`: 모듈 레벨 변수와 이벤트 핸들러
- `src/frontend/components/news-ticker/newsTicker.js`: 복잡한 클로저 패턴 (타이머 관리)
- `src/frontend/components/press-header/pressHeader.js`: 모듈 패턴과 클로저
