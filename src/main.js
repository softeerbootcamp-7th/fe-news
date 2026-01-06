import "./style.css";
import "./styles/variables.css";
import "./styles/reset.css";
import { Header } from "./components/Header/Header.js";
import { RollingSection } from "./components/Rollable/RollingSection.js";
import { MainContents } from "./components/Main/MainContent.js";

const app = document.querySelector("#app");

// 1. 렌더링 함수 정의
function render() {
  app.appendChild(Header());
  app.appendChild(RollingSection());
  app.appendChild(MainContents());
}

// 2. 초기 실행
render();
