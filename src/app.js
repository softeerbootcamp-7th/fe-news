import './style.css'
import { displayTodayDate } from './utils/date.js'
import { initNewsView } from './features/news-contents/newsViewController.js'
import { rolling } from './features/rolling-news/rollingController.js'
import { store } from './stores/store.js'
import { ACTION } from './constants/constants.js'
import { fetchPressData } from './services/fetchPressData.js'
import { setupSubscriptionSync } from './stores/effects.js'

// TODO: 로직 정리 필요
async function init() {
  displayTodayDate() // 헤더에 오늘 날짜 표시

  const presses = await fetchPressData()
  store.dispatch({ type: ACTION.FETCH_PRESSES, payload: presses }) // 언론사 데이터 로드

  setupSubscriptionSync(store) // 구독 정보 로드 및 동기화 설정

  rolling.init() // 롤링 뉴스 초기화
  await initNewsView() // 뉴스 콘텐츠 뷰 컨트롤러 초기화
}

init()
