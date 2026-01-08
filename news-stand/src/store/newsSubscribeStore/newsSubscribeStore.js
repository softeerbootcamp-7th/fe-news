export function createNewsSubscribeStore() {
  // localStorage key 상수
  const STORAGE_KEY = 'news-subscribed-ids';

  // 구독한 언론사 ID를 저장할 Set
  let subscribedSet = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

  // Observer(listener) 목록
  const listeners = new Set();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function syncToLocalStorage() {
    // JSON.stringify 후 localStorage에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribedSet]));
  }

  function subscribe(listener) {
    listeners.add(listener);

    // unsubscribe 함수 반환
    return () => {
      listeners.delete(listener);
    };
  }

  function toggle(publisherId) {
    // 1. 기존 subscribedSet을 직접 mutate 하지 말 것
    // 2. 새로운 Set 생성 (기존 데이터 복사)
    const newSet = new Set(subscribedSet);

    // 3. publisherId가 이미 있으면 제거, 없으면 추가
    has(publisherId) ? newSet.delete(publisherId) : newSet.add(publisherId);

    // 4. subscribedSet 교체
    subscribedSet = newSet;

    // 5. localStorage 동기화
    syncToLocalStorage();

    // 6. notify 호출
    notify();
  }

  function has(publisherId) {
    return subscribedSet.has(publisherId);
  }

  function getAll() {
    return Array.from(subscribedSet);
  }

  return {
    subscribe,
    toggle,
    has,
    getAll,
  };
}
