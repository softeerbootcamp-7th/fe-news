export default function setupPagination(container, onPageChange) {
  container.addEventListener("click", (e) => {
    const arrow = e.target.closest(".pagination-arrow");
    if (!arrow || arrow.disabled) return;

    if (arrow.classList.contains("prev")) {
      onPageChange("prev");
    } else if (arrow.classList.contains("next")) {
      onPageChange("next");
    }
  });
}

export function updatePaginationUI(container, currentPage, totalPages) {
  const prevBtn = container.querySelector(".pagination-arrow.prev");
  const nextBtn = container.querySelector(".pagination-arrow.next");

  if (prevBtn) {
    if (currentPage === 0) {
      prevBtn.disabled = true;
      prevBtn.style.visibility = "hidden";
    } else {
      prevBtn.disabled = false;
      prevBtn.style.visibility = "visible";
    }
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages - 1 || totalPages === 0;
  }
}
