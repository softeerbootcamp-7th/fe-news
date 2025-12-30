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
      if (currentPage === 0) {
        prevBtn.disabled = true;
        prevBtn.style.visibility = "hidden";
      } else {
        prevBtn.style.visibility = "visible";
        prevBtn.disabled = false;
      }
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

  container.addEventListener("click", (e) => {
    const arrow = e.target.closest(".pagination-arrow");
    if (!arrow || arrow.disabled) return;

    if (arrow.classList.contains("prev")) {
      goToPage(currentPage - 1);
    } else if (arrow.classList.contains("next")) {
      goToPage(currentPage + 1);
    }
  });

  updateButtons();

  return {
    currentPage: () => currentPage,
    goToPage,
    updateButtons,
  };
}
