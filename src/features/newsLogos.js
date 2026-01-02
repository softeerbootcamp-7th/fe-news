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
  state,
  shuffle,
  LOGO_FILES,
  LIGHT_ONLY_FILES,
  DARK_ONLY_FILES,
}) {
  state.shuffledByTheme.light = shuffle(
    getLogoFilesForTheme({
      theme: "light",
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    })
  );
  state.shuffledByTheme.dark = shuffle(
    getLogoFilesForTheme({
      theme: "dark",
      LOGO_FILES,
      LIGHT_ONLY_FILES,
      DARK_ONLY_FILES,
    })
  );
}

// DOM 렌더/탭/네비게이션은 Controller가 담당합니다.
