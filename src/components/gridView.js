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
    
    const img = document.createElement('img')
    img.src = item.image
    img.alt = item.title
    img.className = 'grid-item-image'
    gridItem.appendChild(img)

    const div = document.createElement('div')
    div.className = 'grid-item-overlay'
    gridItem.appendChild(div)

    const button = document.createElement('button')
    button.className = `subscribe-btn ${subscribed ? 'subscribed' : ''}`
    button.dataset.id = item.id
    button.textContent = subscribed ? '해지하기' : '구독하기'
    
    div.appendChild(button)
    gridItem.appendChild(img)
    gridItem.appendChild(div)

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
