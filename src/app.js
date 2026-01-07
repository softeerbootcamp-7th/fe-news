import { articlesData } from "@/dummy/articlesData";
import { initHeader } from "@/feature/header/header";
import { LatestNewsView } from "@/feature/latest-news/latestNews.js";
import { initPressView } from "@/feature/press/press";

// 기본 상단 영역
initHeader();

// 뉴스 자동 롤링
const latestNewsView = new LatestNewsView();
latestNewsView.initLatestNews(articlesData);

initPressView(articlesData);

// 리스트 영역
