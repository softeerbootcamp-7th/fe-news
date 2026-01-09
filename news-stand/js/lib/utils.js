export const moveY = (element, time = 0, length = 0) => {
  element.style.transition = `transform ${time}s`;
  element.style.transform = `translateY(${length}px)`;
};
