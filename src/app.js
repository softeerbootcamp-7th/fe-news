import './style.css'
import { displayTodayDate } from './utils/date.js'
import { initNewsView } from './features/news-contents/newsViewController.js'
import { rolling } from './features/rolling-news/rollingController.js'
import { newsState } from './stores/newsState.js'

async function init() {
  displayTodayDate() // 헤더에 오늘 날짜 표시
  await newsState.init() // 뉴스 상태 데이터 로드
  rolling.init() // 롤링 뉴스 초기화
  await initNewsView() // 뉴스 콘텐츠 뷰 컨트롤러 초기화
}

init()