import { header } from "./components/header";

const root = document.getElementById("app");

// 메인 컨테이너 생성
const mainContainer = document.createElement("div");
mainContainer.id = "main-container";

// 헤더 생성
root.appendChild(mainContainer);
mainContainer.append(header());
