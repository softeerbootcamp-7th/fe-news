export function renderListView(items) {
  const content = document.getElementById('news-contents')
  if (!content) return

  content.className = 'list'
  
  // TODO: 리스트 UI 작업 필요
  const listItems = items.map(item => `
    <li class="list-item" role="article">
      <div class="press-info">
        <img src="${item.logo}" alt="${item.press}" width="44" height="20">
        <span class="press-name">${item.time}</span>
      </div>
      <div class="press-contents">
        <div>
          <img src="${item.mainImg}" alt="${item.mainTitle}" class="list-item-image">
          <p>${item.mainTitle}</p>
        </div>
        <div class="list-item-content">
          <div>
            <h3 class="list-item-title">${item.title}</h3>
            <p class="list-item-description">${item.description}</p>
          </div>
          <div class="list-item-meta">
            <time class="list-item-date" datetime="${item.date}">${item.date}</time>
          </div>
        </div>
      </div>
    </li>
  `).join('')

  content.innerHTML = listItems
}
