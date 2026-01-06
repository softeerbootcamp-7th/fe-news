const styles = {
	base: `group flex items-center justify-center available-medium12 rounded-full p-x-2 p-y-1`,
	variants: {
		primary: `bg-default border-default hover:border-bold`,
		tertiary: `bg-alt border-default hover:border-bold`,
	},
};

type Props = {
	children?: string;
	variant?: "primary" | "tertiary";
	icon?: "plus" | "closed";
};

export function renderButton({ children, variant = "primary", icon }: Props) {
	// DOM은 "DOM"보다 앞에 prefix로 "$"를 달아주는게 더 간단해보인다.
	const $button = document.createElement("button");

	const variantClass = styles.variants[variant];
	$button.className = `${styles.base} ${variantClass}`;

	if (icon) {
		const $icon = document.createElement("div");
		$icon.className = `w-3 h-3 icon-${icon} bg-weak group-hover:bg-bold icon`;

		$button.appendChild($icon);
	}

	if (children) {
		const $text = document.createElement("span");
		$text.className = `text-weak group-hover:text-bold`;
		$text.textContent = children;
		$button.appendChild($text);
	}

	return $button;
}
