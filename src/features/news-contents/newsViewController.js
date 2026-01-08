import { getPaginatedData, getTotalPages } from '../../utils/pagination.js'
import { renderGridView } from './views/renderGridView.js'
import { renderListView } from './views/renderListView.js'
import { attachPaginationEvents, updatePaginationButtons } from './paginationController.js'
import { newsState } from '../../stores/newsState.js'
import { ITEMS_PER_PAGE } from '../../constants/constants.js'

function setActiveTab(viewType) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const isActive = btn.dataset.view === viewType
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-selected', isActive)
  })
}

function renderPage(page) {
  newsState.setPage(page)
  const sourceData = newsState.getCurrentData()
  const totalPages = getTotalPages(sourceData, ITEMS_PER_PAGE)
  const pageData = getPaginatedData(sourceData, page, ITEMS_PER_PAGE)

  if (newsState.currentView === 'grid') {
    renderGridView(pageData)
  } else {
    renderListView(pageData)
  }

  updatePaginationButtons({ currentPage: newsState.currentPage, totalPages, })
}

function switchView(viewType) {
  newsState.setView(viewType)
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

export async function initNewsView() {
  await newsState.init()

  bindTabEvents()
  
  attachPaginationEvents({
    onPrev: () => {
      if (newsState.currentPage > 1) {
        renderPage(newsState.currentPage - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    onNext: () => {
      const totalPages = getTotalPages(newsState.getCurrentData(), ITEMS_PER_PAGE)
      if (newsState.currentPage < totalPages) {
        renderPage(newsState.currentPage + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  })

  switchView('grid')
}
