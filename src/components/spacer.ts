type Props = {
	height?: 10;
};

export function renderSpacer({ height = 10 }: Props = {}) {
	return `<div class="mb-${height}"></div>`;
}
