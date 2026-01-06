export function renderListView(items) {
  const content = document.getElementById('news-contents')
  if (!content) return

  content.className = 'list'

  const listItems = items.map(item => `
    <li class="list-item" role="article">
      <img src="${item.image}" alt="${item.title}" class="list-item-image">
      <div class="list-item-content">
        <div>
          <h3 class="list-item-title">${item.title}</h3>
          <p class="list-item-description">${item.description}</p>
        </div>
        <div class="list-item-meta">
          <time class="list-item-date" datetime="${item.date}">${item.date}</time>
        </div>
      </div>
    </li>
  `).join('')

  content.innerHTML = listItems
}
