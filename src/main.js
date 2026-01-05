import { loadSVG } from "./utils/lodeSVG.js";
import { updateDate } from "./utils/date.js";
import { lightModeLogos, renderLogos } from "./components/renderLogo.js";

loadSVG();
updateDate();
setInterval(updateDate, 60000);

renderLogos('.press-logo-container', lightModeLogos);
