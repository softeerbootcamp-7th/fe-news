import './style.css'
import { newsData } from './data/newsData.js'
import { displayTodayDate } from './utils/date.js'
import { getPaginatedData, getTotalPages } from './utils/pagination.js'
import { renderGridView } from './components/gridView.js'
import { renderListView } from './components/listView.js'
import { attachPaginationEvents, updatePaginationButtons } from './components/paginationControls.js'

/**
 * TODO
 * - [week 1-1 레이아웃]
 * - 그리드 페이지네이션 > 최대 4페이지
 * 
 * - [week 1-2 구독 및 롤링 기능]
 * - 구독 호버 레이아웃
 * - 구독 모달 레이아웃
 * - 구독 기능
 * - 롤링 뉴스 기능
 */

let currentPage = 1
let currentView = 'grid'

// 새로고침마다 데이터 섞기
// TODO: 최적화 고민
const shuffledData = [...newsData].sort(() => Math.random() - 0.5)

function setActiveTab(viewType) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewType)
  })
}

function renderPage(page) {
  currentPage = page
  const pageData = getPaginatedData(shuffledData, page)
  const totalPages = getTotalPages(shuffledData)

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

document.addEventListener('DOMContentLoaded', () => {
  displayTodayDate()
  bindTabEvents()
  bindLogoReload()

  attachPaginationEvents({
    onPrev: () => {
      if (currentPage > 1) {
        renderPage(currentPage - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    onNext: () => {
      const totalPages = getTotalPages(shuffledData)
      if (currentPage < totalPages) {
        renderPage(currentPage + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  })

  switchView('grid')
})
