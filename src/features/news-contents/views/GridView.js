import { ITEMS_PER_PAGE } from '../../../utils/pagination.js'
import { subscription } from '../../../utils/subscription.js'

export function renderGridView(items) {
  const content = document.getElementById('content')
  if (!content) return

  content.className = 'grid'

  const gridItems = items.map(item => {
    const subscribed = subscription.isSubscribed(item.id)
    return `
      <li class="grid-item">
        <img src="${item.image}" alt="${item.title}" class="grid-item-image">
        <div class="grid-item-overlay">
          <button class="subscribe-btn ${subscribed ? 'subscribed' : ''}" data-id="${item.id}">
            ${subscribed ? '해지하기' : '구독하기'}
          </button>
        </div>
      </li>
    `
  }).join('')

  const placeholders = Math.max(0, ITEMS_PER_PAGE - items.length)
  const placeholderItems = Array(placeholders).fill('<li class="grid-item placeholder" aria-hidden="true"></li>').join('')

  content.innerHTML = gridItems + placeholderItems

  content.addEventListener('click', (e) => {
    const btn = e.target.closest('.subscribe-btn')
    if (!btn) return

    e.stopPropagation()
    const itemId = btn.dataset.id
    subscription.toggle(itemId)
    
    const isSubscribed = subscription.isSubscribed(itemId)
    btn.classList.toggle('subscribed', isSubscribed)
    btn.textContent = isSubscribed ? '해지하기' : '구독하기'
  })
}
