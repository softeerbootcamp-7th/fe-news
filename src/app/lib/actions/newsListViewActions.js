import {
  advanceNewsListPress,
  selectNewsListTab,
} from "../../../widgets/newsView/ui/newsListUI.js";

export function createNewsListActions() {
  const prev = () => advanceNewsListPress(-1);
  const next = () => advanceNewsListPress(1);
  const selectTab = (target) => selectNewsListTab(target);

  return {
    prev,
    next,
    selectTab,
  };
}
