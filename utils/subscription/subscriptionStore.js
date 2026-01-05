import { presses } from '../../data/presses.js'; // 이름, 로고를 가공한 map import

const STORAGE_KEY = 'subscribedPresses';      // localStorage 에서 사용할 키 값
let subscribed = new Set();                   // 구독 언론사를 저장할 중복불가 Set

// 구독한 언론사 목록 Set으로 저장
export function initSubscriptionStore() {
  const saved = localStorage.getItem(STORAGE_KEY);    // localStorage에서 STORAGE_KEY 키의 값 saved에 불러오기
  if (saved) subscribed = new Set(JSON.parse(saved)); // saved가 비어있지 않으면 subscribed에 Set으로 저장
}

// 구독, 해지하기 기능
export function toggleSubscribe(name) {
    subscribed.has(name) ? subscribed.delete(name) : subscribed.add(name);  // Set에 언론사가 있으면 삭제, 없으면 추가
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...subscribed]));     // localStorage에 배열로 변환 후 STORAGE_KEY 키 값으로 저장 (업데이트)
}

// 구독여부 확인
export function isSubscribed(name) {  // name: 구독한 언론사 이름
  return subscribed.has(name);        // name이 구독 목록에 있으면 참, 없으면 거짓 반환
}

// 구독 언론사 갯수
export function getSubscribedCount() {
  return subscribed.size; // 구독한 언론사들이 저장된 Set의 크기 반환
}

// 구독 Set 반환
// export 위치
// 
export function getSubscribedSet() {
  return subscribed;
}

// 전체 언론사 중 구독한 언론사만 필터링
// export 위치
// subscriptionTabController.js, gridController.js
export function getSubscribedPresses() {
  return presses.filter(press => subscribed.has(press.name)); // 구독한 언론사의 기사, 로고 등의 데이터도 반환
}