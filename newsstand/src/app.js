import { createLayout } from "./components/layout";
import { getDate } from "./lib/utils";

const root = document.getElementById("app");

root.innerHTML = createLayout();

document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("date");
  dateField.innerText = getDate();
});
