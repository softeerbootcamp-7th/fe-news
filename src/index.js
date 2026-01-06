import { renderHeader } from "./domainComponents/header";
import { renderNewsBar } from "./domainComponents/newsBar";
import { renderNewsListSection } from "./domainComponents/newsListSection";
import { renderThemeToggle, ThemeManager } from "./theme";

ThemeManager.init();

export function renderRoot() {
	const headerDOM = renderHeader();
	const themeToggleDOM = renderThemeToggle();
	const newsBarDOM = renderNewsBar();
	const newsListSectionDOM = renderNewsListSection();

	const rootDOM = document.querySelector("#root");
	rootDOM.append(headerDOM, themeToggleDOM, newsBarDOM, newsListSectionDOM);
}

renderRoot();
