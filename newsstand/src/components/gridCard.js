export const gridCard = (press) => {
  const item = document.createElement("li");
  item.classList.add("ns-press-grid__item");

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("ns-press-grid__button");
  button.setAttribute("data-press-id", press.id);

  const label = document.createElement("span");
  label.classList.add("ns-press-grid__name");
  label.textContent = press.pressName;

  const img = document.createElement("img");
  img.src = press.icon;
  img.alt = press.name;

  button.appendChild(img);
  item.appendChild(button);

  return { item };
};
