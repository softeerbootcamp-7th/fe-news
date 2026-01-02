/**
 * ul 안에 li 목록을 그린다
 */
export function renderRollingList(ul, headlines) {
  ul.innerHTML = '';

  const fragment = document.createDocumentFragment();

  headlines.forEach(item => {
    const li = document.createElement('li');
    li.className = 'news-article';

    li.innerHTML = `
      <span class="press display-bold14">${item.press}</span>
      <a href="${item.link}" class="news-title available-medium14">
        ${item.title}
      </a>
    `;

    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
}
