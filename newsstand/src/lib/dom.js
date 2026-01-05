// create node
export const createEl = (tag, className = "", markup) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (markup) node.innerHTML = markup.trim();
  return node;
};

export const render = (root, view) => {
  root.replaceChildren(view());
};
