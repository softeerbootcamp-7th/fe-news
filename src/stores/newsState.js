import { fetchPressData } from "../services/fetchPressData"
import { ITEMS_PER_PAGE } from "../constants/constants"

function shuffle(data) {
  return [...data].sort(() => Math.random() - 0.5)
}

export const newsState = {
  currentPage: 1,
  currentView: 'grid',
  GRID_PAGE_LIMIT: 4,
  ROLLING_NEWS_SIZE: 5,
  loading: false,
  error: null,
  data: [],
  shuffledData: [],
  latestData: [],

  get GRID_ITEMS_LIMIT() {
    return ITEMS_PER_PAGE * this.GRID_PAGE_LIMIT
  },

  async init() {
    await this.loadData()
  },

  async loadData() {
    this.loading = true
    this.error = null

    try {
      this.data = await fetchPressData()
    } catch (err) {
      console.error('Failed to fetch press data, using fallback', err)
      this.error = err
    }

    this.latestData = this.data.slice(0, 10)
    this.shuffledData = shuffle(this.data)
    this.loading = false
  },

  setPage(page) {
    this.currentPage = page
  },

  setView(view) {
    this.currentView = view
    this.currentPage = 1
  },

  getCurrentData() {
    const source = this.shuffledData
    return this.currentView === 'grid'
      ? source.slice(0, this.GRID_ITEMS_LIMIT)
      : source
  },

  getRollingData() {
    const source = this.latestData?.length ? this.latestData : this.data
    return {
      left: source.slice(0, this.ROLLING_NEWS_SIZE),
      right: source.slice(this.ROLLING_NEWS_SIZE, this.ROLLING_NEWS_SIZE * 2)
    }
  }
}
