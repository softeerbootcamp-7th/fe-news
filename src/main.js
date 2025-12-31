import "./style.css";
import "./styles/variables.css"; /* 1. 가장 먼저 변수를 불러옵니다 */
import "./styles/reset.css"; /* 2. 브라우저 기본 스타일 초기화 */
import { Header } from "./components/Header/Header.js";
import { RollingSection } from "./components/Rollable/RollingSection.js";
import { GridSection } from "./components/Main/Grid/GridSection.js";

document.querySelector("#app").innerHTML = `
      ${Header()}
      <main>
        ${RollingSection()}
        ${GridSection()}
      </main>
    `;
