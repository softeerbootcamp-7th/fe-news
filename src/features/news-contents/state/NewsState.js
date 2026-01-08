import { newsData } from '../../../data/newsData.js'
import { ITEMS_PER_PAGE } from '../../../utils/pagination.js'

export const newsState = {
  currentPage: 1,
  currentView: 'grid',
  GRID_PAGE_LIMIT: 4,

  get GRID_ITEMS_LIMIT() {
    return ITEMS_PER_PAGE * this.GRID_PAGE_LIMIT
  },

  shuffledData: [...newsData].sort(() => Math.random() - 0.5),

  setPage(page) {
    this.currentPage = page
  },

  setView(view) {
    this.currentView = view
    this.currentPage = 1
  },

  getCurrentData() {
    return this.currentView === 'grid'
      ? this.shuffledData.slice(0, this.GRID_ITEMS_LIMIT)
      : this.shuffledData
  }
}
