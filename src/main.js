import { loadSVG } from "./utils/assetUtils.js";
import { updateDate } from "./utils/date.js";
import { renderGrid } from "./components/renderPress.js";
import { rollingNews } from "./components/rollingNews.js";
import "./components/subscribePress.js";

const UPDATE_INTERVAL_MS = 60000; // 1 minute

updateDate();
setInterval(updateDate, UPDATE_INTERVAL_MS);

renderGrid();
rollingNews();

loadSVG();
