function themeFromMediaQuery(mql) {
  return mql?.matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

/**
 * OS의 prefers-color-scheme만 감지해서 테마를 적용/동기화합니다.
 * - 버튼 토글/로컬스토리지 저장 없음
 * - 테마가 바뀌면 onChange(theme) 호출
 */
export function initSystemTheme({
  prefersDarkQuery = "(prefers-color-scheme: dark)",
  onChange,
} = {}) {
  const mql = window.matchMedia?.(prefersDarkQuery);
  const initial = applyTheme(themeFromMediaQuery(mql));
  if (typeof onChange === "function") onChange(initial);

  const handler = (e) => {
    const next = applyTheme(themeFromMediaQuery(e));
    if (typeof onChange === "function") onChange(next);
  };
}
