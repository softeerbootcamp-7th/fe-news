export function renderListView(items) {
  const item = items[0]
  const content = document.getElementById('news-contents')
  if (!content) return

  content.className = 'list'

  const relatedArticlesList = item.relatedArticles
    .map(
      (article) => `
    <li class="related-article" role="article">
      <p class="typo-available-medium-16">${article.title}</p>
    </li>
  `,
    )
    .join('')

  const listItems = `
    <li class="list-item" role="article">
      <div class="press-info">
        <img src="${item.logo}" alt="${item.press}" width="44" height="20">
        <span class="typo-body-medium-12">${item.time}</span>
      </div>
      <div class="press-contents">
        <div class="first-content">
          <img src="${item.mainImg}" alt="${item.mainTitle}" width="320" height="200">
          <p class="typo-available-medium-16">${item.mainTitle}</p>
        </div>
        <ul class="list-item-content">
          ${relatedArticlesList}
          <p class="typo-body-medium-14">${item.press} 언론사에서 직접 편집한 뉴스입니다.</p>
        </ul>
      </div>
    </li>
  `

  content.innerHTML = listItems
}
