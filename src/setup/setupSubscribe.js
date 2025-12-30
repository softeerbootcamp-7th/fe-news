export default function setupSubscribe(container, onSubscribeChange) {
  const savedSubscriptions = localStorage.getItem("subscribedNews");
  let subscribedNews = savedSubscriptions
    ? new Set(JSON.parse(savedSubscriptions))
    : new Set();

  const saveSubscriptions = () => {
    localStorage.setItem("subscribedNews", JSON.stringify([...subscribedNews]));
  };

  const toggleSubscribe = (press, currentFilter) => {
    if (subscribedNews.has(press)) {
      subscribedNews.delete(press);
    } else {
      subscribedNews.add(press);
    }

    saveSubscriptions();

    if (onSubscribeChange) {
      onSubscribeChange(subscribedNews, currentFilter);
    }
  };

  container.addEventListener("click", (e) => {
    const subscribeBtn = e.target.closest(".subscribe-btn");

    if (subscribeBtn) {
      e.preventDefault();
      e.stopPropagation();

      const press = subscribeBtn.dataset.press;
      const currentFilter = subscribeBtn.dataset.filter || "all";
      toggleSubscribe(press, currentFilter);
    }
  });

  return {
    subscribedNews,
    toggleSubscribe,
  };
}
