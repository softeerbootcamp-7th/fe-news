import { ITEMS_PER_PAGE } from '../utils/pagination.js'

export function renderGridView(items) {
  const content = document.getElementById('content')
  if (!content) return

  content.className = 'grid'
  content.innerHTML = ''

  items.forEach(item => {
    const gridItem = document.createElement('li')
    gridItem.className = 'grid-item'
    gridItem.innerHTML = `
      <a href="#"><img src="${item.image}" alt="${item.title}" class="grid-item-image"></a>
    `
    content.appendChild(gridItem)
  })

  const placeholders = Math.max(0, ITEMS_PER_PAGE - items.length)
  for (let i = 0; i < placeholders; i += 1) {
    const placeholder = document.createElement('li')
    placeholder.className = 'grid-item placeholder'
    placeholder.setAttribute('aria-hidden', 'true')
    content.appendChild(placeholder)
  }
}
