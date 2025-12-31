import { pressGrid } from "./grid";
import { controls } from "./newsControl";

export const newsContent = () => {
  const contentWrapper = document.createElement("main");
  contentWrapper.id = "content-wrapper";

  const { controlSection } = controls();
  const { nsSection } = pressGrid();

  contentWrapper.append(controlSection);
  contentWrapper.append(nsSection);

  return contentWrapper;
};
