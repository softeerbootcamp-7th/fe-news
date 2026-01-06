import { pressList } from "../../../store";
import { makeNode } from "../../../utils/utils";
import { SubscribeBtn } from "../../Shared/SubscribeBtn";
import "./PressDashboard.css";

export function PressDashboard() {
  const newsList = {
    lastEditedTime: "2026.01.14. 18:27",
    news: [
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
      {
        title: "기사제목 기사제목 기사제목 기사제목",
        link: "",
      },
    ],
  };

  const currentPressIdx = 1;
  const currontPress = pressList[currentPressIdx];
  const $el = makeNode(`
        <div class="press-dashboard">
              <div class="press-info">
                  <img class="press-logo" src=${currontPress.logo} />
                  <a class="last-edited-time">${newsList.lastEditedTime}편집</a>
              </div>
              <div class="press-news-container">
                  <article class="press-cover-news">
                    <img class="press-cover-img" src="https://placehold.co/320x200"/>
                    <a class="press-cover-title">대표 기사 제목 제목 제목</a>
                  </article>
                  <div class="press-side-container">
                    ${newsList.news
                      .map((n) => `<a class="press-side-news">${n.title}</a>`)
                      .join("")}
                   
                    <a class="edit-info">
                      ${currontPress.name} 언론사에서 직접 편집한 뉴스입니다.
                    </a>
                  </div>
              </div>
        </div>
    `);

  const $pressLogoImg = $el.querySelector(".press-logo");
  const $lastEditedTime = $el.querySelector(".last-edited-time");
  const $pressInfo = $el.querySelector(".press-info");
  $pressInfo.appendChild(SubscribeBtn(currontPress, true));
  return $el;
}
