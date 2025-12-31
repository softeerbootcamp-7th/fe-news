// 다크모드 변경을 위한 파일. 추후 연결 예정

const STORAGE_KEY = 'theme';

function getSystemPreference() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function setTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') html.setAttribute('data-theme', 'dark');
  else html.removeAttribute('data-theme');
}

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'system';
}

export function applySavedOrSystemTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const themeToApply = saved && saved !== 'system' ? saved : getSystemPreference();
  setTheme(themeToApply);
}

export function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, next);
  setTheme(next);
}

export function initThemeToggle(buttonSelector = '#theme-toggle') {
  applySavedOrSystemTheme();
  const btn = document.querySelector(buttonSelector);
  if (btn) {
    btn.addEventListener('click', () => {
      toggleTheme();
      btn.innerText = document.documentElement.getAttribute('data-theme') === 'dark' ? '라이트' : '다크';
    });
    btn.innerText = document.documentElement.getAttribute('data-theme') === 'dark' ? '라이트' : '다크';
  }
}

try {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener?.('change', applySavedOrSystemTheme);
} catch (_) {}
