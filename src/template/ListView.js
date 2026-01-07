import {
  getCancelButtonTemplate,
  getSubscribeButtonTemplate,
} from "@/template/SubscribeButton";
import { VIEW_TAB } from "@/types/constant";

export function getNavTemplateStart() {
  return `<nav class="press-tabs" aria-label="언론사 카테고리">`;
}
export function getNavTemplateEnd() {
  return `</nav>`;
}

export function getNavTemplate({
  selected,
  navName,
  currentPress,
  totalPress,
}) {
  return selected
    ? `
    <button
      class="press-tabs__item active"
      style="--progress: ${totalPress ? currentPress / totalPress : "0.93"}"
      aria-current="true"
    >
      <p class="display-bold-14">${navName}</p>
      ${
        totalPress
          ? `<p class="display-bold-12">
            ${currentPress}<span> / ${totalPress} </span>
          </p>`
          : `<svg
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.48329 10.5L4.66663 9.68333L7.34996 7L4.66663 4.31667L5.48329 3.5L8.98329 7L5.48329 10.5Z"
              fill="currentColor"
            />
          </svg>`
      }
    </button>
  `
    : `
    <button class="press-tabs__item">
      <p class="press-tabs__title medium-14">${navName}</p>
    </button>
  `;
}

export function getPressContentTemplate({
  logo,
  name,
  time,
  isSubscribed,
  mainNews,
  subNews,
}) {
  return `
    <section class="press-feed" data-label="${name}">
      <!-- 언론사 정보 -->
      <header class="press-feed__header">
        <img src="${logo}" alt="${name}" class="press-feed__logo" />
        <time
          datetime="${time}"
          class="press-feed__time medium-12"
        >
          ${time} 편집
        </time>
        ${
          isSubscribed
            ? getCancelButtonTemplate(VIEW_TAB.LIST)
            : getSubscribeButtonTemplate(VIEW_TAB.LIST)
        }
      </header>
      <div class="press-feed__container">
        <!-- 메인 뉴스 -->
        <article class="press-feed__lead">
          <img
            src="${mainNews.thumbnail}"
            alt="메인 뉴스 썸네일"
            class="press-feed__thumbnail"
          />
          <h3 class="press-feed__headline medium-16">
            ${mainNews.title}
          </h3>
        </article>

        <!-- 서브 뉴스 -->
        <ul class="press-feed__list medium-16">
          <li>${subNews[0].title}</li>
          <li>${subNews[1].title}</li>
          <li>${subNews[2].title}</li>
          <li>${subNews[3].title}</li>
          <li>${subNews[4].title}</li>
          <li>${subNews[5].title}</li>
          <p class="press-feed__note medium-14">
            ${name} 언론사에서 직접 편집한 뉴스입니다.
          </p>
        </ul>
      </div>
    </section>`;
}

export function getEmptyContentTemplate() {
  return `
    <div style="padding: 16px">
      <span>구독한 언론사가 없습니다.</span>
    </div>
    `;
}
