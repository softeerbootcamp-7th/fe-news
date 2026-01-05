import { articlesData } from "@/dummy/articlesData";
import { initHeader } from "@/feature/header/header";
import { LatestNewsView } from "@/feature/latest-news/latestNews.js";
import { initGridView } from "@/feature/press/grid";

// 기본 상단 영역
initHeader();

// 뉴스 자동 롤링
const latestNewsView = new LatestNewsView(articlesData);
latestNewsView.initLatestNews();

initGridView();

// 리스트 영역
