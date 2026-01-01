import { LatestNewsView } from "@/latestNews.js";

import { articlesData } from "@/dummy/articlesData";
import { createHeader } from "@/header/createHeader";

// 기본 상단 영역
createHeader();

// 뉴스 자동 롤링
const newArticlesView = new LatestNewsView(articlesData);
newArticlesView.render();

// 리스트 영역
