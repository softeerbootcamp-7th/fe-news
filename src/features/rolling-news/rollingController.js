import { newsState } from "../../stores/newsState"
import { renderRollingNews } from "./views/renderRollingNews"

const ROLLING_INTERVAL = 5000
const RIGHT_COLUMN_DELAY = 1000

export const rolling = {
  indexLeft: 0,
  indexRight: 0,
  intervalIds: { left: null, right: null },
  pauseFlags: { left: false, right: false },
  LEFT_DATA: [],
  RIGHT_DATA: [],

  // TODO: left / right 구조 더 고민해보기
  setData() {
    const { left, right } = newsState.getRollingData()
    this.LEFT_DATA = left
    this.RIGHT_DATA = right
  },

  animateRoll(columnId, isRight = false) {
    if (isRight) {
      this.indexRight = renderRollingNews(columnId, this.indexRight, this.RIGHT_DATA)
    } else {
      this.indexLeft = renderRollingNews(columnId, this.indexLeft, this.LEFT_DATA)
    }
  },

  startRolling() {
    this.setData()
    if (!this.LEFT_DATA.length || !this.RIGHT_DATA.length) return

    this.indexLeft = renderRollingNews('rolling-left', this.indexLeft, this.LEFT_DATA)
    this.indexRight = renderRollingNews('rolling-right', this.indexRight, this.RIGHT_DATA)

    this.intervalIds.left = setInterval(() => {
      if (!this.pauseFlags.left) {
        this.animateRoll('rolling-left', false)
      }
    }, ROLLING_INTERVAL)

    setTimeout(() => {
      this.intervalIds.right = setInterval(() => {
        if (!this.pauseFlags.right) {
          this.animateRoll('rolling-right', true)
        }
      }, ROLLING_INTERVAL)
    }, RIGHT_COLUMN_DELAY)
  },

  attachRollingHoverEvents() {
    const rollingSection = document.getElementById('rolling-news')
    if (!rollingSection) return

    const leftColumn = document.getElementById('rolling-left')
    const rightColumn = document.getElementById('rolling-right')

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
  }
}
