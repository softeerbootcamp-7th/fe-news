import { renderGridView } from './views/renderGridView.js'
import { renderListView } from './views/renderListView.js'
import {
  attachPaginationEvents,
  updatePaginationButtons,
} from './paginationController.js'
import { store } from '../../stores/store.js'
import { selectPageSlice, selectTotalPages } from '../../stores/selectors.js'
import { ITEMS_PER_PAGE, ACTION, VIEW_MODE } from '../../constants/constants.js'

function setViewMode(viewType) {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    const isActive = btn.dataset.view === viewType
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-selected', isActive)
  })
}

function setFilterTab(tabType) {
  const buttons = document.querySelectorAll('.tab-left-btn')
  const isSubscribed = tabType === 'SUBSCRIBED'
  buttons.forEach((btn, idx) => {
    const active = isSubscribed ? idx === 1 : idx === 0
    btn.classList.toggle('active', active)
    btn.setAttribute('aria-selected', active)
    btn.classList.toggle('typo-selected-bold-16', active)
    btn.classList.toggle('typo-available-medium-16', !active)
  })
}

function render(state) {
  const pageData = selectPageSlice(state, ITEMS_PER_PAGE)
  const totalPages = selectTotalPages(state, ITEMS_PER_PAGE)

  if (state.ui.view === VIEW_MODE.GRID) {
    renderGridView(pageData, state.user.subscribedIds)
  } else {
    // [TODO] 리스트 뷰 구독 기능 추가
    renderListView(pageData)
  }

  updatePaginationButtons({ currentPage: state.ui.page, totalPages })
}

function attachViewModeEvents() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      store.dispatch({ type: ACTION.SET_VIEW, payload: viewType })
      setViewMode(viewType)
    })
  })
}

function attachFilterTabEvents() {
  const buttons = document.querySelectorAll('.tab-left-btn')
  if (!buttons.length) return
  const [allBtn, subscribedBtn] = buttons
  allBtn.addEventListener('click', () => {
    store.dispatch({ type: ACTION.SET_TAB, payload: 'ALL' })
    setFilterTab('ALL')
  })
  subscribedBtn.addEventListener('click', () => {
    store.dispatch({ type: ACTION.SET_TAB, payload: 'SUBSCRIBED' })
    setFilterTab('SUBSCRIBED')
  })
}

export function initNewsView() {
  attachViewModeEvents()
  attachFilterTabEvents()

  attachPaginationEvents({
    onPrev: () => {
      const state = store.getState()
      if (state.ui.page > 1) {
        store.dispatch({ type: ACTION.SET_PAGE, payload: state.ui.page - 1 })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    onNext: () => {
      const state = store.getState()
      const totalPages = selectTotalPages(state, ITEMS_PER_PAGE)
      if (state.ui.page < totalPages) {
        store.dispatch({ type: ACTION.SET_PAGE, payload: state.ui.page + 1 })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  })

  // 스토어의 변경사항 구독 및 렌더링
  store.subscribe((state) => {
    render(state)
  })

  // 초기 렌더링
  const initial = store.getState()
  setViewMode(initial.ui.view)
  setFilterTab(initial.ui.tab)
  render(initial)
}
