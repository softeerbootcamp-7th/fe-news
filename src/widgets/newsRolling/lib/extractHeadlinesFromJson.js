/**
 * features는 순수 로직만 담습니다.
 * - DOM 접근/이벤트/타이머/네트워크(fetch)는 app 레이어(Controller)에서 처리합니다.
 */

export function extractHeadlinesFromNewsJson(json) {
  if (!Array.isArray(json)) return [];

  const headlines = [];
  for (const item of json) {
    if (!isObject(item)) continue;
    const press = String(item.press ?? "");

    if (isValidHeadline(item.mainTitle, item.mainLink)) {
      headlines.push(toHeadline({ press, title: item.mainTitle, link: item.mainLink }));
    }

    const related = Array.isArray(item.relatedArticles)
      ? item.relatedArticles
      : [];
    for (const ra of related) {
      if (!isObject(ra)) continue;
      if (!isValidHeadline(ra.title, ra.link)) continue;
      headlines.push(toHeadline({ press, title: ra.title, link: ra.link }));
    }
  }

  return headlines.filter((h) => h.title && h.link);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object";
}

function isValidHeadline(title, link) {
  return typeof title === "string" && typeof link === "string";
}

function toHeadline({ press, title, link }) {
  return { press, title, link };
}
