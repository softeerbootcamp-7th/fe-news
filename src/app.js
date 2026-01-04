import './style.css'
import { newsData } from './data/newsData.js'
import { displayTodayDate } from './utils/date.js'
import { getPaginatedData, getTotalPages, ITEMS_PER_PAGE } from './utils/pagination.js'
import { renderGridView } from './components/gridView.js'
import { renderListView } from './components/listView.js'
import { attachPaginationEvents, updatePaginationButtons } from './components/paginationControls.js'
import { rolling } from './components/rolling.js'

/**
 * TODO
 * - [week 1-2 구독 및 롤링 기능]
 * - 구독 모달 레이아웃 및 기능 구현
 * - 다크 모드 기능 구현
 */

let currentPage = 1
let currentView = 'grid'
const GRID_PAGE_LIMIT = 4
const GRID_ITEMS_LIMIT = ITEMS_PER_PAGE * GRID_PAGE_LIMIT

const shuffledData = [...newsData].sort(() => Math.random() - 0.5)

// PAGE LIMIT에 맞는 데이터 소스 반환
function getCurrentSourceData() {
  return currentView === 'grid'
    ? shuffledData.slice(0, GRID_ITEMS_LIMIT)
    : shuffledData
}

function setActiveTab(viewType) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.dataset.view === viewType
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-selected', isActive)
  })
}

function renderPage(page) {
  currentPage = page
  const sourceData = getCurrentSourceData()
  const totalPages = getTotalPages(sourceData)
  const pageData = getPaginatedData(sourceData, page)

  if (currentView === 'grid') {
    renderGridView(pageData)
  } else {
    renderListView(pageData)
  }

  updatePaginationButtons({ currentPage, totalPages })
}

function switchView(viewType) {
  currentView = viewType
  currentPage = 1
  setActiveTab(viewType)
  renderPage(1)
}

function bindTabEvents() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view)
    })
  })
}

function bindLogoReload() {
  const logo = document.querySelector('#logo')
  if (logo) {
    logo.addEventListener('click', () => {
      location.reload()
    })
  }
}

// 초기 페이지 렌더링 및 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  displayTodayDate() // 헤더에 오늘 날짜 표시
  rolling.init() // 롤링 뉴스 초기화
  bindTabEvents() // 탭 버튼 이벤트 바인딩
  bindLogoReload() // 로고 클릭 리로드 바인딩

  attachPaginationEvents({
    onPrev: () => {
      if (currentPage > 1) {
        renderPage(currentPage - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    onNext: () => {
      const totalPages = getTotalPages(getCurrentSourceData())
      if (currentPage < totalPages) {
        renderPage(currentPage + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }) // 페이지네이션 이벤트 바인딩

  switchView('grid') // 기본 뷰는 그리드 뷰
})
