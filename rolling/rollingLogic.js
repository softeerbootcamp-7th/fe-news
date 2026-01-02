export function createRollingController(ul, {
  interval = 5000,
  delay = 0
}) {
  let timerId = null;
  let paused = false;

  const itemHeight = ul.firstElementChild.offsetHeight;

  function rollOnce() {
    if (paused) return;

    ul.style.transition = 'transform 0.4s ease';
    ul.style.transform = `translateY(-${itemHeight}px)`;

    setTimeout(() => {
      ul.style.transition = 'none';
      ul.appendChild(ul.firstElementChild);
      ul.style.transform = 'translateY(0)';
    }, 400);
  }

  function start() {
    stop(); // 중복 방지
    timerId = setInterval(rollOnce, interval);
  }

  function stop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function pause() {
    paused = true;
    stop();
  }

  function resume() {
    paused = false;
    start();
  }

  // 최초 시작 (좌우 시간차)
  setTimeout(start, delay);

  return { pause, resume };
}