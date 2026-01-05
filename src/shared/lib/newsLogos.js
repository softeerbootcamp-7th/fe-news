/**
 * features는 순수 로직만 담습니다.
 * - DOM 접근/이벤트/타이머/네트워크(fetch)는 app 레이어(Controller)에서 처리합니다.
 */
export function getThemeFolder(theme) {
  return theme === "dark" ? "darkmodelogos" : "lightmodelogos";
}

export function getLogoFilesForTheme({
  theme,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
}) {
  if (theme === "dark") {
    return LOGO_FILES.filter((f) => !LIGHT_ONLY_FILES.includes(f))
      .concat(DARK_ONLY_FILES)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  }
  // light
  return LOGO_FILES.filter((f) => !DARK_ONLY_FILES.includes(f)).sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true })
  );
}

export function buildShuffledLogoLists({
  shuffle,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
}) {
  return {
    light: shuffle(
      getLogoFilesForTheme({
        theme: "light",
        LOGO_FILES,
        LIGHT_ONLY_FILES,
        DARK_ONLY_FILES,
      })
    ),
    dark: shuffle(
      getLogoFilesForTheme({
        theme: "dark",
        LOGO_FILES,
        LIGHT_ONLY_FILES,
        DARK_ONLY_FILES,
      })
    ),
  };
}

// DOM 렌더/탭/네비게이션은 Controller가 담당합니다.
