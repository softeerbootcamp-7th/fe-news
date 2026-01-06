type Props = {
	size?: "l";
};

// 로고 사이즈가 다양하게 필요할 경우 size와 스타일링 추가
export function renderLogo({ size = "l" }: Props = {}) {
	const anchorDOM = document.createElement("a");
	const logoIconDOM = document.createElement("div");
	const titleDOM = document.createElement("span");

	anchorDOM.href = "/";
	anchorDOM.className = "inline-flex gap-2 items-center text-strong";

	logoIconDOM.className = "w-6 h-6 icon-newspaper bg-point icon";

	titleDOM.className = "display-bold24";
	titleDOM.textContent = "뉴스스탠드";

	anchorDOM.addEventListener("click", (e) => {
		e.preventDefault();
	});

	anchorDOM.append(logoIconDOM, titleDOM);

	return anchorDOM;
}
