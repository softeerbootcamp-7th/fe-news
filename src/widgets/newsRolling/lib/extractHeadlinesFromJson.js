/**
 * features는 순수 로직만 담습니다.
 * - DOM 접근/이벤트/타이머/네트워크(fetch)는 app 레이어(Controller)에서 처리합니다.
 */

export function extractHeadlinesFromNewsJson(json) {
  if (!Array.isArray(json)) return [];

  const headlines = [];
  for (const item of json) {
    if (item && typeof item === "object") {
      if (
        typeof item.mainTitle === "string" &&
        typeof item.mainLink === "string"
      ) {
        headlines.push({
          press: String(item.press ?? ""),
          title: item.mainTitle,
          link: item.mainLink,
        });
      }
      if (Array.isArray(item.relatedArticles)) {
        for (const ra of item.relatedArticles) {
          if (
            ra &&
            typeof ra === "object" &&
            typeof ra.title === "string" &&
            typeof ra.link === "string"
          ) {
            headlines.push({
              press: String(item.press ?? ""),
              title: ra.title,
              link: ra.link,
            });
          }
        }
      }
    }
  }

  return headlines.filter((h) => h.title && h.link);
}
