type Props = {
	press: string;
	mainTitle: string;
	logo: string;
};

export function renderNewsItem({ logo, press, mainTitle }: Props) {
	const liDOM = document.createElement("li");
	liDOM.className =
		"border-default aspect-card inline-flex justify-center items-center surface-default";

	const anchorDOM = document.createElement("a");
	anchorDOM.href = "#";

	if (logo) {
		const imgDOM = document.createElement("img");
		imgDOM.src = logo;
		imgDOM.alt = mainTitle;
		imgDOM.className = "h-5";
		anchorDOM.appendChild(imgDOM);
	} else {
		anchorDOM.textContent = press || "언론사";
		anchorDOM.className = "display-medium14 text-default";
	}

	liDOM.appendChild(anchorDOM);

	return liDOM;
}
