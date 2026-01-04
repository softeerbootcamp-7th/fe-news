import { newsData } from '../data/newsData.js'

const ROLLING_INTERVAL = 5000
const RIGHT_COLUMN_DELAY = 1000

export const rolling = {
  indexLeft: 0,
  indexRight: 5,
  intervalIds: { left: null, right: null },
  pauseFlags: { left: false, right: false },

  renderColumn(columnId, currentIndex) {
    const column = document.getElementById(columnId)
    if (!column) return

    const list = column.querySelector('.rolling-news-list')
    const item = newsData[currentIndex % newsData.length]
    
    list.innerHTML = ''

    const li = document.createElement('li')
    const article = document.createElement('article')
    article.className = 'rolling-news-item'

    const press = document.createElement('span')
    press.className = 'typo-display-bold-14'
    press.textContent = item.press || 'Unknown'

    const title = document.createElement('p')
    title.className = 'typo-available-medium-14'
    title.textContent = item.title

    article.appendChild(press)
    article.appendChild(title)
    li.appendChild(article)
    list.appendChild(li)
  },

  animateRoll(columnId, isRight = false) {
    if (isRight) {
      this.indexRight = (this.indexRight + 1) % newsData.length
      this.renderColumn(columnId, this.indexRight)
    } else {
      this.indexLeft = (this.indexLeft + 1) % newsData.length
      this.renderColumn(columnId, this.indexLeft)
    }
  },

  startRolling() {
    this.renderColumn('rolling-left', this.indexLeft)
    this.renderColumn('rolling-right', this.indexRight)

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

  setupRollingHover() {
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

    rollingSection.addEventListener('click', (e) => {
      const item = e.target.closest('.rolling-news-item')
      if (item) {
        console.log('롤링 뉴스 클릭:', item.textContent)
      }
    })
  },

  init() {
    this.startRolling()
    this.setupRollingHover()
  }
}
