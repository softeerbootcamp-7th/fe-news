export const createAutoPager = ({ actions, intervalMs = 5000 }) => {
  let timer = null;
  let paused = false;

  function tick() {
    if (paused) return;
    timer = setTimeout(() => {
      actions.setNext();
    }, intervalMs);
  }

  return {
    start() {
      if (timer) return;
      paused = false;
      tick();
    },
    stop() {
      paused = true;
      if (timer) clearTimeout(timer);
      timer = null;
    },
    reset() {
      this.stop();
      this.start();
    },
  };
};
