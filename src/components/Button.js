export function Button({ label, iconType, isWhiteMode = false }) {
  return `
    <button class="p-1.5 rounded-full border-default hover:border-bold cursor-pointer w-fit ${
      isWhiteMode ? "bg-surface-default" : "bg-surface-alt"
    }">
      <svg width="7" height="7" viewBox="0 0 14 14">
        <use href="/assets/icons/${iconType}.svg"/>
      </svg>
      <span class="available-medium12">${label}</span>
    </button>`;
}
