import { TAB } from '../constants/constants.js'

// [TODO] 리스트 - 카테고리 필터링 추가하면서 다듬기
export function selectVisiblePresses(state) {
  let list = state.data.presses || []

  if (state.ui?.tab === TAB.SUBSCRIBED) {
    const set = state.user?.subscribedIds || new Set()
    list = list.filter((p) => set.has(p.id))
  }

  return list
}

export function selectPageSlice(state, itemsPerPage) {
  const list = selectVisiblePresses(state)
  const page = state.ui?.page || 1
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  return list.slice(start, end)
}

export function selectTotalPages(state, itemsPerPage) {
  const list = selectVisiblePresses(state)
  return Math.ceil(list.length / itemsPerPage)
}

export function selectRollingData(state) {
  const presses = state.data?.presses || []
  const latestSize = state.ui?.latestSize
  const half = Math.floor(latestSize / 2)
  const source = presses.slice(0, latestSize)
  return {
    left: source.slice(0, half),
    right: source.slice(half, half * 2),
  }
}
