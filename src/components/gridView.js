import { ITEMS_PER_PAGE } from '../utils/pagination.js'
import { subscription } from '../utils/subscription.js'

export function renderGridView(items) {
  const content = document.getElementById('content')
  if (!content) return

  content.className = 'grid'
  content.innerHTML = ''

  const fragment = document.createDocumentFragment()

  items.forEach(item => {
    const gridItem = document.createElement('li')
    gridItem.className = 'grid-item'
    const subscribed = subscription.isSubscribed(item.id)
    gridItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="grid-item-image">
      <div class="grid-item-overlay">
        <button class="subscribe-btn ${subscribed ? 'subscribed' : ''}" data-id="${item.id}">
          ${subscribed ? '해지하기' : '구독하기'}
        </button>
      </div>
    `
    
    const btn = gridItem.querySelector('.subscribe-btn')
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      subscription.toggle(item.id)
      const isNowSubscribed = subscription.isSubscribed(item.id)
      btn.classList.toggle('subscribed', isNowSubscribed)
      btn.textContent = isNowSubscribed ? '해지하기' : '구독하기'
    })
    
    fragment.appendChild(gridItem)
  })

  const placeholders = Math.max(0, ITEMS_PER_PAGE - items.length)
  for (let i = 0; i < placeholders; i += 1) {
    const placeholder = document.createElement('li')
    placeholder.className = 'grid-item placeholder'
    placeholder.setAttribute('aria-hidden', 'true')
    fragment.appendChild(placeholder)
  }

  content.appendChild(fragment)
}
