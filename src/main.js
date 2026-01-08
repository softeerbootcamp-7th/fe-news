import initAutoRollingNewsBar from "./scripts/auto-rolling-news-bar";
import initGridView from "./scripts/main-view";
import initHeader from "./scripts/header";
import { initListModeState, loadPressDatas } from "./scripts/list-view";

initHeader();
initAutoRollingNewsBar();
initGridView();
initListModeState();
