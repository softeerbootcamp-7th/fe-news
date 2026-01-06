export const createIconButton = (icon, className, dataAction, text) => {
  return `
    <button type="button" class="ns-icon-button surface-alt typo-available-medium12 ${className}" data-action="${dataAction}">
      ${icon}
      ${text}
    </button>
  `;
};

export const PLUS_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 2.5V9.5M2.5 6H9.5" stroke="#14212B" stroke-width="1" stroke-linecap="round" />
</svg>
`;

export const CLOSE_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="#14212B" stroke-width="1" stroke-linecap="round" />
</svg>
`;
