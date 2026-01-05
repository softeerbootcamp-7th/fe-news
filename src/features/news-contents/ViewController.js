import { getPaginatedData, getTotalPages } from '../../utils/pagination.js'
import { renderGridView } from './views/GridView.js'
import { renderListView } from './views/ListView.js'
import { attachPaginationEvents, updatePaginationButtons } from './PaginationController.js'
import { NewsState } from './state/NewsState.js'

function setActiveTab(viewType) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.dataset.view === viewType
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-selected', isActive)
  })
}

function renderPage(page) {
  NewsState.setPage(page)
  const sourceData = NewsState.getCurrentData()
  const totalPages = getTotalPages(sourceData)
  const pageData = getPaginatedData(sourceData, page)

  if (NewsState.currentView === 'grid') {
    renderGridView(pageData)
  } else {
    renderListView(pageData)
  }

  updatePaginationButtons({ currentPage: NewsState.currentPage, totalPages })
}

function switchView(viewType) {
  NewsState.setView(viewType)
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

export function initViewController() {
  bindTabEvents()
  
  attachPaginationEvents({
    onPrev: () => {
      if (NewsState.currentPage > 1) {
        renderPage(NewsState.currentPage - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    onNext: () => {
      const totalPages = getTotalPages(NewsState.getCurrentData())
      if (NewsState.currentPage < totalPages) {
        renderPage(NewsState.currentPage + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  })

  switchView('grid')
}
