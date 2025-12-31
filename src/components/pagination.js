import "../style/pagination.css";

export default function pagination() {
  return /* html */ `
    <button 
      class="pagination-arrow prev" 
      aria-label="이전 페이지"
    >
      <svg width="56" height="100%" viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 25 L16 50 L40 75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
}

export function nextButton() {
  return /* html */ `
    <button 
      class="pagination-arrow next" 
      aria-label="다음 페이지"
    >
      <svg width="56" height="100%" viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 25 L40 50 L16 75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
}
