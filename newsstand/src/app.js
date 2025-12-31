import { header } from "./components/header";
import { newsContent } from "./components/newsContents";
import { rolling } from "./components/rolling";
import "./styles/foundation.css";
import "./styles/object.css";
import "./styles/typo.css";

const root = document.getElementById("app");

// 메인 컨테이너 생성 및 추가
const mainContainer = document.createElement("div");
mainContainer.id = "main-container";
root.appendChild(mainContainer);

// header
mainContainer.append(header());

// 최신 뉴스 롤링 파트
mainContainer.append(rolling());

// 전체 언론사 파트
mainContainer.append(newsContent());
