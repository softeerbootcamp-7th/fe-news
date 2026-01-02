import { rawPresses } from './pressData.js';

export function getLatestHeadlines(count = 10) {
  return rawPresses
    .slice()
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, count)
    .map(item => ({
      press: item.press,
      title: item.mainTitle,
      link: item.mainLink
    }));
}