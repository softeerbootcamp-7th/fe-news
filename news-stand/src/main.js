import { renderHeader } from './features/header/Header.js';
import { renderLatestNews } from './features/latestNews/index.js';

async function init() {
  try {
    renderHeader();
    await renderLatestNews();
  } catch (error) {
    console.error('앱 초기화 실패:', error);
  }
}

init();
