import { loadSVG } from "./utils/lodeSVG.js";
import { updateDate } from "./utils/date.js";
import { lightModeLogos, renderLogos } from "./components/renderLogo.js";
import { autoRollingNews } from "./components/autoRollingNews.js";

const UPDATE_INTERVAL_MS = 60000; // 1 minute

loadSVG();
updateDate();
setInterval(updateDate, UPDATE_INTERVAL_MS);

renderLogos('.press-logo-container', lightModeLogos);
autoRollingNews();