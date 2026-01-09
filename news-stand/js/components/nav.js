const gridButton = document.getElementById('grid-button');
const listButton = document.getElementById('list-button');

const toggle = (event) => {
  gridButton.setAttribute('aria-selected', event);
  listButton.setAttribute('aria-selected', !event);
};

// 하나로 합칠 수 있는 방법이 없을까요?
export const renderNav = () => {
  gridButton.addEventListener('click', () => {
    toggle(true);
  });

  listButton.addEventListener('click', () => {
    toggle(false);
  });
};
