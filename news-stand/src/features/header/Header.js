import { formatDate } from '../../utils/formateDate.js';

export function renderHeader() {
  const header = document.querySelector('header .date');

  const today = new Date();
  header.textContent = formatDate(today);
}
