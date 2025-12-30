export default function setupViewToggle(container, onViewChange) {
  let currentView = "grid";

  const setView = (newView) => {
    if (currentView !== newView) {
      currentView = newView;

      container.querySelectorAll(".view-btn").forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      const activeBtn = container.querySelector(`[data-view="${newView}"]`);
      if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.setAttribute("aria-pressed", "true");
      }

      if (onViewChange) {
        onViewChange(newView);
      }
    }
  };

  container.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".view-btn");
    if (viewBtn) {
      const newView = viewBtn.dataset.view;
      setView(newView);
    }
  });

  return {
    currentView: () => currentView,
    setView,
  };
}
