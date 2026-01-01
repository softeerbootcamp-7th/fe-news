import { newsData } from '../data/newsData.js'

const ROLLING_INTERVAL = 5000
const RIGHT_COLUMN_DELAY = 1000

let rollingIndexLeft = 0
let rollingIndexRight = 5
let leftIntervalId = null
let rightIntervalId = null

let isPausedLeft = false
let isPausedRight = false

function renderColumn(columnId, currentIndex) {
  const column = document.getElementById(columnId)
  if (!column) return

  const list = column.querySelector('.rolling-news-list')
  const item = newsData[currentIndex % newsData.length]
  
  list.innerHTML = `
    <li>
      <article class="rolling-news-item">
        <span class="typo-display-bold-14">${item.press || 'Unknown'}</span>
        <p class="typo-available-medium-14">${item.title}</p>
      </article>
    </li>
  `
}

function animateRoll(columnId, isRight = false) {
  if (isRight) {
    rollingIndexRight = (rollingIndexRight + 1) % newsData.length
    renderColumn(columnId, rollingIndexRight)
  } else {
    rollingIndexLeft = (rollingIndexLeft + 1) % newsData.length
    renderColumn(columnId, rollingIndexLeft)
  }
}

function startRolling() {
  renderColumn('rolling-left', rollingIndexLeft)
  renderColumn('rolling-right', rollingIndexRight)

  leftIntervalId = setInterval(() => {
    if (!isPausedLeft) {
      animateRoll('rolling-left', false)
    }
  }, ROLLING_INTERVAL)

  setTimeout(() => {
    rightIntervalId = setInterval(() => {
      if (!isPausedRight) {
        animateRoll('rolling-right', true)
      }
    }, ROLLING_INTERVAL)
  }, RIGHT_COLUMN_DELAY)
}

function setupRollingHover() {
  const rollingSection = document.getElementById('rolling-news')
  if (!rollingSection) return

  const leftColumn = document.getElementById('rolling-left')
  const rightColumn = document.getElementById('rolling-right')

  leftColumn.addEventListener('mouseenter', () => {
    isPausedLeft = true
    leftColumn.classList.add('paused')
  })

  leftColumn.addEventListener('mouseleave', () => {
    isPausedLeft = false
    leftColumn.classList.remove('paused')
  })

  rightColumn.addEventListener('mouseenter', () => {
    isPausedRight = true
    rightColumn.classList.add('paused')
  })

  rightColumn.addEventListener('mouseleave', () => {
    isPausedRight = false
    rightColumn.classList.remove('paused')
  })

  rollingSection.addEventListener('click', (e) => {
    const item = e.target.closest('.rolling-news-item')
    if (item) {
      console.log('롤링 뉴스 클릭:', item.textContent)
    }
  })
}

export function initRolling() {
  startRolling()
  setupRollingHover()
}
