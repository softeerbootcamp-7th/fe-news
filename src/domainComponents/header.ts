import { renderLogo } from "./logo";
import { renderCurDate } from "../components/curDate";

export function renderHeader() {
	const headerDOM = document.createElement("header");
	headerDOM.className = "flex flex-row justify-between";

	const LogoDOM = renderLogo();

	headerDOM.append(LogoDOM, renderCurDate());

	return headerDOM;
}
