import { renderButton } from "./components/button";

export const ThemeManager = {
	init() {
		const savedTheme =
			localStorage.getItem("theme") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
		this.applyTheme(savedTheme);
	},

	applyTheme(theme) {
		document.body.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	},

	toggle() {
		const nextTheme =
			document.body.getAttribute("data-theme") === "light"
				? "dark"
				: "light";
		this.applyTheme(nextTheme);
		return nextTheme;
	},
};

export function renderThemeToggle() {
	const container = document.createElement("div");

	const $button = renderButton({
		children: "테마 전환",
		variant: "primary",
		icon: "plus",
	});

	$button.addEventListener("click", () => {
		ThemeManager.toggle();
	});

	container.append($button);
	return container;
}
