export const renderSubscribe = () => {
  const parent = document.getElementById('subscribe');
  const children = parent.querySelectorAll('a');

  children.forEach((element) => {
    element.getAttribute('aria-selected') === 'true'
      ? element.classList.add('selected-bold16')
      : element.classList.add('available-medium16');
  });
};
