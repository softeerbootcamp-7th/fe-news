import { store } from '../../stores/store'
import { selectRollingData } from '../../stores/selectors'
import { renderRollingNews } from './views/renderRollingNews'

const ROLLING_INTERVAL = 5000
const RIGHT_COLUMN_DELAY = 1000

// TODO: 왼쪽 오른쪽이 아닌, 확장성도 고려해보기
export const rolling = {
  indexLeft: 0,
  indexRight: 0,
  intervalIds: { left: null, right: null },
  pauseFlags: { left: false, right: false },
  LEFT_DATA: [],
  RIGHT_DATA: [],

  setData() {
    const state = store.getState()
    const { left, right } = selectRollingData(state)
    this.LEFT_DATA = left ?? []
    this.RIGHT_DATA = right ?? []
  },

  animateRoll(columnId, isRight = false) {
    const data = isRight ? this.RIGHT_DATA : this.LEFT_DATA
    if (!data.length) return

    const idx = isRight ? this.indexRight : this.indexLeft

    // 롤링 뉴스 렌더링
    renderRollingNews(columnId, idx, data)

    // 인덱스 증가
    const next = (idx + 1) % data.length
    if (isRight) this.indexRight = next
    else this.indexLeft = next
  },

  startRolling() {
    this.setData()
    if (!this.LEFT_DATA.length || !this.RIGHT_DATA.length) return

    // 초기 1회
    this.animateRoll('rolling-left', false)
    this.animateRoll('rolling-right', true)

    // 왼쪽 롤링 뉴스
    this.intervalIds.left = setInterval(() => {
      if (!this.pauseFlags.left) {
        this.animateRoll('rolling-left', false)
      }
    }, ROLLING_INTERVAL)

    // 오른쪽 롤링 뉴스
    setTimeout(() => {
      this.intervalIds.right = setInterval(() => {
        if (!this.pauseFlags.right) {
          this.animateRoll('rolling-right', true)
        }
      }, ROLLING_INTERVAL)
    }, RIGHT_COLUMN_DELAY)
  },

  attachRollingHoverEvents() {
    const leftColumn = document.getElementById('rolling-left')
    const rightColumn = document.getElementById('rolling-right')
    if (!leftColumn || !rightColumn) return

    leftColumn.addEventListener('mouseenter', () => {
      this.pauseFlags.left = true
      leftColumn.classList.add('paused')
    })
    leftColumn.addEventListener('mouseleave', () => {
      this.pauseFlags.left = false
      leftColumn.classList.remove('paused')
    })

    rightColumn.addEventListener('mouseenter', () => {
      this.pauseFlags.right = true
      rightColumn.classList.add('paused')
    })
    rightColumn.addEventListener('mouseleave', () => {
      this.pauseFlags.right = false
      rightColumn.classList.remove('paused')
    })
  },

  init() {
    this.startRolling()
    this.attachRollingHoverEvents()
  },
}
