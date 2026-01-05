import './style.css'
import { displayTodayDate } from './utils/date.js'
import { initViewController } from './features/news-contents/ViewController.js'
import { rolling } from './features/rolling-news/RollingController.js'

/**
 * TODO
 * - [week 1-2 구독 및 롤링 기능]
 * - 구독 모달 레이아웃 및 기능 구현
 * - 다크 모드 기능 구현
 */


displayTodayDate() // 헤더에 오늘 날짜 표시
rolling.init() // 롤링 뉴스 초기화
initViewController() // 뉴스 콘텐츠 뷰 컨트롤러 초기화
