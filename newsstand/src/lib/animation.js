function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const EASING_FUNCTIONS = {
  easeInOutSine,
  easeInOutCubic,
};

export const animateTranslateY = ({
  el,
  from,
  to,
  duration,
  easing = "easeInOutSine",
  onComplete,
}) => {
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = EASING_FUNCTIONS[easing](progress);
    const currentY = from + (to - from) * easedProgress;

    el.style.transform = `translateY(${currentY}px)`;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    if (onComplete) onComplete();
  };
  requestAnimationFrame(tick);
};
