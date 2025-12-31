export default function setupFilter(element, onFilterChange) {
  let activeFilter = "all";

  const setFilter = (newFilter) => {
    activeFilter = newFilter;

    element.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    const activeBtn = element.querySelector(`[data-filter="${newFilter}"]`);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }

    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  element.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      const newFilter = filterBtn.dataset.filter;
      setFilter(newFilter);
    }
  });
}
