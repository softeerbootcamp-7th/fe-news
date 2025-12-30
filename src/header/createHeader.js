import { parseDateString } from "@/utils/parse";

export function createHeader() {
  document.getElementsByClassName("today")[0].innerText = parseDateString(
    new Date()
  );
  document
    .getElementsByClassName("main-logo")[0]
    .addEventListener("click", () => {
      location.reload();
    });
}
