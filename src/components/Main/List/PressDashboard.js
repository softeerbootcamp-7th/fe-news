import { fetchNewsListOfOnePress } from "../../../mockServer/mockServer";
import { pressList, store } from "../../../store";
import { makeNode } from "../../../utils/utils";
import { SubscribeBtn } from "../../Shared/SubscribeBtn";
import "./PressDashboard.css";

export function PressDashboard() {
  const $el = makeNode(`
        <div class="press-dashboard">
              <div class="press-info">
                  <img class="press-logo" src="" />
                  <a class="last-edited-time">$2026.01.01. 00:00편집</a>
              </div>
              <div class="press-news-container">
                  <article class="press-cover-news">
                    <img class="press-cover-img" src="https://placehold.co/320x200"/>
                    <a class="press-cover-title">대표 기사 제목 제목 제목</a>
                  </article>
                  <div class="press-side-container">
                  </div>
              </div>
        </div>
    `);

  const $pressLogoImg = $el.querySelector(".press-logo");
  const $lastEditedTime = $el.querySelector(".last-edited-time");
  const $pressCoverImg = $el.querySelector(".press-cover-img");
  const $pressCoverTitle = $el.querySelector(".press-cover-title");
  const $pressInfo = $el.querySelector(".press-info");
  $pressInfo.appendChild(SubscribeBtn(pressList[0], true));

  const $newsContainer = $el.querySelector(".press-side-container");
  const $editInfo = makeNode(`<a class="edit-info"></a>`);

  const render = async () => {
    const { currentPressId } = store.state;
    fetchNewsListOfOnePress(currentPressId)
      .then((response) => fillContents(response))
      .catch((e) => console.error(e));
  };

  const fillContents = (newsData) => {
    const { currentPressId } = store.state;

    $pressLogoImg.src = pressList[currentPressId].logo;
    $lastEditedTime.textContent = `${newsData.lastEditedTime} 편집`;
    $pressCoverImg.src = newsData.coverImg + newsData.id;
    $pressCoverTitle.textContent = newsData.coverNewsTitle;
    $pressCoverTitle.href = newsData.coverNewsLink;

    $pressInfo.removeChild($pressInfo.lastChild);
    $pressInfo.appendChild(SubscribeBtn(currentPressId, true));

    //오른쪽 뉴스 기사 채우기
    $newsContainer.innerHTML = `${newsData.newsTitleList
      .map(
        (news) =>
          `<a class="press-side-news" href="${news.link}">${news.newsTitle}</a>`
      )
      .join("")}`;
    $editInfo.textContent = `${pressList[currentPressId].name}  언론사에서 직접 편집한 뉴스입니다.`;
    $newsContainer.appendChild($editInfo);
  };

  window.addEventListener("currentPressIdChange", render);

  render();
  return $el;
}
