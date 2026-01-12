import { NEWS_NAMES } from '../lib/const';

const leftBtn = document.getElementById('btn-left');
const rightBtn = document.getElementById('btn-right');

// 그리드 들어가는 부분입니다. 파일로 들어가야 할 부분
export function renderGridNews() {
  const element = document.getElementById('grid-news');
  const fragment = document.createDocumentFragment();

  NEWS_NAMES.forEach((news, idx) => {
    if (idx >= 24) {
      return;
    }

    const { name, src } = news;
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = src;
    img.alt = name;

    li.classList.add('border');

    li.appendChild(img);

    fragment.appendChild(li);
  });

  element.appendChild(fragment);
}

// 페이지네이션 부분입니다.
