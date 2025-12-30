export default function setupPagination(
  container,
  paginatedData,
  renderCallback,
  initialPage = 0
) {
  let currentPage = initialPage;

  const updateButtons = () => {
    const prevBtn = container.querySelector(".pagination-arrow.prev");
    const nextBtn = container.querySelector(".pagination-arrow.next");

    if (prevBtn) {
      prevBtn.disabled = currentPage === 0;
    }

    if (nextBtn) {
      nextBtn.disabled =
        currentPage === paginatedData.length - 1 || paginatedData.length === 0;
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < paginatedData.length) {
      currentPage = page;
      const pageData = paginatedData[currentPage] || [];
      renderCallback(pageData, currentPage);
      updateButtons();
    }
  };

  const handleClick = (e) => {
    const arrow = e.target.closest(".pagination-arrow");
    if (!arrow || arrow.disabled) return;

    if (arrow.classList.contains("prev")) {
      goToPage(currentPage - 1);
    } else if (arrow.classList.contains("next")) {
      goToPage(currentPage + 1);
    }
  };

  const oldHandler = container._paginationHandler;
  if (oldHandler) {
    container.removeEventListener("click", oldHandler);
  }

  container.addEventListener("click", handleClick);
  container._paginationHandler = handleClick;

  updateButtons();

  return {
    currentPage: () => currentPage,
    goToPage,
    updateButtons,
  };
}
